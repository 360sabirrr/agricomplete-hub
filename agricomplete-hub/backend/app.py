from flask import Flask, jsonify
from flask_cors import CORS
from extensions import db, jwt, bcrypt
import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, '.env'))

app = Flask(__name__)
CORS(app)

# Configuration
database_url = os.getenv('DATABASE_URL', 'sqlite:///agricomplete.db')
if database_url.startswith('postgres://'):
    database_url = database_url.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'super-secret-key')

db.init_app(app)
jwt.init_app(app)
bcrypt.init_app(app)

from routes.auth import auth_bp
from routes.farm import farm_bp
from routes.market import market_bp
from routes.user import user_bp
from routes.weather import weather_bp
from routes.disease import disease_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(farm_bp, url_prefix='/api/farm')
app.register_blueprint(market_bp, url_prefix='/api/market')
app.register_blueprint(user_bp, url_prefix='/api/user')
app.register_blueprint(weather_bp, url_prefix='/api/weather')
app.register_blueprint(disease_bp, url_prefix='/api/disease')

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return jsonify({"message": "AgriComplete Hub API is running", "version": "1.0.0"})

if __name__ == '__main__':
    app.run(debug=os.getenv('FLASK_DEBUG', 'False').lower() == 'true', port=5000)
