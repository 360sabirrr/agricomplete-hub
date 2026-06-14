import os
import sys
import unittest
from datetime import datetime

from flask import Flask
from flask_jwt_extended import JWTManager, create_access_token


BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from extensions import bcrypt, db
from models import MarketListing, User
from routes.auth import auth_bp
from routes.user import user_bp
from user_dates import backfill_missing_user_created_at


class UserJoinedDateTestCase(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config.update(
            TESTING=True,
            SQLALCHEMY_DATABASE_URI='sqlite:///:memory:',
            SQLALCHEMY_TRACK_MODIFICATIONS=False,
            JWT_SECRET_KEY='joined-date-test-secret-at-least-32-bytes',
        )
        db.init_app(self.app)
        bcrypt.init_app(self.app)
        JWTManager(self.app)
        self.app.register_blueprint(auth_bp, url_prefix='/api/auth')
        self.app.register_blueprint(user_bp, url_prefix='/api/user')

        with self.app.app_context():
            db.create_all()
            user = User(
                username='joined-date-user',
                email='joined@example.com',
                created_at=datetime(2026, 6, 15, 10, 30, 45),
            )
            user.set_password('StrongPassword123!')
            db.session.add(user)
            db.session.commit()
            self.user_id = user.id
            self.token = create_access_token(identity=str(user.id))

        self.client = self.app.test_client()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_profile_returns_real_joined_date_as_utc(self):
        response = self.client.get(
            '/api/user/profile',
            headers={'Authorization': f'Bearer {self.token}'},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()['user']['created_at'], '2026-06-15T10:30:45Z')

    def test_login_returns_real_joined_date_as_utc(self):
        response = self.client.post(
            '/api/auth/login',
            json={'email': 'joined@example.com', 'password': 'StrongPassword123!'},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()['user']['created_at'], '2026-06-15T10:30:45Z')

    def test_legacy_user_date_is_restored_from_earliest_activity(self):
        with self.app.app_context():
            user = db.session.get(User, self.user_id)
            user.created_at = None
            db.session.add(MarketListing(
                crop_name='Tomato',
                price=20,
                quantity='10 kg',
                seller_id=user.id,
                created_at=datetime(2025, 8, 7, 9, 15, 0),
            ))
            db.session.commit()

            repaired = backfill_missing_user_created_at()
            db.session.refresh(user)

            self.assertEqual(repaired, 1)
            self.assertEqual(user.created_at, datetime(2025, 8, 7, 9, 15, 0))

    def test_migration_date_is_corrected_when_activity_is_older(self):
        with self.app.app_context():
            user = db.session.get(User, self.user_id)
            user.created_at = datetime(2026, 6, 10, 12, 0, 0)
            db.session.add(MarketListing(
                crop_name='Onion',
                price=18,
                quantity='20 kg',
                seller_id=user.id,
                created_at=datetime(2026, 6, 3, 8, 45, 0),
            ))
            db.session.commit()

            repaired = backfill_missing_user_created_at()
            db.session.refresh(user)

            self.assertEqual(repaired, 1)
            self.assertEqual(user.created_at, datetime(2026, 6, 3, 8, 45, 0))

    def test_valid_joined_date_is_not_replaced_by_later_activity(self):
        with self.app.app_context():
            user = db.session.get(User, self.user_id)
            db.session.add(MarketListing(
                crop_name='Wheat',
                price=25,
                quantity='30 kg',
                seller_id=user.id,
                created_at=datetime(2026, 6, 16, 9, 0, 0),
            ))
            db.session.commit()

            repaired = backfill_missing_user_created_at()
            db.session.refresh(user)

            self.assertEqual(repaired, 0)
            self.assertEqual(user.created_at, datetime(2026, 6, 15, 10, 30, 45))


if __name__ == '__main__':
    unittest.main()
