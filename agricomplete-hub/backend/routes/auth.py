import logging
import re

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError

from extensions import db

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

auth_bp = Blueprint('auth', __name__)


EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')


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
        access_token = create_access_token(identity=str(user.id), expires_delta=False)
        
        logger.info(f'User logged in successfully: {user.id}')
        return jsonify(access_token=access_token, user=_serialize_user(user)), 200
    
    except Exception as e:
        logger.error(f'Login error: {str(e)}', exc_info=True)
        return jsonify({"msg": "Login failed. Please try again."}), 500
