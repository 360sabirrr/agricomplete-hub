import logging
import hashlib
import hmac
import json
import os
import re
import secrets
import smtplib
import urllib.error
import urllib.request
from datetime import datetime, timedelta
from email.message import EmailMessage

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError

from extensions import db

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

auth_bp = Blueprint('auth', __name__)


EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')
PASSWORD_RESET_TTL_MINUTES = 15
PASSWORD_RESET_MAX_ATTEMPTS = 5
PASSWORD_RESET_GENERIC_MSG = "If that email is registered, a reset code has been sent."


def _get_json_body():
    data = request.get_json(silent=True)
    return data if isinstance(data, dict) else {}


def _clean_text(value, max_length=None):
    if value is None:
        return ''
    text = str(value).strip()
    if max_length:
        text = text[:max_length]
    return text


def _normalize_email(value):
    return _clean_text(value, 120).lower()


def _normalize_phone(value):
    phone = _clean_text(value, 20)
    if not phone:
        return ''
    return re.sub(r'[\s().-]+', '', phone)


def _phone_digits(value):
    return re.sub(r'\D+', '', str(value or ''))


def _phone_numbers_match(left, right):
    left_digits = _phone_digits(left)
    right_digits = _phone_digits(right)
    if len(left_digits) < 7 or len(right_digits) < 7:
        return False
    return (
        left_digits == right_digits or
        left_digits.endswith(right_digits) or
        right_digits.endswith(left_digits)
    )


def _truthy_env(name):
    return str(os.getenv(name, '')).strip().lower() in {'1', 'true', 'yes', 'on'}


def _password_reset_dev_enabled():
    return _truthy_env('PASSWORD_RESET_DEV_TOKEN') or bool(current_app.debug)


def _password_reset_ttl_minutes():
    try:
        return max(5, min(60, int(os.getenv('PASSWORD_RESET_TOKEN_MINUTES', PASSWORD_RESET_TTL_MINUTES))))
    except (TypeError, ValueError):
        return PASSWORD_RESET_TTL_MINUTES


def _hash_reset_token(token):
    return hashlib.sha256(str(token).encode('utf-8')).hexdigest()


def _smtp_settings():
    host = _clean_text(os.getenv('SMTP_HOST'), 120)
    username = _clean_text(os.getenv('SMTP_USERNAME'), 120)
    password = re.sub(r'\s+', '', str(os.getenv('SMTP_PASSWORD') or ''))
    sender = _clean_text(os.getenv('SMTP_FROM') or username, 120)
    use_ssl = _truthy_env('SMTP_USE_SSL')
    use_tls = not use_ssl and str(os.getenv('SMTP_USE_TLS', 'true')).strip().lower() not in {'0', 'false', 'no', 'off'}
    try:
        port = int(os.getenv('SMTP_PORT') or (465 if use_ssl else 587))
    except (TypeError, ValueError):
        port = 465 if use_ssl else 587
    return {
        'host': host,
        'port': port,
        'username': username,
        'password': password,
        'sender': sender,
        'use_tls': use_tls,
        'use_ssl': use_ssl,
    }


def _smtp_is_configured(settings):
    has_credentials = not settings['username'] or bool(settings['password'])
    return bool(settings['host'] and settings['sender'] and has_credentials)


def _email_api_settings():
    return {
        'brevo_api_key': _clean_text(os.getenv('BREVO_API_KEY') or os.getenv('SENDINBLUE_API_KEY'), 300),
        'sender': _clean_text(
            os.getenv('EMAIL_FROM') or
            os.getenv('SMTP_FROM') or
            os.getenv('SMTP_USERNAME'),
            120
        ),
        'sender_name': _clean_text(os.getenv('EMAIL_FROM_NAME') or 'AgriComplete Hub', 80),
    }


def _email_api_is_configured(settings):
    return bool(settings['brevo_api_key'] and settings['sender'])


def _password_reset_email_is_configured():
    return _email_api_is_configured(_email_api_settings()) or _smtp_is_configured(_smtp_settings())


