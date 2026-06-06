from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
from extensions import db
from models import FarmAlert, User
from datetime import timezone
import logging
import re

user_bp = Blueprint('user', __name__)
logger = logging.getLogger(__name__)
EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')

def _get_current_user_id():
    try:
        return int(get_jwt_identity())
    except (TypeError, ValueError):
        return None

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

def _find_user_by_phone(phone, exclude_user_id):
    digits = _phone_digits(phone)
    if not digits:
        return None

    normalized_phone = _normalize_phone(phone)
    candidates = {phone, normalized_phone}
    user = User.query.filter(User.id != exclude_user_id, User.phone.in_(candidates)).first()
    if user:
        return user

    # Supports older rows saved before phone normalization.
    for existing_user in User.query.filter(User.id != exclude_user_id, User.phone.isnot(None)).all():
        if _phone_digits(existing_user.phone) == digits:
            return existing_user
    return None

def _serialize_user(user):
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email or '',
        "first_name": getattr(user, 'first_name', '') or '',
        "last_name": getattr(user, 'last_name', '') or '',
        "phone": getattr(user, 'phone', '') or '',
        "state": user.state or '',
        "district": getattr(user, 'district', '') or '',
        "village": getattr(user, 'village', '') or '',
        "total_area": getattr(user, 'total_area', '') or '',
        "soil_type": getattr(user, 'soil_type', '') or '',
        "irrigation_source": getattr(user, 'irrigation_source', '') or '',
        "primary_crops": getattr(user, 'primary_crops', '') or '',
        "farming_type": getattr(user, 'farming_type', '') or ''
    }

def _alert_created_at_utc(alert):
    if not alert.created_at:
        return None
    created_at = alert.created_at
    if created_at.tzinfo is None:
        created_at = created_at.replace(tzinfo=timezone.utc)
    return created_at.astimezone(timezone.utc).isoformat().replace('+00:00', 'Z')

def _alert_title(alert):
    alert_type = (alert.type or '').strip().lower()
    if alert_type == 'market':
        return 'Marketplace report'
    if alert_type:
        return f'{alert.type} alert'
    return 'Farm alert'

def _serialize_alert(alert):
    return {
        "id": alert.id,
        "title": _alert_title(alert),
        "type": alert.type or '',
        "priority": alert.priority or 'Normal',
        "message": alert.message,
        "created_at": _alert_created_at_utc(alert),
        "is_read": bool(alert.is_read),
    }

@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = _get_current_user_id()
    if user_id is None:
        return jsonify({"msg": "Invalid authentication token"}), 401

    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"msg": "Missing or invalid request body"}), 400

    try:
        # Update user fields
        if 'firstName' in data:
            user.first_name = _clean_text(data['firstName'], 50)
        if 'lastName' in data:
            user.last_name = _clean_text(data['lastName'], 50)
        if 'email' in data:
            email = _normalize_email(data['email'])
            if not EMAIL_RE.match(email):
                return jsonify({"msg": "Please enter a valid email address"}), 400
            existing_email = User.query.filter(User.id != user.id, User.email == email).first()
            if existing_email:
                return jsonify({"msg": "Email already registered"}), 400
            user.email = email
        if 'phone' in data:
            phone = _normalize_phone(data['phone']) or None
            if phone and len(_phone_digits(phone)) < 7:
                return jsonify({"msg": "Please enter a valid phone number"}), 400
            if phone and _find_user_by_phone(phone, user.id):
                return jsonify({"msg": "Phone number already registered"}), 400
            user.phone = phone
        if 'state' in data:
            user.state = _clean_text(data['state'], 50)
        if 'district' in data:
            user.district = _clean_text(data['district'], 50)
        if 'village' in data:
            user.village = _clean_text(data['village'], 100)
        if 'totalArea' in data:
            user.total_area = _clean_text(data['totalArea'], 50)
        if 'soilType' in data:
            user.soil_type = _clean_text(data['soilType'], 75)
        if 'irrigationSource' in data:
            user.irrigation_source = _clean_text(data['irrigationSource'], 100)
        if 'primaryCrops' in data:
            user.primary_crops = _clean_text(data['primaryCrops'], 150)
        if 'farmingType' in data:
            user.farming_type = _clean_text(data['farmingType'], 100)

        db.session.commit()

    except IntegrityError:
        db.session.rollback()
        return jsonify({"msg": "Email or phone number already registered"}), 400
    except Exception as err:
        db.session.rollback()
        logger.error(f'Profile update error: {err}', exc_info=True)
        return jsonify({"msg": "Profile update failed. Please try again."}), 500

    return jsonify({
        "msg": "Profile updated successfully",
        "user": _serialize_user(user)
    }), 200

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = _get_current_user_id()
    if user_id is None:
        return jsonify({"msg": "Invalid authentication token"}), 401

    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({"user": _serialize_user(user)}), 200

@user_bp.route('/alerts', methods=['GET'])
@jwt_required()
def get_alerts():
    user_id = _get_current_user_id()
    if user_id is None:
        return jsonify({"msg": "Invalid authentication token"}), 401

    alerts = (
        FarmAlert.query
        .filter_by(user_id=user_id)
        .order_by(FarmAlert.created_at.desc())
        .limit(30)
        .all()
    )
    unread_count = FarmAlert.query.filter_by(user_id=user_id, is_read=False).count()

    return jsonify({
        "alerts": [_serialize_alert(alert) for alert in alerts],
        "unread_count": unread_count,
    }), 200

@user_bp.route('/alerts/read', methods=['POST'])
@jwt_required()
def mark_alerts_read():
    user_id = _get_current_user_id()
    if user_id is None:
        return jsonify({"msg": "Invalid authentication token"}), 401

    FarmAlert.query.filter_by(user_id=user_id, is_read=False).update({"is_read": True})
    db.session.commit()
    return jsonify({"msg": "Notifications marked as read"}), 200
