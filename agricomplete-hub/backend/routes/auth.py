import logging
import hashlib
import hmac
import os
import re
import secrets
from datetime import datetime, timedelta

import mailtrap as mt
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
PASSWORD_RESET_RESEND_SECONDS = 60
PASSWORD_RESET_MAX_REQUESTS_PER_HOUR = 5
PASSWORD_RESET_GENERIC_MSG = "If that account is registered, a reset code has been sent."


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


def _bounded_env_int(name, default, minimum, maximum):
    try:
        return max(minimum, min(maximum, int(os.getenv(name, default))))
    except (TypeError, ValueError):
        return default


def _password_reset_resend_seconds():
    return _bounded_env_int(
        'PASSWORD_RESET_RESEND_SECONDS',
        PASSWORD_RESET_RESEND_SECONDS,
        30,
        600
    )


def _password_reset_max_requests_per_hour():
    return _bounded_env_int(
        'PASSWORD_RESET_MAX_REQUESTS_PER_HOUR',
        PASSWORD_RESET_MAX_REQUESTS_PER_HOUR,
        2,
        20
    )


def _hash_reset_token(token):
    secret = str(current_app.config.get('JWT_SECRET_KEY') or '').encode('utf-8')
    return hmac.new(secret, str(token).encode('utf-8'), hashlib.sha256).hexdigest()


def _mailtrap_settings():
    return {
        'api_token': _clean_text(
            os.getenv('MAILTRAP_API_TOKEN') or os.getenv('MAILTRAP_API_KEY'),
            300
        ),
        'sender': _normalize_email(os.getenv('MAILTRAP_FROM_EMAIL')),
        'sender_name': _clean_text(os.getenv('MAILTRAP_FROM_NAME') or 'AgriComplete Hub', 80),
    }


def _mailtrap_is_configured(settings):
    return bool(settings['api_token'] and settings['sender'] and EMAIL_RE.match(settings['sender']))


def _password_reset_email_is_configured():
    return _mailtrap_is_configured(_mailtrap_settings())


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


def _send_password_reset_email(user, token, expires_minutes):
    settings = _mailtrap_settings()
    if not _mailtrap_is_configured(settings):
        raise RuntimeError('Mailtrap Email API is not configured')

    recipient_name = ' '.join(filter(None, [
        _clean_text(getattr(user, 'first_name', ''), 50),
        _clean_text(getattr(user, 'last_name', ''), 50),
    ]))
    mail = mt.Mail(
        sender=mt.Address(email=settings['sender'], name=settings['sender_name']),
        to=[mt.Address(email=user.email, name=recipient_name or None)],
        subject='AgriComplete password reset code',
        text=_reset_email_body(user, token, expires_minutes),
        category='Password Reset',
    )
    response = mt.MailtrapClient(token=settings['api_token']).send(mail)
    if isinstance(response, dict) and not response.get('success', False):
        raise RuntimeError('Mailtrap Email API did not accept the reset email')


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
        if _phone_numbers_match(existing_user.phone, phone):
            return existing_user
    return None


def _password_reset_request_details(data):
    requested_channel = _clean_text(data.get('channel'), 10).lower()
    legacy_email = _normalize_email(data.get('email'))
    identifier = _clean_text(
        data.get('identifier') or data.get('email'),
        120
    )
    if requested_channel and requested_channel != 'email':
        raise ValueError('Password reset is available by email only')

    normalized_identifier = _normalize_email(identifier or legacy_email)
    if not normalized_identifier or not EMAIL_RE.match(normalized_identifier):
        raise ValueError('Please enter a valid registered email address')

    return 'email', normalized_identifier


def _find_password_reset_user(User, channel, identifier):
    return User.query.filter_by(email=identifier).first()


def _password_reset_service_is_configured(channel):
    return channel == 'email' and _password_reset_email_is_configured()


def _send_password_reset_code(user, channel, token, expires_minutes):
    if channel != 'email':
        raise ValueError('Password reset is available by email only')
    _send_password_reset_email(user, token, expires_minutes)


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
    try:
        channel, identifier = _password_reset_request_details(data)
    except ValueError as err:
        return jsonify({"msg": str(err)}), 400

    dev_enabled = _password_reset_dev_enabled()
    service_configured = _password_reset_service_is_configured(channel)
    if not service_configured and not dev_enabled:
        logger.error(
            'Password reset %s provider is not configured. Check deployment environment variables.',
            channel
        )
        return jsonify({
            "msg": "Mailtrap password reset email is not configured. Please contact support.",
            "error_code": "EMAIL_PROVIDER_NOT_CONFIGURED",
        }), 503

    user = _find_password_reset_user(User, channel, identifier)
    resend_seconds = _password_reset_resend_seconds()
    generic_response = {
        "msg": PASSWORD_RESET_GENERIC_MSG,
        "channel": channel,
        "retry_after_seconds": resend_seconds,
    }
    if not user:
        return jsonify(generic_response), 200

    now = datetime.utcnow()
    expires_minutes = _password_reset_ttl_minutes()
    recent_tokens = (
        PasswordResetToken.query
        .filter(
            PasswordResetToken.user_id == user.id,
            PasswordResetToken.created_at > now - timedelta(hours=1)
        )
        .order_by(PasswordResetToken.created_at.desc())
        .all()
    )
    latest_token = recent_tokens[0] if recent_tokens else None
    if latest_token and latest_token.created_at:
        elapsed_seconds = max(0, int((now - latest_token.created_at).total_seconds()))
        if elapsed_seconds < resend_seconds:
            generic_response["retry_after_seconds"] = resend_seconds - elapsed_seconds
            return jsonify(generic_response), 200

    if len(recent_tokens) >= _password_reset_max_requests_per_hour():
        logger.warning('Password reset hourly limit reached for user id: %s', user.id)
        return jsonify(generic_response), 200

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

        if service_configured:
            try:
                _send_password_reset_code(user, channel, reset_code, expires_minutes)
            except Exception as err:
                reset_token.used_at = datetime.utcnow()
                db.session.commit()
                logger.error(
                    'Password reset %s delivery failed for user id %s: %s',
                    channel,
                    user.id,
                    err,
                    exc_info=True
                )
                return jsonify({"msg": "Could not send reset code. Please try again later."}), 503

        response = {
            **generic_response,
            "expires_in_minutes": expires_minutes,
        }
        if dev_enabled and not service_configured:
            response["dev_reset_code"] = reset_code
        logger.info('Password reset %s code created for user id: %s', channel, user.id)
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
        try:
            channel, identifier = _password_reset_request_details(data)
        except ValueError as err:
            return jsonify({"msg": str(err)}), 400
        reset_code = re.sub(r'\s+', '', str(data.get('token') or data.get('code') or ''))
        password = str(data.get('password') or '')

        if not re.fullmatch(r'\d{6}', reset_code):
            return jsonify({"msg": "Enter the 6-digit reset code"}), 400

        if len(password) < 6:
            return jsonify({"msg": "Password must be at least 6 characters"}), 400

        user = _find_password_reset_user(User, channel, identifier)
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
