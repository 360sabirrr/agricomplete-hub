from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db

farm_bp = Blueprint('farm', __name__)

def _get_current_user_id():
    try:
        return int(get_jwt_identity())
    except (TypeError, ValueError):
        return None

@farm_bp.route('/crops', methods=['GET'])
@jwt_required()
def get_crops():
    from models import Crop
    user_id = _get_current_user_id()
    if user_id is None:
        return jsonify({"msg": "Invalid authentication token"}), 401

    crops = Crop.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": c.id,
        "name": c.name,
        "planted_date": c.planted_date.isoformat() if c.planted_date else None,
        "status": c.status
    } for c in crops]), 200

@farm_bp.route('/crops', methods=['POST'])
@jwt_required()
def add_crop():
    from models import Crop
    data = request.get_json()
    user_id = _get_current_user_id()
    if user_id is None:
        return jsonify({"msg": "Invalid authentication token"}), 401

    new_crop = Crop(
        name=data['name'],
        user_id=user_id,
        status=data.get('status', 'Active')
    )
    db.session.add(new_crop)
    db.session.commit()
    return jsonify({"msg": "Crop added", "id": new_crop.id}), 201