def _reset_email_body(user, token, expires_minutes):
    first_name = _clean_text(getattr(user, 'first_name', ''), 50) or 'Farmer'
    return '\n'.join([
        f'Hello {first_name},',
        '',
        f'Your AgriComplete password reset code is: {token}',
        f'This code expires in {expires_minutes} minutes.',
        '',
        'If you did not request this, you can ignore this email.',
        '',
        'AgriComplete Hub'
    ])


def _send_password_reset_email_via_brevo(user, token, expires_minutes):
    settings = _email_api_settings()
    if not _email_api_is_configured(settings):
        raise RuntimeError('Brevo email API is not configured')

    payload = {
        'sender': {
            'email': settings['sender'],
            'name': settings['sender_name'],
        },
        'to': [{'email': user.email}],
        'subject': 'AgriComplete password reset code',
        'textContent': _reset_email_body(user, token, expires_minutes),
    }
    request_data = json.dumps(payload).encode('utf-8')
    request_headers = {
        'api-key': settings['brevo_api_key'],
        'Content-Type': 'application/json',
    }
    req = urllib.request.Request(
        'https://api.brevo.com/v3/smtp/email',
        data=request_data,
        headers=request_headers,
        method='POST'
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            if response.status >= 300:
                raise RuntimeError(f'Brevo email API returned HTTP {response.status}')
    except urllib.error.HTTPError as err:
        error_body = err.read().decode('utf-8', errors='replace')[:500]
        raise RuntimeError(f'Brevo email API returned HTTP {err.code}: {error_body}') from err


def _send_password_reset_email(user, token, expires_minutes):
    api_settings = _email_api_settings()
    if _email_api_is_configured(api_settings):
        _send_password_reset_email_via_brevo(user, token, expires_minutes)
        return

    settings = _smtp_settings()
    if not _smtp_is_configured(settings):
        raise RuntimeError('SMTP email service is not configured')

    msg = EmailMessage()
    msg['Subject'] = 'AgriComplete password reset code'
    msg['From'] = settings['sender']
    msg['To'] = user.email
    msg.set_content(_reset_email_body(user, token, expires_minutes))

    smtp_class = smtplib.SMTP_SSL if settings['use_ssl'] else smtplib.SMTP
    with smtp_class(settings['host'], settings['port'], timeout=20) as server:
        server.ehlo()
        if settings['use_tls']:
            server.starttls()
            server.ehlo()
        if settings['username']:
            server.login(settings['username'], settings['password'])
        server.send_message(msg)


def _find_user_by_phone(User, phone):
    digits = _phone_digits(phone)
    if not digits:
        return None

    normalized_phone = _normalize_phone(phone)
    candidates = {phone, normalized_phone}
    user = User.query.filter(User.phone.in_(candidates)).first()
    if user:
        return user

    # Supports older rows saved before phone normalization.
    for existing_user in User.query.filter(User.phone.isnot(None)).all():
        if _phone_digits(existing_user.phone) == digits:
            return existing_user
    return None


def _make_username_base(value):
    base = re.sub(r'[^a-zA-Z0-9_]+', '_', _clean_text(value).lower()).strip('_')
    return (base or 'farmer')[:80]


def _generate_unique_username(User, requested_username, email):
    base = _make_username_base(requested_username or email.split('@')[0])
    candidate = base
    suffix = 2

    while User.query.filter_by(username=candidate).first():
        suffix_text = f'_{suffix}'
        candidate = f'{base[:80 - len(suffix_text)]}{suffix_text}'
        suffix += 1

    return candidate


def _serialize_user(user):
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name or '',
        "last_name": user.last_name or '',
        "phone": user.phone or '',
        "state": user.state or '',
        "district": user.district or '',
        "village": user.village or '',
        "total_area": user.total_area or '',
        "soil_type": user.soil_type or '',
        "irrigation_source": user.irrigation_source or '',
        "primary_crops": user.primary_crops or '',
        "farming_type": user.farming_type or ''
    }


