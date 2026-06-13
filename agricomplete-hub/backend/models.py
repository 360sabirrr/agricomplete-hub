from extensions import db, bcrypt
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    phone = db.Column(db.String(20), unique=True)
    state = db.Column(db.String(50))
    district = db.Column(db.String(50))
    village = db.Column(db.String(100))
    total_area = db.Column(db.String(50))
    soil_type = db.Column(db.String(75))
    irrigation_source = db.Column(db.String(100))
    primary_crops = db.Column(db.String(150))
    farming_type = db.Column(db.String(100))
    subscription = db.Column(db.String(20), default='Basic')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class Crop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    planted_date = db.Column(db.DateTime, default=datetime.utcnow)
    harvest_date = db.Column(db.DateTime)
    status = db.Column(db.String(50), default='Active')

class MarketListing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    crop_name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.String(50), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    location = db.Column(db.String(100))
    category = db.Column(db.String(50))
    image_data = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class FarmAlert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(50), nullable=False) # Weather, Disease, Market
    priority = db.Column(db.String(20)) # Urgent, Normal
    message = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_read = db.Column(db.Boolean, default=False)

class DiseaseScan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, index=True)
    class_name = db.Column(db.String(150), nullable=False)
    display_name = db.Column(db.String(150), nullable=False)
    confidence = db.Column(db.Float, nullable=False)
    severity = db.Column(db.String(30), nullable=False)
    badge_class = db.Column(db.String(40), default='badge-info')
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)

class PasswordResetToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, index=True)
    token_hash = db.Column(db.String(64), nullable=False, index=True)
    expires_at = db.Column(db.DateTime, nullable=False, index=True)
    used_at = db.Column(db.DateTime)
    attempts = db.Column(db.Integer, default=0)
    request_ip = db.Column(db.String(45))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)


class CropShieldCase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    reference = db.Column(db.String(24), unique=True, nullable=False, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, index=True)
    season = db.Column(db.String(20))
    season_year = db.Column(db.Integer)
    farmer_name = db.Column(db.String(120))
    policy_number = db.Column(db.String(80))
    contact_number = db.Column(db.String(20))
    state = db.Column(db.String(80))
    district = db.Column(db.String(80))
    tehsil = db.Column(db.String(80))
    block = db.Column(db.String(80))
    gram_panchayat = db.Column(db.String(100))
    village = db.Column(db.String(100))
    survey_number = db.Column(db.String(80))
    crop_name = db.Column(db.String(100), nullable=False)
    crop_variety = db.Column(db.String(100))
    crop_pattern = db.Column(db.String(20))
    field_area_acres = db.Column(db.Float, nullable=False)
    area_hectares = db.Column(db.Float)
    sowing_date = db.Column(db.Date)
    expected_harvest_date = db.Column(db.Date)
    location = db.Column(db.String(160), nullable=False)
    gps_latitude = db.Column(db.Float)
    gps_longitude = db.Column(db.Float)
    map_snapshot_data = db.Column(db.Text)
    survey_date = db.Column(db.Date)
    expected_yield_per_acre_kg = db.Column(db.Float, nullable=False)
    expected_yield_per_hectare_kg = db.Column(db.Float)
    market_price_per_kg = db.Column(db.Float, nullable=False)
    damage_type = db.Column(db.String(40), nullable=False)
    severity_level = db.Column(db.String(20))
    damage_date = db.Column(db.Date)
    damage_occurred_at = db.Column(db.DateTime)
    loss_intimated_at = db.Column(db.DateTime)
    intimation_hours = db.Column(db.Float)
    intimated_within_72_hours = db.Column(db.Boolean)
    reported_damage_percent = db.Column(db.Float, nullable=False)
    visual_change_percent = db.Column(db.Float, default=0)
    assessment_confidence = db.Column(db.Float, default=0)
    expected_production_kg = db.Column(db.Float, default=0)
    current_yield_estimate_kg = db.Column(db.Float, default=0)
    estimated_yield_loss_kg = db.Column(db.Float, default=0)
    expected_revenue = db.Column(db.Float, default=0)
    estimated_loss = db.Column(db.Float, default=0)
    estimated_salvage_value = db.Column(db.Float, default=0)
    ai_evidence_image_data = db.Column(db.Text)
    ai_disease_name = db.Column(db.String(150))
    ai_confidence = db.Column(db.Float)
    ai_model_name = db.Column(db.String(120))
    ai_detection_at = db.Column(db.DateTime)
    ai_recommendation = db.Column(db.Text)
    claim_score = db.Column(db.Integer, default=0)
    claim_status = db.Column(db.String(60))
    claim_score_factors = db.Column(db.Text)
    weather_summary = db.Column(db.Text)
    claim_checklist_summary = db.Column(db.Text)
    notes = db.Column(db.Text)
    inspection_date = db.Column(db.Date)
    surveyor_name = db.Column(db.String(120))
    surveyor_designation = db.Column(db.String(120))
    surveyor_remarks = db.Column(db.Text)
    discrepancy_notes = db.Column(db.Text)
    farmer_declaration = db.Column(db.Boolean, default=False)
    farmer_signature_name = db.Column(db.String(120))
    farmer_signature_data = db.Column(db.Text)
    farmer_signature_method = db.Column(db.String(30))
    surveyor_signature_name = db.Column(db.String(120))
    local_official_signature_name = db.Column(db.String(120))
    baseline_image_data = db.Column(db.Text, nullable=False)
    damage_image_data = db.Column(db.Text, nullable=False)
    baseline_captured_at = db.Column(db.DateTime)
    damage_captured_at = db.Column(db.DateTime)
    baseline_sha256 = db.Column(db.String(64), nullable=False)
    damage_sha256 = db.Column(db.String(64), nullable=False)
    evidence_fingerprint = db.Column(db.String(64), nullable=False, index=True)
    status = db.Column(db.String(30), default='Report Ready', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    status_events = db.relationship(
        'CropShieldStatusEvent',
        backref='case',
        lazy=True,
        cascade='all, delete-orphan'
    )


class CropShieldStatusEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    case_id = db.Column(
        db.Integer,
        db.ForeignKey('crop_shield_case.id'),
        nullable=False,
        index=True
    )
    status = db.Column(db.String(30), nullable=False)
    note = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
