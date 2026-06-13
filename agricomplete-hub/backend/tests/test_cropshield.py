import base64
import io
import unittest

from flask import Flask
from flask_jwt_extended import create_access_token
from PIL import Image

from extensions import bcrypt, db, jwt
from models import DiseaseScan, User
from routes.cropshield import cropshield_bp


def evidence_image(color, size=(640, 480)):
    image = Image.new('RGB', size, color)
    output = io.BytesIO()
    image.save(output, format='JPEG', quality=82)
    encoded = base64.b64encode(output.getvalue()).decode('ascii')
    return f'data:image/jpeg;base64,{encoded}'


class CropShieldRouteTests(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config.update(
            SQLALCHEMY_DATABASE_URI='sqlite:///:memory:',
            SQLALCHEMY_TRACK_MODIFICATIONS=False,
            JWT_SECRET_KEY='crop-shield-test-secret-that-is-long-enough',
            TESTING=True,
        )
        db.init_app(self.app)
        jwt.init_app(self.app)
        bcrypt.init_app(self.app)
        self.app.register_blueprint(cropshield_bp, url_prefix='/api/cropshield')

        with self.app.app_context():
            db.create_all()
            user = User(
                username='shieldtester',
                email='shield@example.com',
                password_hash='test',
                first_name='Asha',
                last_name='Patil',
            )
            db.session.add(user)
            db.session.flush()
            db.session.add(DiseaseScan(
                user_id=user.id,
                class_name='Tomato___Late_blight',
                display_name='Tomato - Late blight',
                confidence=91.2,
                severity='High',
                badge_class='badge-danger',
            ))
            db.session.commit()
            self.token = create_access_token(identity=str(user.id))

        self.client = self.app.test_client()
        self.headers = {'Authorization': f'Bearer {self.token}'}
        self.baseline = evidence_image((55, 150, 60))
        self.damage = evidence_image((145, 95, 35))
        self.model_image = evidence_image((105, 130, 45), (224, 224))

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def payload(self, **overrides):
        data = {
            'report_format': 'insurance_v1',
            'season': 'Kharif',
            'season_year': 2026,
            'farmer_name': 'Asha Patil',
            'policy_number': 'PMFBY-2026-0001',
            'contact_number': '+919876543210',
            'state': 'Maharashtra',
            'district': 'Pune',
            'tehsil': 'Haveli',
            'block': 'Pune',
            'gram_panchayat': 'Wagholi',
            'village': 'Wagholi',
            'survey_date': '2026-06-02',
            'gps_latitude': 18.5808,
            'gps_longitude': 73.9787,
            'survey_number': '42/3',
            'crop_pattern': 'Single Crop',
            'crop_name': 'Tomato',
            'field_area_acres': 2,
            'sowing_date': '2026-05-01',
            'expected_harvest_date': '2026-08-01',
            'expected_yield_per_acre_kg': 5000,
            'market_price_per_kg': 20,
            'damage_type': 'Storm',
            'damage_occurred_at': '2026-06-01T08:00',
            'loss_intimated_at': '2026-06-02T08:00',
            'reported_damage_percent': 35,
            'notes': 'Storm damage on the eastern plot.',
            'farmer_declaration': True,
            'farmer_signature_data': self.baseline,
            'farmer_signature_method': 'Thumb impression',
            'aadhaar_available': True,
            'bank_details_available': True,
            'land_record_available': True,
            'damage_image_data': self.damage,
            'weather': {
                'condition': 'Rain',
                'temperature_c': 24,
                'humidity': 82,
                'impact': {
                    'location': 'Pune, Maharashtra, India',
                    'period_start': '2026-05-13',
                    'period_end': '2026-06-11',
                    'windows': {
                        '7_days': {
                            'rainfall_mm': 42.5,
                            'max_temperature_c': 35.2,
                            'min_temperature_c': 21.1,
                            'average_humidity_percent': 78.5,
                        },
                        '15_days': {
                            'rainfall_mm': 75.0,
                            'max_temperature_c': 37.0,
                            'min_temperature_c': 20.5,
                            'average_humidity_percent': 74.2,
                        },
                        '30_days': {
                            'rainfall_mm': 122.8,
                            'max_temperature_c': 39.1,
                            'min_temperature_c': 19.8,
                            'average_humidity_percent': 70.4,
                        },
                    },
                },
            },
        }
        data.update(overrides)
        return data

    def create_case(self):
        response = self.client.post(
            '/api/cropshield/cases',
            json=self.payload(),
            headers=self.headers,
        )
        self.assertEqual(response.status_code, 201)
        return response.get_json()['case']

    def test_version_reports_damage_only_evidence(self):
        response = self.client.get('/api/cropshield/version')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()['evidence_mode'], 'damage_only')

    def test_create_verify_and_download_report(self):
        case = self.create_case()
        self.assertEqual(case['estimated_loss'], 70000.0)
        self.assertEqual(case['field_area_acres'], 2.0)
        self.assertEqual(case['intimation_hours'], 24.0)
        self.assertTrue(case['intimated_within_72_hours'])
        self.assertEqual(case['intimation_status'], 'Within 72 hours')
        self.assertEqual(case['claim_checklist']['completed'], 4)
        self.assertEqual(case['claim_checklist']['total'], 4)
        self.assertEqual(case['claim_checklist']['readiness_percent'], 100)
        self.assertEqual(case['claim_score'], 100)
        self.assertEqual(case['claim_status'], 'Ready for Insurance Claim')
        self.assertEqual(case['estimated_yield_loss_kg'], 3500.0)
        self.assertRegex(case['reference'], r'^CS-2026-\d{6}$')
        self.assertNotIn('baseline_image_data', case)
        self.assertNotIn('baseline_sha256', case)
        land_record = next(
            item for item in case['claim_checklist']['items']
            if item['key'] == 'land_record'
        )
        self.assertTrue(land_record['complete'])
        self.assertNotIn('sha256', land_record)

        verification = self.client.get(
            f"/api/cropshield/verify/{case['reference'].lower()}"
        )
        self.assertEqual(verification.status_code, 200)
        verification_data = verification.get_json()
        self.assertTrue(verification_data['verified'])
        self.assertEqual(verification_data['survey_number'], '42/3')
        self.assertTrue(verification_data['policy_number'].endswith('0001'))
        self.assertNotIn('farmer_name', verification_data)
        self.assertNotIn('contact_number', verification_data)

        report = self.client.get(
            f"/api/cropshield/cases/{case['id']}/report",
            headers=self.headers,
        )
        self.assertEqual(report.status_code, 200)
        self.assertTrue(report.data.startswith(b'%PDF'))

        hindi_report = self.client.get(
            f"/api/cropshield/cases/{case['id']}/report?lang=hi",
            headers=self.headers,
        )
        self.assertEqual(hindi_report.status_code, 200)
        self.assertTrue(hindi_report.data.startswith(b'%PDF'))

    def test_requires_damage_evidence(self):
        response = self.client.post(
            '/api/cropshield/cases',
            json=self.payload(damage_image_data=''),
            headers=self.headers,
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn('Damage image', response.get_json()['msg'])

    def test_requires_signature_or_thumb_impression(self):
        response = self.client.post(
            '/api/cropshield/cases',
            json=self.payload(
                farmer_signature_data='',
                farmer_signature_method=''
            ),
            headers=self.headers,
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn('signature or thumb impression', response.get_json()['msg'])

    def test_disease_claim_requires_and_records_ai_evidence(self):
        missing_evidence = self.client.post(
            '/api/cropshield/cases',
            json=self.payload(
                damage_type='Disease',
            ),
            headers=self.headers,
        )
        self.assertEqual(missing_evidence.status_code, 400)
        self.assertIn('saved AI diagnosis', missing_evidence.get_json()['msg'])

        response = self.client.post(
            '/api/cropshield/cases',
            json=self.payload(
                damage_type='Disease',
                ai_evidence_image_data=self.model_image,
                ai_disease_name='Tomato - Late blight',
                ai_confidence=91.2,
                ai_model_name='AgriComplete LiteRT Crop Disease Model',
                ai_detection_at='2026-06-01T07:30',
            ),
            headers=self.headers,
        )
        self.assertEqual(response.status_code, 201)
        case = response.get_json()['case']
        self.assertEqual(case['ai_disease_name'], 'Tomato - Late blight')
        self.assertEqual(case['claim_checklist']['total'], 5)
        self.assertEqual(case['claim_checklist']['completed'], 5)
        self.assertEqual(case['ai_confidence'], 91.2)
        self.assertEqual(
            case['claim_score_factors']['disease_detection_confidence'],
            18
        )
        self.assertIn('prompt claim review', case['ai_recommendation'])

    def test_rejects_future_damage_date(self):
        response = self.client.post(
            '/api/cropshield/cases',
            json=self.payload(damage_occurred_at='2099-01-01T08:00'),
            headers=self.headers,
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn('future', response.get_json()['msg'])

    def test_flags_late_loss_intimation(self):
        response = self.client.post(
            '/api/cropshield/cases',
            json=self.payload(loss_intimated_at='2026-06-04T09:00'),
            headers=self.headers,
        )
        self.assertEqual(response.status_code, 201)
        case = response.get_json()['case']
        self.assertEqual(case['intimation_hours'], 73.0)
        self.assertFalse(case['intimated_within_72_hours'])
        self.assertEqual(case['intimation_status'], 'Beyond 72 hours')

    def test_accepts_timezone_aware_intimation(self):
        response = self.client.post(
            '/api/cropshield/cases',
            json=self.payload(
                damage_occurred_at='2026-06-01T13:30:00+05:30',
                loss_intimated_at='2026-06-02T13:30:00+05:30',
            ),
            headers=self.headers,
        )
        self.assertEqual(response.status_code, 201)
        case = response.get_json()['case']
        self.assertEqual(case['intimation_hours'], 24.0)
        self.assertTrue(case['intimated_within_72_hours'])

    def test_rejects_current_yield_above_expected_production(self):
        response = self.client.post(
            '/api/cropshield/cases',
            json=self.payload(current_yield_estimate_kg=10001),
            headers=self.headers,
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn('Current yield estimate', response.get_json()['msg'])

    def test_farmer_cannot_self_approve_case(self):
        case = self.create_case()
        response = self.client.patch(
            f"/api/cropshield/cases/{case['id']}/status",
            json={'status': 'Resolved'},
            headers=self.headers,
        )
        self.assertEqual(response.status_code, 409)

    def test_owner_can_delete_report_and_other_user_cannot(self):
        case = self.create_case()
        with self.app.app_context():
            other_user = User(
                username='otherfarmer',
                email='other@example.com',
                password_hash='test',
            )
            db.session.add(other_user)
            db.session.commit()
            other_token = create_access_token(identity=str(other_user.id))

        forbidden = self.client.delete(
            f"/api/cropshield/cases/{case['id']}",
            headers={'Authorization': f'Bearer {other_token}'},
        )
        self.assertEqual(forbidden.status_code, 404)

        deleted = self.client.delete(
            f"/api/cropshield/cases/{case['id']}",
            headers=self.headers,
        )
        self.assertEqual(deleted.status_code, 200)
        self.assertEqual(deleted.get_json()['reference'], case['reference'])

        missing = self.client.get(
            f"/api/cropshield/cases/{case['id']}",
            headers=self.headers,
        )
        self.assertEqual(missing.status_code, 404)


if __name__ == '__main__':
    unittest.main()
