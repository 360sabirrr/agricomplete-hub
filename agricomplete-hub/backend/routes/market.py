from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from datetime import timezone
import re

market_bp = Blueprint('market', __name__)
MAX_IMAGE_DATA_LENGTH = 900000
IMAGE_DATA_RE = re.compile(r'^data:image/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=]+$')
LISTING_CATEGORIES = {
    'Grains & Cereals',
    'Pulses',
    'Vegetables',
    'Fruits',
    'Spices',
    'Oilseeds',
    'Cash Crops',
    'Other',
}
CATEGORY_RULES = [
    ('Grains & Cereals', ('rice', 'paddy', 'wheat', 'maize', 'corn', 'jowar', 'bajra', 'sorghum', 'millet', 'ragi', 'barley')),
    ('Pulses', ('pulse', 'dal', 'chana', 'chickpea', 'gram', 'tur', 'toor', 'arhar', 'moong', 'urad', 'masoor', 'lentil', 'pea')),
    ('Vegetables', ('onion', 'potato', 'tomato', 'carrot', 'brinjal', 'eggplant', 'cabbage', 'cauliflower', 'okra', 'bhindi', 'vegetable')),
    ('Fruits', ('mango', 'banana', 'orange', 'grape', 'apple', 'pomegranate', 'guava', 'papaya', 'fruit')),
    ('Spices', ('chilli', 'chili', 'pepper', 'turmeric', 'haldi', 'coriander', 'jeera', 'cumin', 'spice')),
    ('Oilseeds', ('soy', 'soybean', 'groundnut', 'peanut', 'sunflower', 'mustard', 'sesame', 'til', 'oilseed')),
    ('Cash Crops', ('sugarcane', 'cotton', 'jute', 'tobacco')),
]

def _get_current_user_id():
    try:
        return int(get_jwt_identity())
    except (TypeError, ValueError):
        return None

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

def _clean_image_data(value):
    image_data = _clean_text(value)
    if not image_data:
        return ''
    if not IMAGE_DATA_RE.match(image_data):
        raise ValueError('Invalid image data')
    if len(image_data) > MAX_IMAGE_DATA_LENGTH:
        raise ValueError('Image is too large')
    return image_data

def _clean_category(value):
    category = _clean_text(value, 50)
    return category if category in LISTING_CATEGORIES else ''

def _infer_category(crop_name):
    normalized = _clean_text(crop_name).lower()
    for category, keywords in CATEGORY_RULES:
        if any(keyword in normalized for keyword in keywords):
            return category
    return 'Other'

def _listing_category(listing):
    return _clean_category(getattr(listing, 'category', '')) or _infer_category(getattr(listing, 'crop_name', ''))

def _listing_created_at_utc(listing):
    if not listing.created_at:
        return None
    created_at = listing.created_at
    if created_at.tzinfo is None:
        created_at = created_at.replace(tzinfo=timezone.utc)
    return created_at.astimezone(timezone.utc).isoformat().replace('+00:00', 'Z')

def seller_display_name(user):
    if not user:
        return "Farmer"
    first = (getattr(user, 'first_name', '') or '').strip()
    last = (getattr(user, 'last_name', '') or '').strip()
    full = f"{first} {last}".strip()
    return full or user.username or "Farmer"

def _serialize_listing(listing, seller):
    return {
        "id": listing.id,
        "crop_name": listing.crop_name,
        "price": listing.price,
        "quantity": listing.quantity,
        "location": listing.location,
        "category": _listing_category(listing),
        "image_data": listing.image_data or '',
        "seller_name": seller_display_name(seller),
        "seller_phone": getattr(seller, 'phone', '') or '',
        "seller_email": getattr(seller, 'email', '') or '',
        "seller_id": listing.seller_id,
        "created_at": _listing_created_at_utc(listing)
    }

@market_bp.route('/listings', methods=['GET'])
def get_listings():
    from models import MarketListing, User
    listings = MarketListing.query.order_by(MarketListing.created_at.desc()).all()
    categories_changed = False
    for listing in listings:
        if not _clean_category(getattr(listing, 'category', '')):
            listing.category = _infer_category(listing.crop_name)
            categories_changed = True
    if categories_changed:
        db.session.commit()

    users_by_id = {}
    for listing in listings:
        if listing.seller_id not in users_by_id:
            users_by_id[listing.seller_id] = User.query.get(listing.seller_id)

    return jsonify([
        _serialize_listing(l, users_by_id.get(l.seller_id))
        for l in listings
    ]), 200

@market_bp.route('/listings', methods=['POST'])
@jwt_required()
def create_listing():
    from models import MarketListing
    data = _get_json_body()
    if not data:
        return jsonify({"msg": "Missing request body"}), 400

    required_fields = ['crop_name', 'price', 'quantity', 'location', 'category']
    missing = [field for field in required_fields if not _clean_text(data.get(field))]
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

    try:
        image_data = _clean_image_data(data.get('image_data'))
    except ValueError as err:
        return jsonify({"msg": str(err)}), 400

    category = _clean_category(data.get('category'))
    if not category:
        return jsonify({"msg": "Invalid category"}), 400

    listing = MarketListing(
        crop_name=_clean_text(data['crop_name'], 100),
        price=price_value,
        quantity=_clean_text(data['quantity'], 50),
        location=_clean_text(data.get('location'), 100),
        category=category,
        image_data=image_data,
        seller_id=user_id
    )
    db.session.add(listing)
    db.session.commit()
    return jsonify({"msg": "Listing created", "id": listing.id}), 201

@market_bp.route('/listings/<int:id>', methods=['PUT'])
@jwt_required()
def update_listing(id):
    from models import MarketListing
    data = _get_json_body()
    user_id = _get_current_user_id()
    
    listing = MarketListing.query.get_or_404(id)
    if listing.seller_id != user_id:
        return jsonify({"msg": "Unauthorized"}), 403
        
    if not data:
        return jsonify({"msg": "Missing request body"}), 400
        
    if 'crop_name' in data:
        crop_name = _clean_text(data['crop_name'], 100)
        if not crop_name:
            return jsonify({"msg": "Crop name is required"}), 400
        listing.crop_name = crop_name
    if 'price' in data: 
        try:
            price_value = float(data['price'])
        except (TypeError, ValueError):
            return jsonify({"msg": "Invalid price"}), 400
        if price_value <= 0:
            return jsonify({"msg": "Price must be greater than 0"}), 400
        listing.price = price_value
    if 'quantity' in data:
        quantity = _clean_text(data['quantity'], 50)
        if not quantity:
            return jsonify({"msg": "Quantity is required"}), 400
        listing.quantity = quantity
    if 'location' in data:
        location = _clean_text(data['location'], 100)
        if not location:
            return jsonify({"msg": "Location is required"}), 400
        listing.location = location
    if 'category' in data:
        category = _clean_category(data.get('category'))
        if not category:
            return jsonify({"msg": "Invalid category"}), 400
        listing.category = category
    if 'image_data' in data:
        try:
            listing.image_data = _clean_image_data(data.get('image_data'))
        except ValueError as err:
            return jsonify({"msg": str(err)}), 400
    
    db.session.commit()
    return jsonify({"msg": "Listing updated"}), 200

@market_bp.route('/listings/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_listing(id):
    from models import MarketListing
    user_id = _get_current_user_id()
    
    listing = MarketListing.query.get_or_404(id)
    if listing.seller_id != user_id:
        return jsonify({"msg": "Unauthorized"}), 403
        
    db.session.delete(listing)
    db.session.commit()
    return jsonify({"msg": "Listing deleted"}), 200
