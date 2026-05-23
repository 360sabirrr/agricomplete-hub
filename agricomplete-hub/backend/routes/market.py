from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db

market_bp = Blueprint('market', __name__)

def _get_current_user_id():
    try:
        return int(get_jwt_identity())
    except (TypeError, ValueError):
        return None

@market_bp.route('/listings', methods=['GET'])
def get_listings():
    from models import MarketListing, User
    listings = MarketListing.query.order_by(MarketListing.created_at.desc()).all()
    users_by_id = {}
    for listing in listings:
        if listing.seller_id not in users_by_id:
            users_by_id[listing.seller_id] = User.query.get(listing.seller_id)

    def seller_display_name(user):
        if not user:
            return "Farmer"
        first = (getattr(user, 'first_name', '') or '').strip()
        last = (getattr(user, 'last_name', '') or '').strip()
        full = f"{first} {last}".strip()
        return full or user.username or "Farmer"

    return jsonify([{
        "id": l.id,
        "crop_name": l.crop_name,
        "price": l.price,
        "quantity": l.quantity,
        "location": l.location,
        "seller_name": seller_display_name(users_by_id.get(l.seller_id)),
        "created_at": l.created_at.isoformat()
    } for l in listings]), 200

@market_bp.route('/listings', methods=['POST'])
@jwt_required()
def create_listing():
    from models import MarketListing
    data = request.get_json()
    if not data:
        return jsonify({"msg": "Missing request body"}), 400

    required_fields = ['crop_name', 'price', 'quantity', 'location']
    missing = [field for field in required_fields if not data.get(field)]
    if missing:
        return jsonify({"msg": f"Missing required fields: {', '.join(missing)}"}), 400

    user_id = _get_current_user_id()
    if user_id is None:
        return jsonify({"msg": "Invalid authentication token"}), 401

    try:
        price_value = float(data['price'])
    except (TypeError, ValueError):
        return jsonify({"msg": "Invalid price value"}), 400

    if price_value <= 0:
        return jsonify({"msg": "Price must be greater than 0"}), 400

    listing = MarketListing(
        crop_name=data['crop_name'],
        price=price_value,
        quantity=data['quantity'],
        location=data.get('location', ''),
        seller_id=user_id
    )
    db.session.add(listing)
    db.session.commit()
    return jsonify({"msg": "Listing created", "id": listing.id}), 201
