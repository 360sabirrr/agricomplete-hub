from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from extensions import db, jwt, bcrypt
import os
import secrets
from datetime import timedelta
from dotenv import load_dotenv
import logging
import re
from sqlalchemy import text

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, '..', 'frontend')
INSTANCE_DIR = os.path.join(BASE_DIR, 'instance')
load_dotenv(os.path.join(BASE_DIR, '.env'), encoding='utf-8-sig', override=True)

app = Flask(__name__)
CORS(app)


def _is_production():
    return (
        str(os.getenv('FLASK_ENV', '')).strip().lower() == 'production' or
        bool(os.getenv('RENDER'))
    )


def _jwt_secret_key():
    secret_key = str(os.getenv('JWT_SECRET_KEY') or '').strip()
    insecure_values = {
        '',
        'change_this_secret',
        'your_secret_key',
        'super-secret-key',
    }

    if _is_production():
        if secret_key.lower() in insecure_values or len(secret_key) < 32:
            raise RuntimeError(
                'JWT_SECRET_KEY must be configured with at least 32 characters in production.'
            )
        return secret_key

    if secret_key.lower() in insecure_values:
        secret_key = secrets.token_urlsafe(48)
        logger.warning(
            'JWT_SECRET_KEY is not securely configured. Using a temporary development key; '
            'existing sessions will be invalid after restart.'
        )
    return secret_key


def _jwt_access_token_minutes():
    raw_value = os.getenv('JWT_ACCESS_TOKEN_MINUTES', '60')
    try:
        minutes = int(raw_value)
    except (TypeError, ValueError) as err:
        raise RuntimeError('JWT_ACCESS_TOKEN_MINUTES must be an integer.') from err

    if not 5 <= minutes <= 1440:
        raise RuntimeError('JWT_ACCESS_TOKEN_MINUTES must be between 5 and 1440.')
    return minutes


def _database_url():
    database_url = (
        os.getenv('DATABASE_URL') or 'sqlite:///agricomplete.db'
    ).strip().strip('"').strip("'")

    if database_url.startswith('postgres://'):
        return database_url.replace('postgres://', 'postgresql://', 1)

    sqlite_prefix = 'sqlite:///'
    if database_url.startswith(sqlite_prefix):
        sqlite_path = database_url[len(sqlite_prefix):]
        if sqlite_path != ':memory:' and not os.path.isabs(sqlite_path):
            os.makedirs(INSTANCE_DIR, exist_ok=True)
            absolute_path = os.path.abspath(os.path.join(INSTANCE_DIR, sqlite_path))
            return f'{sqlite_prefix}{absolute_path.replace(os.sep, "/")}'

    return database_url


# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = _database_url()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = _jwt_secret_key()
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=_jwt_access_token_minutes())

db.init_app(app)
jwt.init_app(app)
bcrypt.init_app(app)


def _normalize_phone(value):
    phone = str(value or '').strip()
    if not phone:
        return ''
    return re.sub(r'[\s().-]+', '', phone)


def _phone_digits(value):
    return re.sub(r'\D+', '', str(value or ''))


def ensure_sqlite_schema():
    if db.engine.dialect.name != 'sqlite':
        return

    user_columns = {
        'first_name': 'VARCHAR(50)',
        'last_name': 'VARCHAR(50)',
        'phone': 'VARCHAR(20)',
        'state': 'VARCHAR(50)',
        'district': 'VARCHAR(50)',
        'village': 'VARCHAR(100)',
        'total_area': 'VARCHAR(50)',
        'soil_type': 'VARCHAR(75)',
        'irrigation_source': 'VARCHAR(100)',
        'primary_crops': 'VARCHAR(150)',
        'farming_type': 'VARCHAR(100)',
        'subscription': "VARCHAR(20) DEFAULT 'Basic'",
        'created_at': 'DATETIME',
    }
    market_listing_columns = {
        'category': 'VARCHAR(50)',
        'image_data': 'TEXT',
    }

    with db.engine.begin() as conn:
        existing_columns = {
            row[1] for row in conn.execute(text('PRAGMA table_info("user")')).fetchall()
        }
        for column_name, column_type in user_columns.items():
            if column_name not in existing_columns:
                conn.execute(text(f'ALTER TABLE "user" ADD COLUMN {column_name} {column_type}'))

        existing_market_columns = {
            row[1] for row in conn.execute(text('PRAGMA table_info("market_listing")')).fetchall()
        }
        for column_name, column_type in market_listing_columns.items():
            if column_name not in existing_market_columns:
                conn.execute(text(f'ALTER TABLE market_listing ADD COLUMN {column_name} {column_type}'))

        conn.execute(text('UPDATE "user" SET email = LOWER(TRIM(email)) WHERE email IS NOT NULL'))
        conn.execute(text('UPDATE "user" SET phone = NULL WHERE phone IS NULL OR TRIM(phone) = ""'))

        seen_phone_digits = set()
        rows = conn.execute(text('SELECT id, phone FROM "user" WHERE phone IS NOT NULL ORDER BY id')).fetchall()
        for user_id, phone in rows:
            normalized_phone = _normalize_phone(phone)
            digits = _phone_digits(normalized_phone)
            if not digits:
                conn.execute(text('UPDATE "user" SET phone = NULL WHERE id = :id'), {'id': user_id})
                continue
            if digits in seen_phone_digits:
                logger.warning(f'Removing duplicate phone from user id {user_id} during SQLite auth cleanup')
                conn.execute(text('UPDATE "user" SET phone = NULL WHERE id = :id'), {'id': user_id})
                continue
            seen_phone_digits.add(digits)
            if normalized_phone != phone:
                conn.execute(
                    text('UPDATE "user" SET phone = :phone WHERE id = :id'),
                    {'phone': normalized_phone, 'id': user_id}
                )

        conn.execute(text('CREATE UNIQUE INDEX IF NOT EXISTS idx_user_phone_unique ON "user"(phone) WHERE phone IS NOT NULL'))


