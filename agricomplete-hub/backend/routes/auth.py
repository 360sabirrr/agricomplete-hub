from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from extensions import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    from models import User
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Email already registered"}), 400
    
    user = User(
        username=data.get('username', data['email'].split('@')[0]),
        email=data['email'],
        state=data.get('state', '')
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"msg": "User created successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    from models import User
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.check_password(data['password']):
        # JWT subject ("sub") should be a string for compatibility with PyJWT validation.
        access_token = create_access_token(identity=str(user.id))
        return jsonify(access_token=access_token, user={
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "state": user.state
        }), 200
    
    return jsonify({"msg": "Bad email or password"}), 401
