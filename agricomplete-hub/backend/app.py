from flask import Flask, jsonify
from flask_cors import CORS
from extensions import db, jwt, bcrypt
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///agricomplete.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'super-secret-key')

db.init_app(app)
jwt.init_app(app)
bcrypt.init_app(app)

from routes.auth import auth_bp
from routes.farm import farm_bp
from routes.market import market_bp
from routes.user import user_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(farm_bp, url_prefix='/api/farm')
app.register_blueprint(market_bp, url_prefix='/api/market')
app.register_blueprint(user_bp, url_prefix='/api/user')

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return jsonify({"message": "AgriComplete Hub API is running", "version": "1.0.0"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