def ensure_postgres_schema():
    if db.engine.dialect.name != 'postgresql':
        return

    user_columns = {
        'first_name': 'VARCHAR(50)',
        'last_name': 'VARCHAR(50)',
        'phone': 'VARCHAR(20)',
        'state': 'VARCHAR(50)',
        'district': 'VARCHAR(50)',
        'village': 'VARCHAR(100)',
        'total_area': 'VARCHAR(50)',
        'soil_type': 'VARCHAR(75)',
        'irrigation_source': 'VARCHAR(100)',
        'primary_crops': 'VARCHAR(150)',
        'farming_type': 'VARCHAR(100)',
        'subscription': "VARCHAR(20) DEFAULT 'Basic'",
        'created_at': 'TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()',
    }
    market_listing_columns = {
        'category': 'VARCHAR(50)',
        'image_data': 'TEXT',
    }

    with db.engine.begin() as conn:
        for column_name, column_type in user_columns.items():
            conn.execute(text(f'ALTER TABLE "user" ADD COLUMN IF NOT EXISTS {column_name} {column_type}'))
        for column_name, column_type in market_listing_columns.items():
            conn.execute(text(f'ALTER TABLE market_listing ADD COLUMN IF NOT EXISTS {column_name} {column_type}'))
        conn.execute(text('UPDATE "user" SET email = LOWER(TRIM(email)) WHERE email IS NOT NULL'))
        conn.execute(text("UPDATE \"user\" SET phone = NULL WHERE phone IS NULL OR TRIM(phone) = ''"))

from routes.auth import auth_bp
from routes.farm import farm_bp
from routes.market import market_bp
from routes.user import user_bp
from routes.weather import weather_bp
from routes.disease import disease_bp
from routes.assistant import assistant_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(farm_bp, url_prefix='/api/farm')
app.register_blueprint(market_bp, url_prefix='/api/market')
app.register_blueprint(user_bp, url_prefix='/api/user')
app.register_blueprint(weather_bp, url_prefix='/api/weather')
app.register_blueprint(disease_bp, url_prefix='/api/disease')
app.register_blueprint(assistant_bp, url_prefix='/api/assistant')


with app.app_context():
    db.create_all()
    ensure_sqlite_schema()
    ensure_postgres_schema()

# Error handlers
@app.errorhandler(400)
def bad_request(error):
    logger.error(f'Bad request: {error}')
    return jsonify({"msg": "Bad request"}), 400

@app.errorhandler(401)
def unauthorized(error):
    return jsonify({"msg": "Unauthorized"}), 401

@app.errorhandler(404)
def not_found(error):
    return jsonify({"msg": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f'Internal server error: {error}', exc_info=True)
    return jsonify({"msg": "Internal server error"}), 500

@app.route('/')
def index():
    return send_from_directory(FRONTEND_DIR, 'index.html')

@app.route('/<path:filename>')
def serve_frontend(filename):
    # Don't serve frontend for API routes
    if filename.startswith('api/'):
        return jsonify({"msg": "Not Found"}), 404
    
    import os
    filepath = os.path.join(FRONTEND_DIR, filename)
    if os.path.isfile(filepath):
        return send_from_directory(FRONTEND_DIR, filename)
    
    # Return index.html for client-side routing
    return send_from_directory(FRONTEND_DIR, 'index.html')

if __name__ == '__main__':
    logger.info('Starting AgriComplete Hub backend...')
    app.run(
        debug=os.getenv('FLASK_DEBUG', 'False').lower() == 'true',
        port=5000,
        use_reloader=False
    )
