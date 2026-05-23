from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import User

user_bp = Blueprint('user', __name__)

def _get_current_user_id():
    try:
        return int(get_jwt_identity())
    except (TypeError, ValueError):
        return None

@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = _get_current_user_id()
    if user_id is None:
        return jsonify({"msg": "Invalid authentication token"}), 401

    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json()

    # Update user fields
    if 'firstName' in data:
        user.first_name = data['firstName']
    if 'lastName' in data:
        user.last_name = data['lastName']
    if 'email' in data:
        user.email = data['email']
    if 'phone' in data:
        user.phone = data['phone']
    if 'state' in data:
        user.state = data['state']
    if 'district' in data:
        user.district = data['district']
    if 'village' in data:
        user.village = data['village']

    db.session.commit()

    return jsonify({
        "msg": "Profile updated successfully",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": getattr(user, 'first_name', ''),
            "last_name": getattr(user, 'last_name', ''),
            "phone": getattr(user, 'phone', ''),
            "state": user.state,
            "district": getattr(user, 'district', ''),
            "village": getattr(user, 'village', '')
        }
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

    return jsonify({
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": getattr(user, 'first_name', ''),
            "last_name": getattr(user, 'last_name', ''),
            "phone": getattr(user, 'phone', ''),
            "state": user.state,
            "district": getattr(user, 'district', ''),
            "village": getattr(user, 'village', '')
        }
    }), 200