@auth_bp.route('/register', methods=['POST'])
def register():
    from models import User
    try:
        data = _get_json_body()
        
        # Validate required fields
        if not data or not data.get('email') or not data.get('password'):
            logger.warning('Registration attempt with missing email or password')
            return jsonify({"msg": "Email and password are required"}), 400
        
        email = _normalize_email(data.get('email'))
        password = str(data.get('password') or '')
        phone = _normalize_phone(data.get('phone')) or None

        if not EMAIL_RE.match(email):
            logger.warning('Registration attempt with invalid email')
            return jsonify({"msg": "Please enter a valid email address"}), 400
        
        # Validate password length
        if len(password) < 6:
            logger.warning(f'Registration attempt with short password for {email}')
            return jsonify({"msg": "Password must be at least 6 characters"}), 400

        if phone and len(_phone_digits(phone)) < 7:
            logger.warning(f'Registration attempt with invalid phone for {email}')
            return jsonify({"msg": "Please enter a valid phone number"}), 400
        
        # Check if email already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            logger.warning(f'Registration attempt with existing email: {email}')
            return jsonify({"msg": "Email already registered"}), 400

        if phone and _find_user_by_phone(User, phone):
            logger.warning(f'Registration attempt with existing phone for email: {email}')
            return jsonify({"msg": "Phone number already registered"}), 400
        
        # Create new user
        user = User(
            username=_generate_unique_username(User, data.get('username'), email),
            email=email,
            first_name=_clean_text(data.get('first_name'), 50),
            last_name=_clean_text(data.get('last_name'), 50),
            phone=phone,
            state=_clean_text(data.get('state'), 50)
        )
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        logger.info(f'User registered successfully: {email}')
        return jsonify({"msg": "User created successfully"}), 201

    except IntegrityError:
        db.session.rollback()
        logger.warning('Registration failed because a unique account field already exists', exc_info=True)
        return jsonify({"msg": "Email, phone, or username already registered"}), 400
    
    except Exception as e:
        db.session.rollback()
        logger.error(f'Registration error: {str(e)}', exc_info=True)
        return jsonify({"msg": "Registration failed. Please try again."}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    from models import User
    try:
        data = _get_json_body()
        
        # Validate required fields
        if not data or not data.get('email') or not data.get('password'):
            logger.warning('Login attempt with missing email or password')
            return jsonify({"msg": "Email and password are required"}), 400
        
        identifier = _clean_text(data.get('email') or data.get('identifier'), 120)
        password = str(data.get('password') or '')
        
        # Find user by email or phone
        if '@' in identifier:
            user = User.query.filter_by(email=_normalize_email(identifier)).first()
        else:
            user = _find_user_by_phone(User, identifier)
        
        if not user:
            logger.warning('Login attempt with non-existent identifier')
            return jsonify({"msg": "Invalid email/phone or password"}), 401
        
        # Check password
        if not user.check_password(password):
            logger.warning(f'Login attempt with wrong password for user id: {user.id}')
            return jsonify({"msg": "Invalid email/phone or password"}), 401
        
        # Generate token
        access_token = create_access_token(identity=str(user.id))
        
        logger.info(f'User logged in successfully: {user.id}')
        return jsonify(access_token=access_token, user=_serialize_user(user)), 200
    
    except Exception as e:
        logger.error(f'Login error: {str(e)}', exc_info=True)
        return jsonify({"msg": "Login failed. Please try again."}), 500


@auth_bp.route('/password-reset/request', methods=['POST'])
def request_password_reset():
    from models import PasswordResetToken, User
    data = _get_json_body()
    email = _normalize_email(data.get('email'))

    if not email or not EMAIL_RE.match(email):
        return jsonify({"msg": "Please enter a valid registered email address"}), 400

    dev_enabled = _password_reset_dev_enabled()
    email_configured = _password_reset_email_is_configured()
    if not email_configured and not dev_enabled:
        return jsonify({"msg": "Password reset email service is not configured. Please contact support."}), 503

    user = User.query.filter_by(email=email).first()
    generic_response = {"msg": PASSWORD_RESET_GENERIC_MSG}
    if not user:
        return jsonify(generic_response), 200

    now = datetime.utcnow()
    expires_minutes = _password_reset_ttl_minutes()
    reset_code = f'{secrets.randbelow(1000000):06d}'

    try:
        PasswordResetToken.query.filter_by(user_id=user.id, used_at=None).update({"used_at": now})
        reset_token = PasswordResetToken(
            user_id=user.id,
            token_hash=_hash_reset_token(reset_code),
            expires_at=now + timedelta(minutes=expires_minutes),
            request_ip=_clean_text(request.remote_addr, 45)
        )
        db.session.add(reset_token)
        db.session.commit()

        if email_configured:
            try:
                _send_password_reset_email(user, reset_code, expires_minutes)
            except Exception as err:
                reset_token.used_at = datetime.utcnow()
                db.session.commit()
                logger.error('Password reset email failed for user id %s: %s', user.id, err, exc_info=True)
                return jsonify({"msg": "Could not send reset email. Please try again later."}), 503

        response = {
            **generic_response,
            "expires_in_minutes": expires_minutes,
        }
        if dev_enabled and not email_configured:
            response["dev_reset_code"] = reset_code
        logger.info('Password reset code created for user id: %s', user.id)
        return jsonify(response), 200

    except Exception as e:
        db.session.rollback()
        logger.error(f'Password reset request error: {str(e)}', exc_info=True)
        return jsonify({"msg": "Password reset request failed. Please try again."}), 500


@auth_bp.route('/password-reset/confirm', methods=['POST'])
def confirm_password_reset():
    from models import PasswordResetToken, User
    try:
        data = _get_json_body()
        email = _normalize_email(data.get('email'))
        reset_code = re.sub(r'\s+', '', str(data.get('token') or data.get('code') or ''))
        password = str(data.get('password') or '')

        if not email or not EMAIL_RE.match(email):
            return jsonify({"msg": "Please enter a valid registered email address"}), 400

        if not reset_code:
            return jsonify({"msg": "Reset code is required"}), 400

        if len(password) < 6:
            return jsonify({"msg": "Password must be at least 6 characters"}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"msg": "Invalid or expired reset code"}), 400

        now = datetime.utcnow()
        active_token = (
            PasswordResetToken.query
            .filter(
                PasswordResetToken.user_id == user.id,
                PasswordResetToken.used_at.is_(None),
                PasswordResetToken.expires_at > now
            )
            .order_by(PasswordResetToken.created_at.desc())
            .first()
        )
        if not active_token:
            return jsonify({"msg": "Invalid or expired reset code"}), 400

        if active_token.attempts >= PASSWORD_RESET_MAX_ATTEMPTS:
            active_token.used_at = now
            db.session.commit()
            return jsonify({"msg": "Reset code has too many failed attempts. Request a new code."}), 400

        submitted_hash = _hash_reset_token(reset_code)
        if not hmac.compare_digest(active_token.token_hash, submitted_hash):
            active_token.attempts = (active_token.attempts or 0) + 1
            if active_token.attempts >= PASSWORD_RESET_MAX_ATTEMPTS:
                active_token.used_at = now
            db.session.commit()
            return jsonify({"msg": "Invalid or expired reset code"}), 400

        user.set_password(password)
        active_token.used_at = now
        active_token.attempts = (active_token.attempts or 0) + 1
        PasswordResetToken.query.filter(
            PasswordResetToken.user_id == user.id,
            PasswordResetToken.id != active_token.id,
            PasswordResetToken.used_at.is_(None)
        ).update({"used_at": now})
        db.session.commit()
        logger.info(f'Password reset confirmed for user id: {user.id}')
        return jsonify({"msg": "Password reset successfully. Please log in with your new password."}), 200

    except Exception as e:
        db.session.rollback()
        logger.error(f'Password reset confirmation error: {str(e)}', exc_info=True)
        return jsonify({"msg": "Password reset failed. Please try again."}), 500


@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    return confirm_password_reset()
