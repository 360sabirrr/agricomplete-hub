import base64
import binascii
import hashlib
import io
import json
import os
import re
import secrets
from datetime import date, datetime, timezone
from xml.sax.saxutils import escape

from flask import Blueprint, jsonify, request, send_file
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError

from extensions import db
from models import CropShieldCase, CropShieldStatusEvent, DiseaseScan, User


cropshield_bp = Blueprint('cropshield', __name__)

CROPSHIELD_API_VERSION = '2026-06-13-damage-only-v2'
MAX_IMAGE_BYTES = 1_200_000
MAX_SIGNATURE_BYTES = 600_000
MAX_LAND_RECORD_BYTES = 900_000
IMAGE_DATA_RE = re.compile(
    r'^data:image/(?P<format>jpeg|jpg|png|webp);base64,(?P<data>[A-Za-z0-9+/=]+)$'
)
DOCUMENT_DATA_RE = re.compile(
    r'^data:(?P<mime>application/pdf|image/(?:jpeg|jpg|png|webp));base64,'
    r'(?P<data>[A-Za-z0-9+/=]+)$'
)
DAMAGE_TYPES = {'Disease', 'Flood', 'Drought', 'Storm', 'Pest', 'Heat', 'Other'}
CASE_STATUSES = ('Report Ready', 'Submitted', 'Under Review', 'Resolved')
SEASONS = {'Kharif', 'Rabi', 'Zaid', 'Annual / Perennial'}
CROP_PATTERNS = {'Single Crop', 'Mixed Crop'}
SEVERITY_LEVELS = {'Low', 'Moderate', 'High', 'Critical'}
HECTARES_TO_ACRES = 2.47105381
USER_STATUS_TRANSITIONS = {
    'Report Ready': {'Submitted'},
    'Submitted': set(),
    'Under Review': set(),
    'Resolved': set(),
}


def _current_user_id():
    try:
        return int(get_jwt_identity())
    except (TypeError, ValueError):
        return None


def _clean_text(value, max_length=None):
    text = str(value or '').strip()
    return text[:max_length] if max_length else text


def _positive_float(value, field_name, maximum=None):
    try:
        number = float(value)
    except (TypeError, ValueError) as err:
        raise ValueError(f'{field_name} must be a number') from err
    if number <= 0 or (maximum is not None and number > maximum):
        suffix = f' and not more than {maximum}' if maximum is not None else ''
        raise ValueError(f'{field_name} must be greater than 0{suffix}')
    return number


def _percent(value, field_name):
    try:
        number = float(value)
    except (TypeError, ValueError) as err:
        raise ValueError(f'{field_name} must be a number') from err
    if not 0 <= number <= 100:
        raise ValueError(f'{field_name} must be between 0 and 100')
    return number


def _nonnegative_float(value, field_name, maximum=None):
    try:
        number = float(value)
    except (TypeError, ValueError) as err:
        raise ValueError(f'{field_name} must be a number') from err
    if number < 0 or (maximum is not None and number > maximum):
        suffix = f' and not more than {maximum}' if maximum is not None else ''
        raise ValueError(f'{field_name} must be 0 or greater{suffix}')
    return number


def _parse_date(value, field_name):
    text = _clean_text(value, 10)
    if not text:
        return None
    try:
        return date.fromisoformat(text)
    except ValueError as err:
        raise ValueError(f'{field_name} must use YYYY-MM-DD format') from err


def _parse_datetime(value, field_name):
    text = _clean_text(value, 32)
    if not text:
        return None
    try:
        parsed = datetime.fromisoformat(text.replace('Z', '+00:00'))
    except ValueError as err:
        raise ValueError(f'{field_name} must use a valid date and time') from err
    if parsed.tzinfo is not None:
        parsed = parsed.astimezone(timezone.utc).replace(tzinfo=None)
    return parsed


def _integer_range(value, field_name, minimum, maximum):
    try:
        number = int(value)
    except (TypeError, ValueError) as err:
        raise ValueError(f'{field_name} must be a whole number') from err
    if not minimum <= number <= maximum:
        raise ValueError(f'{field_name} must be between {minimum} and {maximum}')
    return number


def _contact_number(value):
    contact = re.sub(r'[\s().-]+', '', _clean_text(value, 20))
    if not re.fullmatch(r'\+?\d{7,15}', contact):
        raise ValueError('Contact number must contain 7 to 15 digits')
    return contact


def _masked_policy(value):
    text = _clean_text(value, 80)
    if len(text) <= 4:
        return text
    return f'{"*" * min(8, len(text) - 4)}{text[-4:]}'


def _decode_image_data(image_data, field_name, min_width=320, min_height=240):
    from PIL import Image, UnidentifiedImageError

    image_data = _clean_text(image_data)
    match = IMAGE_DATA_RE.fullmatch(image_data)
    if not match:
        raise ValueError(f'{field_name} must be a JPG, PNG, or WEBP image')
    try:
        raw = base64.b64decode(match.group('data'), validate=True)
    except (ValueError, binascii.Error) as err:
        raise ValueError(f'{field_name} contains invalid image data') from err
    if not raw or len(raw) > MAX_IMAGE_BYTES:
        raise ValueError(f'{field_name} must be smaller than 1.2 MB')
    try:
        with Image.open(io.BytesIO(raw)) as image:
            image_format = str(image.format or '').lower()
            width, height = image.size
            image.verify()
    except (UnidentifiedImageError, OSError, SyntaxError) as err:
        raise ValueError(f'{field_name} is not a valid image') from err
    if image_format not in {'jpeg', 'png', 'webp'}:
        raise ValueError(f'{field_name} must be a JPG, PNG, or WEBP image')
    if width < min_width or height < min_height:
        raise ValueError(
            f'{field_name} must be at least {min_width} x {min_height} pixels'
        )
    return raw


def _decode_signature_data(image_data):
    from PIL import Image, UnidentifiedImageError

    signature_data = _clean_text(image_data)
    match = IMAGE_DATA_RE.fullmatch(signature_data)
    if not match:
        raise ValueError('Signature or thumb impression must be a JPG, PNG, or WEBP image')
    try:
        raw = base64.b64decode(match.group('data'), validate=True)
    except (ValueError, binascii.Error) as err:
        raise ValueError('Signature image contains invalid data') from err
    if not raw or len(raw) > MAX_SIGNATURE_BYTES:
        raise ValueError('Signature image must be smaller than 600 KB')
    try:
        with Image.open(io.BytesIO(raw)) as image:
            image_format = str(image.format or '').lower()
            width, height = image.size
            image.verify()
    except (UnidentifiedImageError, OSError, SyntaxError) as err:
        raise ValueError('Signature or thumb impression is not a valid image') from err
    if image_format not in {'jpeg', 'png', 'webp'}:
        raise ValueError('Signature or thumb impression must be a JPG, PNG, or WEBP image')
    if width < 80 or height < 40:
        raise ValueError('Signature image must be at least 80 x 40 pixels')
    return raw


def _land_record_fingerprint(document_data):
    value = _clean_text(document_data)
    if not value:
        return '', ''
    match = DOCUMENT_DATA_RE.fullmatch(value)
    if not match:
        raise ValueError('Land record must be a PDF, JPG, PNG, or WEBP file')
    try:
        raw = base64.b64decode(match.group('data'), validate=True)
    except (ValueError, binascii.Error) as err:
        raise ValueError('Land record contains invalid file data') from err
    if not raw or len(raw) > MAX_LAND_RECORD_BYTES:
        raise ValueError('Land record must be smaller than 900 KB')

    mime = match.group('mime').lower()
    if mime == 'application/pdf':
        if not raw.startswith(b'%PDF'):
            raise ValueError('Land record is not a valid PDF file')
    else:
        _decode_image_data(value, 'Land record')
    return hashlib.sha256(raw).hexdigest(), mime


def _claim_checklist_for_response(value):
    if not value:
        return {
            'items': [],
            'completed': 0,
            'total': 5,
            'readiness_percent': 0,
        }
    try:
        parsed = json.loads(value)
        return parsed if isinstance(parsed, dict) else {}
    except (TypeError, json.JSONDecodeError):
        return {}


def _build_claim_checklist(user_id, data):
    aadhaar_available = bool(data.get('aadhaar_available'))
    bank_details_available = bool(data.get('bank_details_available'))
    land_record_available = bool(data.get('land_record_available'))
    is_disease = _clean_text(data.get('damage_type'), 40).title() == 'Disease'
    latest_scan = None
    if is_disease:
        latest_scan = (
            DiseaseScan.query
            .filter_by(user_id=user_id)
            .order_by(DiseaseScan.created_at.desc(), DiseaseScan.id.desc())
            .first()
        )

    submitted_disease_evidence = bool(
        _clean_text(data.get('ai_disease_name'), 150)
        and data.get('ai_confidence') not in (None, '')
    )
    disease_evidence_ready = is_disease and (
        submitted_disease_evidence or bool(latest_scan)
    )
    items = [
        {'key': 'aadhaar', 'label': 'Aadhaar Available', 'complete': aadhaar_available},
        {
            'key': 'land_record',
            'label': 'Land Record Available',
            'complete': land_record_available,
        },
        {'key': 'crop_photos', 'label': 'Damage Photo Uploaded', 'complete': True},
    ]
    if is_disease:
        items.append({
            'key': 'disease_evidence',
            'label': 'Disease Evidence Generated',
            'complete': disease_evidence_ready,
            'scan_id': latest_scan.id if latest_scan else None,
            'scan_name': (
                _clean_text(data.get('ai_disease_name'), 150)
                or (latest_scan.display_name if latest_scan else '')
            ),
            'scan_date': _iso_utc(latest_scan.created_at) if latest_scan else None,
        })
    items.append({
            'key': 'bank_details',
            'label': 'Bank Details Available',
            'complete': bank_details_available,
        })
    completed = sum(bool(item['complete']) for item in items)
    return {
        'items': items,
        'completed': completed,
        'total': len(items),
        'readiness_percent': round(completed / len(items) * 100),
        'privacy_note': (
            'Aadhaar, land record, and bank details are availability declarations only. '
            'Their numbers and documents are not collected or stored.'
        ),
    }


def _image_change_percent(baseline_bytes, damage_bytes):
    from PIL import Image, ImageChops, ImageOps, ImageStat, UnidentifiedImageError

    try:
        baseline_source = ImageOps.exif_transpose(Image.open(io.BytesIO(baseline_bytes))).convert('RGB')
        damaged_source = ImageOps.exif_transpose(Image.open(io.BytesIO(damage_bytes))).convert('RGB')
        baseline = ImageOps.fit(baseline_source, (192, 192))
        damaged = ImageOps.fit(damaged_source, (192, 192))
    except (UnidentifiedImageError, OSError) as err:
        raise ValueError('One of the evidence files is not a valid image') from err

    difference = ImageChops.difference(baseline, damaged)
    channel_means = ImageStat.Stat(difference).mean
    normalized_change = sum(channel_means) / (len(channel_means) * 255) * 100
    return round(min(100, max(0, normalized_change * 2.2)), 1)


def _weather_summary(value):
    if isinstance(value, dict):
        compact = {
            'location': _clean_text(value.get('location'), 100),
            'condition': _clean_text(value.get('condition'), 80),
            'temperature_c': value.get('temperature_c'),
            'humidity': value.get('humidity'),
            'rain_mm': value.get('rain_mm'),
            'captured_at': _clean_text(value.get('captured_at'), 40),
            'impact': value.get('impact') if isinstance(value.get('impact'), dict) else None,
        }
        return json.dumps(compact, separators=(',', ':'))
    return _clean_text(value, 1000)


def _weather_for_response(value):
    if not value:
        return {}
    try:
        parsed = json.loads(value)
        return parsed if isinstance(parsed, dict) else {'summary': str(parsed)}
    except (TypeError, json.JSONDecodeError):
        return {'summary': value}


def _json_object(value):
    if not value:
        return {}
    try:
        parsed = json.loads(value)
        return parsed if isinstance(parsed, dict) else {}
    except (TypeError, json.JSONDecodeError):
        return {}


def _claim_score(
    damage_type,
    gps_latitude,
    gps_longitude,
    survey_date,
    ai_confidence,
    weather,
    checklist,
):
    photo_score = 20
    location_score = 20 if (
        gps_latitude is not None and gps_longitude is not None and survey_date
    ) else 10 if survey_date else 0
    if damage_type == 'Disease':
        disease_score = round(min(20, max(0, float(ai_confidence or 0) / 5)))
    else:
        disease_score = 20
    impact = weather.get('impact') if isinstance(weather, dict) else None
    weather_score = 20 if isinstance(impact, dict) and impact.get('windows') else 0
    document_score = round(
        min(20, max(0, float(checklist.get('readiness_percent', 0)) / 5))
    )
    factors = {
        'photo_evidence': photo_score,
        'location_verification': location_score,
        'disease_detection_confidence': disease_score,
        'weather_correlation': weather_score,
        'document_completeness': document_score,
    }
    total = sum(factors.values())
    if total >= 80:
        status = 'Ready for Insurance Claim'
    elif total >= 60:
        status = 'Needs Minor Documents'
    else:
        status = 'Evidence Incomplete'
    return total, status, factors


def _recommendation(
    crop_name,
    damage_type,
    severity,
    damage_percent,
    yield_loss_kg,
    within_72_hours,
    weather,
):
    impact = weather.get('impact') if isinstance(weather, dict) else {}
    weather_note = ''
    if isinstance(impact, dict) and impact.get('windows'):
        weather_note = ' Historical rainfall, temperature, and humidity evidence is attached.'
    timing = (
        'The recorded loss intimation is within the 72-hour window.'
        if within_72_hours is True
        else 'The recorded loss intimation is beyond 72 hours; submit supporting reasons immediately.'
        if within_72_hours is False
        else 'Notify the insurance provider within the applicable claim period.'
    )
    return (
        f'Based on the reported {damage_type.lower()}, {severity.lower()} severity, '
        f'{damage_percent:.1f}% field damage, and an estimated yield loss of '
        f'{yield_loss_kg:,.0f} kg, the {crop_name} crop requires prompt claim review. '
        f'{timing}{weather_note} Preserve the original photos, land record, bank details, '
        'and this digitally verifiable report for submission to the insurance provider.'
    )


def _reference():
    while True:
        value = f'CS-{datetime.utcnow():%Y}-{secrets.randbelow(900000) + 100000:06d}'
        if not CropShieldCase.query.filter_by(reference=value).first():
            return value


def _iso_utc(value):
    if not value:
        return None
    if isinstance(value, date) and not isinstance(value, datetime):
        return value.isoformat()
    if value.tzinfo is None:
        value = value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc).isoformat().replace('+00:00', 'Z')


def _status_events(case):
    events = sorted(
        case.status_events,
        key=lambda item: (item.created_at or datetime.min, item.id or 0)
    )
    return [
        {
            'status': event.status,
            'note': event.note or '',
            'created_at': _iso_utc(event.created_at),
        }
        for event in events
    ]


def _serialize_case(case, include_images=False):
    area_hectares = case.area_hectares
    if area_hectares is None and case.field_area_acres is not None:
        area_hectares = case.field_area_acres / HECTARES_TO_ACRES
    yield_per_hectare = case.expected_yield_per_hectare_kg
    if yield_per_hectare is None and case.expected_yield_per_acre_kg is not None:
        yield_per_hectare = case.expected_yield_per_acre_kg * HECTARES_TO_ACRES
    data = {
        'id': case.id,
        'reference': case.reference,
        'season': case.season or '',
        'season_year': case.season_year,
        'farmer_name': case.farmer_name or '',
        'policy_number': case.policy_number or '',
        'contact_number': case.contact_number or '',
        'state': case.state or '',
        'district': case.district or '',
        'tehsil': case.tehsil or '',
        'block': case.block or '',
        'gram_panchayat': case.gram_panchayat or '',
        'village': case.village or '',
        'survey_number': case.survey_number or '',
        'crop_name': case.crop_name,
        'crop_pattern': case.crop_pattern or '',
        'field_area_acres': round(case.field_area_acres, 2),
        'area_hectares': round(area_hectares or 0, 4),
        'sowing_date': _iso_utc(case.sowing_date),
        'expected_harvest_date': _iso_utc(case.expected_harvest_date),
        'location': case.location,
        'gps_latitude': case.gps_latitude,
        'gps_longitude': case.gps_longitude,
        'survey_date': _iso_utc(case.survey_date),
        'expected_yield_per_acre_kg': round(case.expected_yield_per_acre_kg, 2),
        'expected_yield_per_hectare_kg': round(yield_per_hectare or 0, 2),
        'market_price_per_kg': round(case.market_price_per_kg, 2),
        'damage_type': case.damage_type,
        'damage_date': _iso_utc(case.damage_date),
        'damage_occurred_at': _iso_utc(case.damage_occurred_at),
        'loss_intimated_at': _iso_utc(case.loss_intimated_at),
        'intimation_hours': round(case.intimation_hours, 1) if case.intimation_hours is not None else None,
        'intimated_within_72_hours': case.intimated_within_72_hours,
        'intimation_status': (
            'Within 72 hours' if case.intimated_within_72_hours is True
            else 'Beyond 72 hours' if case.intimated_within_72_hours is False
            else 'Not recorded'
        ),
        'reported_damage_percent': round(case.reported_damage_percent, 1),
        'visual_change_percent': round(case.visual_change_percent or 0, 1),
        'assessment_confidence': round(case.assessment_confidence or 0, 1),
        'expected_production_kg': round(case.expected_production_kg or 0, 2),
        'current_yield_estimate_kg': round(case.current_yield_estimate_kg or 0, 2),
        'estimated_yield_loss_kg': round(case.estimated_yield_loss_kg or 0, 2),
        'expected_revenue': round(case.expected_revenue or 0, 2),
        'estimated_loss': round(case.estimated_loss or 0, 2),
        'estimated_salvage_value': round(case.estimated_salvage_value or 0, 2),
        'ai_disease_name': case.ai_disease_name or '',
        'ai_confidence': round(case.ai_confidence or 0, 2),
        'ai_model_name': case.ai_model_name or '',
        'ai_detection_at': _iso_utc(case.ai_detection_at),
        'ai_recommendation': case.ai_recommendation or '',
        'claim_score': case.claim_score or 0,
        'claim_status': case.claim_status or '',
        'claim_score_factors': _json_object(case.claim_score_factors),
        'weather': _weather_for_response(case.weather_summary),
        'claim_checklist': _claim_checklist_for_response(case.claim_checklist_summary),
        'notes': case.notes or '',
        'farmer_declaration': bool(case.farmer_declaration),
        'farmer_signature_method': case.farmer_signature_method or '',
        'damage_sha256': case.damage_sha256,
        'damage_captured_at': _iso_utc(case.damage_captured_at),
        'evidence_fingerprint': case.evidence_fingerprint,
        'status': case.status,
        'status_events': _status_events(case),
        'created_at': _iso_utc(case.created_at),
        'updated_at': _iso_utc(case.updated_at),
        'disclaimer': (
            'This is a data-assisted evidence estimate, not an official insurance '
            'valuation or claim approval.'
        ),
    }
    if include_images:
        data['damage_image_data'] = case.damage_image_data
        data['farmer_signature_data'] = case.farmer_signature_data or ''
        data['map_snapshot_data'] = case.map_snapshot_data or ''
        data['ai_evidence_image_data'] = case.ai_evidence_image_data or ''
    return data


def _owned_case(case_id, user_id):
    return CropShieldCase.query.filter_by(id=case_id, user_id=user_id).first()


@cropshield_bp.route('/version', methods=['GET'])
def cropshield_version():
    return jsonify({
        'version': CROPSHIELD_API_VERSION,
        'evidence_mode': 'damage_only',
        'report_layout': 'professional_v2',
    }), 200


@cropshield_bp.route('/cases', methods=['GET'])
@jwt_required()
def list_cases():
    user_id = _current_user_id()
    if user_id is None:
        return jsonify({'msg': 'Invalid authentication token'}), 401
    cases = (
        CropShieldCase.query
        .filter_by(user_id=user_id)
        .order_by(CropShieldCase.created_at.desc(), CropShieldCase.id.desc())
        .limit(100)
        .all()
    )
    return jsonify({'cases': [_serialize_case(case) for case in cases]}), 200


@cropshield_bp.route('/cases/<int:case_id>', methods=['GET'])
@jwt_required()
def get_case(case_id):
    user_id = _current_user_id()
    case = _owned_case(case_id, user_id)
    if not case:
        return jsonify({'msg': 'CropShield case not found'}), 404
    return jsonify({'case': _serialize_case(case, include_images=True)}), 200


@cropshield_bp.route('/cases/<int:case_id>', methods=['DELETE'])
@jwt_required()
def delete_case(case_id):
    user_id = _current_user_id()
    case = _owned_case(case_id, user_id)
    if not case:
        return jsonify({'msg': 'CropShield report not found'}), 404

    reference = case.reference
    try:
        db.session.delete(case)
        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({'msg': 'Could not delete the CropShield report'}), 503
    return jsonify({
        'msg': 'CropShield report deleted',
        'reference': reference,
    }), 200


@cropshield_bp.route('/cases', methods=['POST'])
@jwt_required()
def create_case():
    user_id = _current_user_id()
    if user_id is None:
        return jsonify({'msg': 'Invalid authentication token'}), 401
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({'msg': 'Missing or invalid request body'}), 400

    try:
        formal_report = data.get('report_format') == 'insurance_v1'
        crop_name = _clean_text(data.get('crop_name'), 100)
        damage_type = _clean_text(data.get('damage_type'), 40).title()
        if not crop_name:
            raise ValueError('Crop name is required')
        if damage_type not in DAMAGE_TYPES:
            raise ValueError('Select a valid damage type')

        season = _clean_text(data.get('season'), 20)
        season_year = None
        farmer_name = _clean_text(data.get('farmer_name'), 120)
        policy_number = _clean_text(data.get('policy_number'), 80)
        contact_number = _clean_text(data.get('contact_number'), 20)
        state = _clean_text(data.get('state'), 80)
        district = _clean_text(data.get('district'), 80)
        tehsil = _clean_text(data.get('tehsil'), 80)
        block = _clean_text(data.get('block'), 80)
        gram_panchayat = _clean_text(data.get('gram_panchayat'), 100)
        village = _clean_text(data.get('village'), 100)
        survey_number = _clean_text(data.get('survey_number'), 80)
        crop_pattern = _clean_text(data.get('crop_pattern'), 20)

        if formal_report:
            if season not in SEASONS:
                raise ValueError('Select a valid crop season')
            season_year = _integer_range(
                data.get('season_year'),
                'Season year',
                2020,
                date.today().year + 1
            )
            required_identity = {
                'Farmer name': farmer_name,
                'Policy or application number': policy_number,
                'State': state,
                'District': district,
                'Tehsil': tehsil,
                'Block': block,
                'Gram Panchayat': gram_panchayat,
                'Village': village,
                'Survey or Khasra number': survey_number,
            }
            missing = [label for label, value in required_identity.items() if not value]
            if missing:
                raise ValueError(f'{missing[0]} is required')
            contact_number = _contact_number(contact_number)
            if crop_pattern not in CROP_PATTERNS:
                raise ValueError('Select whether this is a single or mixed crop')

        if data.get('area_hectares') not in (None, ''):
            area_hectares = _positive_float(
                data.get('area_hectares'),
                'Insured area in hectares',
                50000
            )
            field_area = area_hectares * HECTARES_TO_ACRES
        else:
            field_area = _positive_float(data.get('field_area_acres'), 'Field area', 100000)
            area_hectares = field_area / HECTARES_TO_ACRES

        if data.get('expected_yield_per_hectare_kg') not in (None, ''):
            yield_per_hectare = _positive_float(
                data.get('expected_yield_per_hectare_kg'),
                'Expected yield per hectare',
                2500000
            )
            yield_per_acre = yield_per_hectare / HECTARES_TO_ACRES
        else:
            yield_per_acre = _positive_float(
                data.get('expected_yield_per_acre_kg'),
                'Expected yield per acre',
                1000000
            )
            yield_per_hectare = yield_per_acre * HECTARES_TO_ACRES

        market_price = _positive_float(
            data.get('market_price_per_kg'),
            'Market price',
            1000000
        )
        damage_percent = _percent(
            data.get('reported_damage_percent'),
            'Reported damage'
        )
        damage_band = (
            'Critical' if damage_percent >= 75
            else 'High' if damage_percent >= 50
            else 'Moderate' if damage_percent >= 25
            else 'Low'
        )
        sowing_date = _parse_date(data.get('sowing_date'), 'Sowing date')
        expected_harvest_date = _parse_date(
            data.get('expected_harvest_date'),
            'Expected harvest date'
        )
        survey_date = _parse_date(data.get('survey_date'), 'Survey date')
        gps_latitude = None
        gps_longitude = None
        if data.get('gps_latitude') not in (None, ''):
            gps_latitude = float(data.get('gps_latitude'))
            if not -90 <= gps_latitude <= 90:
                raise ValueError('GPS latitude must be between -90 and 90')
        if data.get('gps_longitude') not in (None, ''):
            gps_longitude = float(data.get('gps_longitude'))
            if not -180 <= gps_longitude <= 180:
                raise ValueError('GPS longitude must be between -180 and 180')
        if (gps_latitude is None) != (gps_longitude is None):
            raise ValueError('Provide both GPS latitude and longitude')
        damage_occurred_at = _parse_datetime(
            data.get('damage_occurred_at'),
            'Damage occurrence'
        )
        loss_intimated_at = _parse_datetime(
            data.get('loss_intimated_at'),
            'Loss intimation'
        )
        damage_date = (
            damage_occurred_at.date()
            if damage_occurred_at
            else _parse_date(data.get('damage_date'), 'Damage date')
        )
        if sowing_date and sowing_date > date.today():
            raise ValueError('Sowing date cannot be in the future')
        if expected_harvest_date and sowing_date and expected_harvest_date <= sowing_date:
            raise ValueError('Expected harvest date must be later than the sowing date')
        if formal_report and not expected_harvest_date:
            raise ValueError('Expected harvest date is required')
        if formal_report and not survey_date:
            raise ValueError('Date of survey is required')
        if survey_date and survey_date > date.today():
            raise ValueError('Date of survey cannot be in the future')
        if not damage_date:
            raise ValueError('Damage date is required')
        if damage_date > date.today():
            raise ValueError('Damage date cannot be in the future')
        if sowing_date and damage_date and damage_date < sowing_date:
            raise ValueError('Damage date cannot be earlier than sowing date')
        if formal_report and not damage_occurred_at:
            raise ValueError('Damage occurrence date and time are required')
        if formal_report and not loss_intimated_at:
            raise ValueError('Loss intimation date and time are required')
        current_utc = datetime.now(timezone.utc).replace(tzinfo=None)
        if damage_occurred_at and damage_occurred_at > current_utc:
            raise ValueError('Damage occurrence cannot be in the future')
        if loss_intimated_at and loss_intimated_at > current_utc:
            raise ValueError('Loss intimation cannot be in the future')
        if damage_occurred_at and loss_intimated_at and loss_intimated_at < damage_occurred_at:
            raise ValueError('Loss intimation cannot be earlier than the damage occurrence')

        intimation_hours = None
        within_72_hours = None
        if damage_occurred_at and loss_intimated_at:
            intimation_hours = (
                loss_intimated_at - damage_occurred_at
            ).total_seconds() / 3600
            within_72_hours = intimation_hours <= 72

        farmer_declaration = bool(data.get('farmer_declaration'))
        farmer_signature_data = _clean_text(data.get('farmer_signature_data'))
        farmer_signature_method = _clean_text(data.get('farmer_signature_method'), 30)
        if formal_report and not farmer_declaration:
            raise ValueError('Farmer declaration must be accepted')
        if formal_report and not farmer_signature_data:
            raise ValueError('Draw or upload the farmer signature or thumb impression')
        signature_hash = ''
        if farmer_signature_data:
            if farmer_signature_method not in {
                'Drawn signature', 'Uploaded signature', 'Thumb impression'
            }:
                raise ValueError('Select a valid signature method')
            signature_bytes = _decode_signature_data(farmer_signature_data)
            signature_hash = hashlib.sha256(signature_bytes).hexdigest()

        location_parts = [village, gram_panchayat, tehsil, district, state]
        location = ', '.join(part for part in location_parts if part)
        if not location:
            location = _clean_text(data.get('location'), 160)
        if not location:
            raise ValueError('Field location is required')

        damage_data = _clean_text(data.get('damage_image_data'))
        damage_bytes = _decode_image_data(damage_data, 'Damage image')
        damage_hash = hashlib.sha256(damage_bytes).hexdigest()
        # Preserve the existing non-null legacy columns without asking farmers
        # to upload a second image or requiring a database migration.
        baseline_data = damage_data
        baseline_hash = damage_hash
        visual_change = 0

        map_snapshot_data = _clean_text(data.get('map_snapshot_data'))
        map_snapshot_hash = ''
        if map_snapshot_data:
            map_snapshot_hash = hashlib.sha256(
                _decode_image_data(map_snapshot_data, 'Map snapshot')
            ).hexdigest()

        ai_disease_name = _clean_text(data.get('ai_disease_name'), 150)
        ai_model_name = _clean_text(data.get('ai_model_name'), 120)
        ai_detection_at = _parse_datetime(
            data.get('ai_detection_at'),
            'AI detection timestamp'
        )
        ai_confidence = None
        if data.get('ai_confidence') not in (None, ''):
            ai_confidence = _percent(data.get('ai_confidence'), 'AI confidence')
        ai_evidence_image_data = _clean_text(data.get('ai_evidence_image_data'))
        ai_evidence_hash = ''
        if ai_evidence_image_data:
            ai_evidence_hash = hashlib.sha256(
                _decode_image_data(
                    ai_evidence_image_data,
                    'AI evidence image',
                    min_width=128,
                    min_height=128,
                )
            ).hexdigest()
        if damage_type == 'Disease':
            if not ai_disease_name or ai_confidence is None or not ai_detection_at:
                raise ValueError('Disease claims require a saved AI diagnosis result')
            if not ai_model_name:
                raise ValueError('AI model name is required for disease claims')
            if not ai_evidence_image_data:
                raise ValueError('Upload the crop image used for AI disease detection')
        else:
            ai_disease_name = ''
            ai_model_name = ''
            ai_detection_at = None
            ai_confidence = None
            ai_evidence_image_data = ''
            ai_evidence_hash = ''

        damage_captured_at = _parse_datetime(
            data.get('damage_captured_at'),
            'Damage photo timestamp'
        )
        baseline_captured_at = damage_captured_at
        claim_checklist = _build_claim_checklist(user_id, data)
    except ValueError as err:
        return jsonify({'msg': str(err)}), 400

    expected_production = area_hectares * yield_per_hectare
    try:
        if data.get('current_yield_estimate_kg') not in (None, ''):
            current_yield_estimate = _nonnegative_float(
                data.get('current_yield_estimate_kg'),
                'Current yield estimate',
                expected_production
            )
        else:
            current_yield_estimate = expected_production * (1 - damage_percent / 100)
    except ValueError as err:
        return jsonify({'msg': str(err)}), 400
    estimated_yield_loss = max(0, expected_production - current_yield_estimate)
    expected_revenue = expected_production * market_price
    estimated_loss = estimated_yield_loss * market_price
    salvage_value = max(0, expected_revenue - estimated_loss)
    weather = _weather_for_response(_weather_summary(data.get('weather')))
    claim_score, claim_status, claim_score_factors = _claim_score(
        damage_type,
        gps_latitude,
        gps_longitude,
        survey_date,
        ai_confidence,
        weather,
        claim_checklist,
    )
    ai_recommendation = _recommendation(
        crop_name,
        damage_type,
        damage_band,
        damage_percent,
        estimated_yield_loss,
        within_72_hours,
        weather,
    )
    if formal_report:
        completeness_checks = [
            season,
            season_year,
            farmer_name,
            policy_number,
            contact_number,
            state,
            district,
            tehsil,
            block,
            gram_panchayat,
            village,
            survey_number,
            crop_name,
            crop_pattern,
            area_hectares,
            sowing_date,
            expected_harvest_date,
            survey_date,
            damage_occurred_at,
            loss_intimated_at,
            damage_data,
            farmer_signature_data,
            claim_checklist.get('completed'),
        ]
        assessment_confidence = round(
            sum(bool(value) for value in completeness_checks) / len(completeness_checks) * 100,
            1
        )
    else:
        completeness = 72
        completeness += 6 if sowing_date else 0
        completeness += 6 if damage_date else 0
        completeness += 6 if data.get('weather') else 0
        completeness += 5 if _clean_text(data.get('notes')) else 0
        assessment_confidence = min(95, completeness)

    reference = _reference()
    fingerprint = hashlib.sha256(
        (
            f'{reference}|{user_id}|{policy_number}|{survey_number}|{crop_name}|'
            f'{area_hectares:.4f}|{damage_percent:.2f}|{damage_occurred_at}|'
            f'{loss_intimated_at}|{baseline_hash}|{damage_hash}|{signature_hash}'
            f'|{map_snapshot_hash}|{ai_evidence_hash}|{gps_latitude}|{gps_longitude}'
        ).encode('utf-8')
    ).hexdigest()

    case = CropShieldCase(
        reference=reference,
        user_id=user_id,
        season=season or None,
        season_year=season_year,
        farmer_name=farmer_name or None,
        policy_number=policy_number or None,
        contact_number=contact_number or None,
        state=state or None,
        district=district or None,
        tehsil=tehsil or None,
        block=block or None,
        gram_panchayat=gram_panchayat or None,
        village=village or None,
        survey_number=survey_number or None,
        crop_name=crop_name,
        crop_variety=None,
        crop_pattern=crop_pattern or None,
        field_area_acres=field_area,
        area_hectares=area_hectares,
        sowing_date=sowing_date,
        expected_harvest_date=expected_harvest_date,
        location=location,
        gps_latitude=gps_latitude,
        gps_longitude=gps_longitude,
        map_snapshot_data=map_snapshot_data or None,
        survey_date=survey_date,
        expected_yield_per_acre_kg=yield_per_acre,
        expected_yield_per_hectare_kg=yield_per_hectare,
        market_price_per_kg=market_price,
        damage_type=damage_type,
        severity_level=None,
        damage_date=damage_date,
        damage_occurred_at=damage_occurred_at,
        loss_intimated_at=loss_intimated_at,
        intimation_hours=intimation_hours,
        intimated_within_72_hours=within_72_hours,
        reported_damage_percent=damage_percent,
        visual_change_percent=visual_change,
        assessment_confidence=assessment_confidence,
        expected_production_kg=expected_production,
        current_yield_estimate_kg=current_yield_estimate,
        estimated_yield_loss_kg=estimated_yield_loss,
        expected_revenue=expected_revenue,
        estimated_loss=estimated_loss,
        estimated_salvage_value=salvage_value,
        ai_evidence_image_data=ai_evidence_image_data or None,
        ai_disease_name=ai_disease_name or None,
        ai_confidence=ai_confidence,
        ai_model_name=ai_model_name or None,
        ai_detection_at=ai_detection_at,
        ai_recommendation=ai_recommendation,
        claim_score=claim_score,
        claim_status=claim_status,
        claim_score_factors=json.dumps(claim_score_factors, separators=(',', ':')),
        weather_summary=_weather_summary(data.get('weather')),
        claim_checklist_summary=json.dumps(claim_checklist, separators=(',', ':')),
        notes=_clean_text(data.get('notes'), 2000),
        farmer_declaration=farmer_declaration,
        farmer_signature_data=farmer_signature_data,
        farmer_signature_method=farmer_signature_method,
        baseline_image_data=baseline_data,
        damage_image_data=damage_data,
        baseline_captured_at=baseline_captured_at,
        damage_captured_at=damage_captured_at,
        baseline_sha256=baseline_hash,
        damage_sha256=damage_hash,
        evidence_fingerprint=fingerprint,
        status='Report Ready',
    )
    try:
        db.session.add(case)
        db.session.flush()
        db.session.add(CropShieldStatusEvent(
            case_id=case.id,
            status='Report Ready',
            note='Evidence package and estimated loss report generated.'
        ))
        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({'msg': 'Could not securely save the CropShield report'}), 503
    return jsonify({
        'msg': 'CropShield evidence report generated',
        'case': _serialize_case(case, include_images=True),
    }), 201


@cropshield_bp.route('/cases/<int:case_id>/status', methods=['PATCH'])
@jwt_required()
def update_status(case_id):
    user_id = _current_user_id()
    case = _owned_case(case_id, user_id)
    if not case:
        return jsonify({'msg': 'CropShield case not found'}), 404
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({'msg': 'Missing or invalid request body'}), 400
    status = _clean_text(data.get('status'), 30)
    if status not in CASE_STATUSES:
        return jsonify({'msg': 'Invalid CropShield case status'}), 400
    if status == case.status:
        return jsonify({
            'msg': 'CropShield case already has this status',
            'case': _serialize_case(case),
        }), 200
    if status not in USER_STATUS_TRANSITIONS.get(case.status, set()):
        return jsonify({
            'msg': f'Cases cannot move from {case.status} to {status}'
        }), 409

    case.status = status
    try:
        db.session.add(CropShieldStatusEvent(
            case_id=case.id,
            status=status,
            note=_clean_text(data.get('note'), 255)
        ))
        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({'msg': 'Could not update the CropShield case status'}), 503
    return jsonify({
        'msg': 'CropShield case status updated',
        'case': _serialize_case(case),
    }), 200


@cropshield_bp.route('/verify/<reference>', methods=['GET'])
def verify_case(reference):
    clean_reference = _clean_text(reference, 24).upper()
    if not re.fullmatch(
        r'(?:CS-\d{8}-[A-F0-9]{6}|CS-\d{4}-\d{6})',
        clean_reference
    ):
        return jsonify({'verified': False, 'msg': 'Invalid CropShield reference'}), 400
    case = CropShieldCase.query.filter_by(reference=clean_reference).first()
    if not case:
        return jsonify({'verified': False, 'msg': 'CropShield report not found'}), 404
    return jsonify({
        'verified': True,
        'reference': case.reference,
        'crop_name': case.crop_name,
        'season': case.season or '',
        'season_year': case.season_year,
        'district': case.district or '',
        'village': case.village or '',
        'survey_number': case.survey_number or '',
        'area_hectares': round(
            case.area_hectares
            if case.area_hectares is not None
            else case.field_area_acres / HECTARES_TO_ACRES,
            4
        ),
        'field_area_acres': round(case.field_area_acres, 3),
        'policy_number': _masked_policy(case.policy_number),
        'damage_type': case.damage_type,
        'claim_score': case.claim_score or 0,
        'claim_status': case.claim_status or '',
        'assessment_date': _iso_utc(case.created_at),
        'status': case.status,
        'intimation_status': (
            'Within 72 hours' if case.intimated_within_72_hours is True
            else 'Beyond 72 hours' if case.intimated_within_72_hours is False
            else 'Not recorded'
        ),
        'reported_damage_percent': round(case.reported_damage_percent, 1),
        'evidence_fingerprint': case.evidence_fingerprint,
        'disclaimer': 'Verification confirms this report exists and its evidence fingerprint.',
    }), 200


def _money(value):
    return f'INR {float(value or 0):,.2f}'


REPORT_TEXT = {
    'en': {
        'title': 'Crop Insurance Evidence Report',
        'basic': '1. Basic Information & Location Details',
        'crop': '2. Crop Information',
        'damage': '3. Damage Assessment',
        'ai_evidence': '4. AI Disease Detection Evidence',
        'photos': '5. Photo Evidence',
        'loss': '6. Loss Estimation',
        'recommendation': '7. AI Recommendation',
        'checklist': '8. Insurance Claim Checklist',
        'weather': '9. Weather Impact Analysis',
        'score': '10. CropShield Claim Readiness Score',
        'declaration': '11. Declaration & Signatures',
        'verify': 'Scan to verify this report',
        'not_recorded': 'Not recorded',
        'available': 'Available',
        'not_available': 'Not available',
        'ready': 'Ready for Insurance Claim',
    },
    'hi': {
        'title': 'फसल बीमा साक्ष्य रिपोर्ट',
        'basic': '1. मूल जानकारी और स्थान विवरण',
        'crop': '2. फसल की जानकारी',
        'damage': '3. क्षति आकलन',
        'ai_evidence': '4. एआई रोग पहचान साक्ष्य',
        'photos': '5. फोटो साक्ष्य',
        'loss': '6. हानि का अनुमान',
        'recommendation': '7. एआई अनुशंसा',
        'checklist': '8. बीमा दावा चेकलिस्ट',
        'weather': '9. मौसम प्रभाव विश्लेषण',
        'score': '10. क्रॉपशील्ड दावा तत्परता स्कोर',
        'declaration': '11. घोषणा और हस्ताक्षर',
        'verify': 'रिपोर्ट सत्यापित करने के लिए स्कैन करें',
        'not_recorded': 'दर्ज नहीं',
        'available': 'उपलब्ध',
        'not_available': 'उपलब्ध नहीं',
        'ready': 'बीमा दावे के लिए तैयार',
    },
    'mr': {
        'title': 'पीक विमा पुरावा अहवाल',
        'basic': '1. मूलभूत माहिती आणि स्थान तपशील',
        'crop': '2. पीक माहिती',
        'damage': '3. नुकसान मूल्यांकन',
        'ai_evidence': '4. एआय रोग निदान पुरावा',
        'photos': '5. छायाचित्र पुरावा',
        'loss': '6. आर्थिक नुकसान अंदाज',
        'recommendation': '7. एआय शिफारस',
        'checklist': '8. विमा दावा तपासणी सूची',
        'weather': '9. हवामान परिणाम विश्लेषण',
        'score': '10. क्रॉपशील्ड दावा तयारी गुण',
        'declaration': '11. घोषणा आणि स्वाक्षऱ्या',
        'verify': 'अहवाल पडताळण्यासाठी स्कॅन करा',
        'not_recorded': 'नोंद उपलब्ध नाही',
        'available': 'उपलब्ध',
        'not_available': 'उपलब्ध नाही',
        'ready': 'विमा दाव्यासाठी तयार',
    },
}


def _case_report_pdf(case, user, language='en'):
    try:
        import qrcode
        from reportlab.lib import colors
        from reportlab.lib.enums import TA_CENTER
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
        from reportlab.lib.units import mm
        from reportlab.pdfbase import pdfmetrics
        from reportlab.pdfbase.ttfonts import TTFont
        from reportlab.platypus import (
            Image as ReportImage,
            KeepTogether,
            PageBreak,
            Paragraph,
            SimpleDocTemplate,
            Spacer,
            Table,
            TableStyle,
        )
    except ImportError as err:
        raise RuntimeError('PDF report dependencies are not installed') from err

    language = language if language in REPORT_TEXT else 'en'
    text = REPORT_TEXT[language]
    normal_font = 'Helvetica'
    bold_font = 'Helvetica-Bold'
    if language in {'hi', 'mr'}:
        font_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'assets', 'fonts')
        regular_path = os.path.join(font_dir, 'NotoSansDevanagari-Regular.ttf')
        bold_path = os.path.join(font_dir, 'NotoSansDevanagari-Bold.ttf')
        if not os.path.exists(regular_path) or not os.path.exists(bold_path):
            raise RuntimeError('Hindi and Marathi report fonts are not installed')
        if 'CropShieldDevanagari' not in pdfmetrics.getRegisteredFontNames():
            pdfmetrics.registerFont(TTFont('CropShieldDevanagari', regular_path))
            pdfmetrics.registerFont(TTFont('CropShieldDevanagariBold', bold_path))
        normal_font = 'CropShieldDevanagari'
        bold_font = 'CropShieldDevanagariBold'

    output = io.BytesIO()
    doc = SimpleDocTemplate(
        output,
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=14 * mm,
        bottomMargin=15 * mm,
        title=f'{text["title"]} {case.reference}',
        author='AgriComplete Hub',
    )
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        name='ReportTitle',
        parent=styles['Title'],
        fontName=bold_font,
        fontSize=19,
        textColor=colors.HexColor('#155C2C'),
        leading=23,
        spaceAfter=2 * mm,
    ))
    styles.add(ParagraphStyle(
        name='ReportKicker',
        parent=styles['Normal'],
        fontName=bold_font,
        fontSize=9,
        textColor=colors.HexColor('#6B7F6E'),
        uppercase=True,
        spaceAfter=1 * mm,
    ))
    styles.add(ParagraphStyle(
        name='ReportDisclaimer',
        parent=styles['Normal'],
        fontName=normal_font,
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#6A4E00'),
        backColor=colors.HexColor('#FFF8E1'),
        borderColor=colors.HexColor('#F3D98B'),
        borderWidth=0.5,
        borderPadding=8,
    ))
    styles.add(ParagraphStyle(
        name='CenterSmall',
        parent=styles['Normal'],
        alignment=TA_CENTER,
        fontSize=7.5,
        leading=9,
    ))
    styles.add(ParagraphStyle(
        name='SectionLabel',
        parent=styles['Heading2'],
        fontName=bold_font,
        fontSize=11,
        textColor=colors.HexColor('#173A22'),
        spaceBefore=1.5 * mm,
        spaceAfter=2 * mm,
        keepWithNext=True,
    ))
    styles.add(ParagraphStyle(
        name='ReportMeta',
        parent=styles['Normal'],
        fontName=normal_font,
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#526658'),
    ))
    styles.add(ParagraphStyle(
        name='MetricValue',
        parent=styles['Normal'],
        fontName=bold_font,
        fontSize=13,
        leading=15,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#173A22'),
    ))
    styles.add(ParagraphStyle(
        name='MetricLabel',
        parent=styles['Normal'],
        fontName=normal_font,
        fontSize=7,
        leading=9,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#687A6C'),
    ))

    styles['Normal'].fontName = normal_font
    styles['Heading1'].fontName = bold_font
    styles['Heading2'].fontName = bold_font

    def report_value(value, fallback=None):
        fallback = fallback or text['not_recorded']
        text_value = _clean_text(value) or fallback
        return Paragraph(escape(text_value), styles['Normal'])

    def report_datetime(value):
        if not value:
            return text['not_recorded']
        return value.strftime('%d %b %Y, %I:%M %p')

    farmer_name = case.farmer_name or 'Registered farmer'
    if farmer_name == 'Registered farmer' and user:
        farmer_name = ' '.join(filter(None, [user.first_name, user.last_name])).strip()
        farmer_name = farmer_name or user.username or 'Registered farmer'
    status_color = '#155C2C' if case.status in {'Report Ready', 'Submitted'} else '#8A5A00'
    header_block = Table([[
        [
            Paragraph('AGRICOMPLETE / CROPSHIELD', styles['ReportKicker']),
            Paragraph(text['title'], styles['ReportTitle']),
            Paragraph(
                'Farmer-generated crop-loss evidence dossier',
                styles['ReportMeta'],
            ),
        ],
        [
            Paragraph(
                f'<b>{escape(case.reference)}</b><br/>'
                f'Generated {escape(report_datetime(case.created_at))}',
                styles['ReportMeta'],
            ),
            Paragraph(
                f'<font color="{status_color}"><b>{escape(case.status.upper())}</b></font>',
                styles['CenterSmall'],
            ),
        ],
    ]], colWidths=[112 * mm, 58 * mm])
    header_block.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#F5F9F5')),
        ('BOX', (0, 0), (-1, -1), 0.8, colors.HexColor('#BFD2C3')),
        ('LINEBEFORE', (1, 0), (1, 0), 3, colors.HexColor('#25803B')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ALIGN', (1, 0), (1, 0), 'CENTER'),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 9),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
    ]))
    metric_values = [
        (_money(case.estimated_loss), 'ESTIMATED LOSS'),
        (f'{case.reported_damage_percent:.0f}%', 'REPORTED DAMAGE'),
        (f'{case.claim_score or 0}/100', 'CLAIM READINESS'),
        (
            f'{_claim_checklist_for_response(case.claim_checklist_summary).get("readiness_percent", 0)}%',
            'DOCUMENT CHECKLIST',
        ),
    ]
    metric_cells = []
    for value, label in metric_values:
        metric_cells.append([
            Paragraph(escape(str(value)), styles['MetricValue']),
            Paragraph(label, styles['MetricLabel']),
        ])
    metric_table = Table(
        [[cell[0] for cell in metric_cells], [cell[1] for cell in metric_cells]],
        colWidths=[42.5 * mm] * 4,
    )
    metric_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#FFFFFF')),
        ('BOX', (0, 0), (-1, -1), 0.6, colors.HexColor('#D2DFD4')),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#DFE8E1')),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, 0), 7),
        ('BOTTOMPADDING', (0, 1), (-1, 1), 7),
    ]))
    story = [header_block, Spacer(1, 3 * mm), metric_table, Spacer(1, 3 * mm)]

    basic_data = [
        ['Season & year', f'{case.season or "Not recorded"} {case.season_year or ""}'.strip(),
         'Farmer', farmer_name],
        ['Policy / application', case.policy_number or 'Not recorded',
         'Contact', case.contact_number or 'Not recorded'],
        ['State', case.state or 'Not recorded', 'District', case.district or 'Not recorded'],
        ['Tehsil', case.tehsil or 'Not recorded', 'Block', case.block or 'Not recorded'],
        ['Gram Panchayat', case.gram_panchayat or 'Not recorded',
         'Village', case.village or 'Not recorded'],
        ['GPS coordinates',
         (
             f'{case.gps_latitude:.6f}, {case.gps_longitude:.6f}'
             if case.gps_latitude is not None and case.gps_longitude is not None
             else text['not_recorded']
         ),
         'Date of survey',
         case.survey_date.isoformat() if case.survey_date else text['not_recorded']],
    ]
    story.append(Paragraph(text['basic'], styles['SectionLabel']))
    basic_table = Table(basic_data, colWidths=[31 * mm, 54 * mm, 31 * mm, 54 * mm])
    basic_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#EEF6EF')),
        ('BACKGROUND', (2, 0), (2, -1), colors.HexColor('#EEF6EF')),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1C3522')),
        ('FONTNAME', (0, 0), (-1, -1), normal_font),
        ('FONTNAME', (0, 0), (0, -1), bold_font),
        ('FONTNAME', (2, 0), (2, -1), bold_font),
        ('FONTSIZE', (0, 0), (-1, -1), 8.5),
        ('GRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#D7E5D9')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ]))
    story.extend([basic_table, Spacer(1, 5 * mm)])

    plot_data = [
        ['Survey / Khasra no.', case.survey_number or 'Not recorded',
         'Crop pattern', case.crop_pattern or 'Not recorded'],
        ['Crop name', case.crop_name, 'Insured area', f'{case.field_area_acres:.3f} acres'],
        ['Sowing date', case.sowing_date.isoformat() if case.sowing_date else 'Not recorded',
         'Expected harvest',
         case.expected_harvest_date.isoformat() if case.expected_harvest_date else text['not_recorded']],
        ['Expected yield', f'{case.expected_yield_per_acre_kg:,.0f} kg / acre',
         'Market price', f'INR {case.market_price_per_kg:,.2f} / kg'],
    ]
    story.append(Paragraph(text['crop'], styles['SectionLabel']))
    plot_table = Table(plot_data, colWidths=[31 * mm, 54 * mm, 31 * mm, 54 * mm])
    plot_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#F2F6EC')),
        ('BACKGROUND', (2, 0), (2, -1), colors.HexColor('#F2F6EC')),
        ('FONTNAME', (0, 0), (0, -1), bold_font),
        ('FONTNAME', (2, 0), (2, -1), bold_font),
        ('FONTSIZE', (0, 0), (-1, -1), 8.5),
        ('GRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#D7E5D9')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ]))
    story.extend([plot_table, Spacer(1, 5 * mm)])

    intimation_status = (
        'Within 72 hours'
        if case.intimated_within_72_hours is True
        else 'Beyond 72 hours'
        if case.intimated_within_72_hours is False
        else 'Not recorded'
    )
    verification_data = [
        ['Affected crop', case.crop_name, 'Damage cause', case.damage_type],
        ['Reported damage', f'{case.reported_damage_percent:.1f}%',
         'Detection date', case.damage_date.isoformat() if case.damage_date else text['not_recorded']],
        ['Estimated yield loss', f'{case.estimated_yield_loss_kg:,.0f} kg',
         'Damage occurred', report_datetime(case.damage_occurred_at)],
        ['Loss intimated', report_datetime(case.loss_intimated_at),
         'Intimation compliance', intimation_status],
        ['Elapsed time', f'{case.intimation_hours:.1f} hours' if case.intimation_hours is not None else 'Not recorded',
         'Evidence source', 'Farmer submitted'],
        ['Assessment type', 'Data-assisted estimate', 'Report scope', 'Claim support evidence'],
    ]
    story.append(Paragraph(text['damage'], styles['SectionLabel']))
    verification_table = Table(
        verification_data,
        colWidths=[31 * mm, 54 * mm, 31 * mm, 54 * mm]
    )
    verification_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#EEF5F7')),
        ('BACKGROUND', (2, 0), (2, -1), colors.HexColor('#EEF5F7')),
        ('FONTNAME', (0, 0), (0, -1), bold_font),
        ('FONTNAME', (2, 0), (2, -1), bold_font),
        ('FONTSIZE', (0, 0), (-1, -1), 8.3),
        ('GRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#D5E1E4')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ]))
    story.extend([verification_table, PageBreak()])

    if case.damage_type == 'Disease' and case.ai_disease_name:
        ai_rows = [
            [
                'Disease detected',
                case.ai_disease_name,
                'Confidence',
                f'{case.ai_confidence or 0:.1f}%',
            ],
            [
                'Model',
                case.ai_model_name or 'AgriComplete LiteRT Crop Disease Model',
                'Detected',
                report_datetime(case.ai_detection_at),
            ],
        ]
        ai_table = Table(
            ai_rows,
            colWidths=[27 * mm, 58 * mm, 22 * mm, 63 * mm],
        )
        ai_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#EEF4FF')),
            ('BACKGROUND', (2, 0), (2, -1), colors.HexColor('#EEF4FF')),
            ('FONTNAME', (0, 0), (0, -1), bold_font),
            ('FONTNAME', (2, 0), (2, -1), bold_font),
            ('FONTNAME', (1, 0), (1, -1), normal_font),
            ('FONTNAME', (3, 0), (3, -1), normal_font),
            ('FONTSIZE', (0, 0), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#D7E0EE')),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 5),
            ('RIGHTPADDING', (0, 0), (-1, -1), 5),
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ]))
        story.extend([
            Paragraph(text['ai_evidence'], styles['SectionLabel']),
            ai_table,
            Spacer(1, 3 * mm),
        ])

    metrics = [
        ['Expected production', f'{case.expected_production_kg:,.0f} kg'],
        ['Current yield estimate', f'{case.current_yield_estimate_kg:,.0f} kg'],
        ['Estimated yield loss', f'{case.estimated_yield_loss_kg:,.0f} kg'],
        ['Market price', f'INR {case.market_price_per_kg:,.2f} / kg'],
        ['Expected crop value', _money(case.expected_revenue)],
        ['Estimated financial loss', _money(case.estimated_loss)],
        ['Estimated salvage value', _money(case.estimated_salvage_value)],
    ]
    metrics_table = Table(metrics, colWidths=[75 * mm, 95 * mm])
    metrics_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#155C2C')),
        ('TEXTCOLOR', (0, 0), (0, -1), colors.white),
        ('TEXTCOLOR', (1, 0), (1, -1), colors.HexColor('#17351E')),
        ('FONTNAME', (0, 0), (-1, -1), bold_font),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('GRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#D7E5D9')),
        ('LEFTPADDING', (0, 0), (-1, -1), 9),
        ('RIGHTPADDING', (0, 0), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.extend([
        Paragraph(text['loss'], styles['SectionLabel']),
        metrics_table,
        Spacer(1, 3 * mm),
        Paragraph(text['recommendation'], styles['SectionLabel']),
        Paragraph(
            escape(case.ai_recommendation or text['not_recorded']),
            styles['Normal']
        ),
        Spacer(1, 3 * mm),
    ])

    claim_checklist = _claim_checklist_for_response(case.claim_checklist_summary)
    checklist_rows = [['Insurance Claim Checklist', 'Status']]
    for item in claim_checklist.get('items', []):
        detail = 'Available' if item.get('complete') else 'Not available'
        if item.get('key') == 'disease_evidence' and item.get('complete'):
            detail = f'Generated: {item.get("scan_name") or "disease scan"}'
        checklist_rows.append([
            report_value(item.get('label')),
            report_value(detail),
        ])
    checklist_rows.append([
        report_value('Claim readiness'),
        report_value(
            f'{claim_checklist.get("completed", 0)} of '
            f'{claim_checklist.get("total", 5)} items '
            f'({claim_checklist.get("readiness_percent", 0)}%)'
        ),
    ])
    checklist_table = Table(checklist_rows, colWidths=[53 * mm, 29 * mm])
    checklist_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#155C2C')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), bold_font),
        ('FONTNAME', (0, 1), (-1, -1), normal_font),
        ('FONTSIZE', (0, 0), (-1, -1), 7),
        ('GRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#D7E5D9')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))

    score_factors = _json_object(case.claim_score_factors)
    factor_rows = [['Readiness factor', 'Score']]
    factor_labels = {
        'photo_evidence': 'Photo evidence',
        'location_verification': 'Location verification',
        'disease_detection_confidence': 'Disease detection confidence',
        'weather_correlation': 'Weather correlation',
        'document_completeness': 'Document completeness',
    }
    for key, value in score_factors.items():
        factor_rows.append([factor_labels.get(key, key.replace('_', ' ').title()), f'{value}/20'])
    factor_rows.append(['CropShield Claim Score', f'{case.claim_score or 0}/100'])
    factor_rows.append(['Status', case.claim_status or text['not_recorded']])
    score_table = Table(factor_rows, colWidths=[55 * mm, 27 * mm])
    score_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#173A22')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('BACKGROUND', (0, -2), (-1, -1), colors.HexColor('#EAF6EE')),
        ('FONTNAME', (0, 0), (-1, 0), bold_font),
        ('FONTNAME', (0, 1), (-1, -1), normal_font),
        ('FONTNAME', (0, -2), (-1, -1), bold_font),
        ('FONTSIZE', (0, 0), (-1, -1), 7),
        ('GRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#D4E1D7')),
        ('ALIGN', (1, 1), (1, -1), 'RIGHT'),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    readiness_panel = Table([[
        [
            Paragraph(text['checklist'], styles['SectionLabel']),
            checklist_table,
        ],
        [
            Paragraph(text['score'], styles['SectionLabel']),
            score_table,
        ],
    ]], colWidths=[85 * mm, 85 * mm])
    readiness_panel.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 2),
        ('RIGHTPADDING', (0, 0), (-1, -1), 2),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.extend([
        readiness_panel,
        Paragraph(
            escape(claim_checklist.get('privacy_note') or ''),
            styles['CenterSmall'],
        ),
        Spacer(1, 3 * mm),
    ])

    weather = _weather_for_response(case.weather_summary)
    if weather:
        weather_text = ', '.join(
            f'{key.replace("_", " ").title()}: {value}'
            for key, value in weather.items()
            if key != 'impact' and value not in ('', None)
        )
        story.extend([
            Paragraph(text['weather'], styles['SectionLabel']),
            Paragraph(escape(weather_text) or 'No weather context recorded.', styles['Normal']),
            Spacer(1, 4 * mm),
        ])
        impact = weather.get('impact') if isinstance(weather.get('impact'), dict) else {}
        windows = impact.get('windows') if isinstance(impact.get('windows'), dict) else {}
        if windows:
            impact_rows = [['Period', 'Rainfall', 'Temperature range', 'Average humidity']]
            for key, label in (
                ('7_days', 'Last 7 days'),
                ('15_days', 'Last 15 days'),
                ('30_days', 'Last 30 days'),
            ):
                window = windows.get(key) or {}
                impact_rows.append([
                    label,
                    f'{window.get("rainfall_mm", "--")} mm',
                    (
                        f'{window.get("min_temperature_c", "--")} to '
                        f'{window.get("max_temperature_c", "--")} C'
                    ),
                    f'{window.get("average_humidity_percent", "--")}%',
                ])
            impact_table = Table(
                impact_rows,
                colWidths=[35 * mm, 35 * mm, 55 * mm, 45 * mm]
            )
            impact_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#E7F0F4')),
                ('FONTNAME', (0, 0), (-1, 0), bold_font),
                ('FONTNAME', (0, 1), (-1, -1), normal_font),
                ('FONTSIZE', (0, 0), (-1, -1), 8),
                ('GRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#D5E1E4')),
                ('ALIGN', (1, 1), (-1, -1), 'RIGHT'),
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('LEFTPADDING', (0, 0), (-1, -1), 6),
                ('RIGHTPADDING', (0, 0), (-1, -1), 6),
                ('TOPPADDING', (0, 0), (-1, -1), 4),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ]))
            story.extend([
                Paragraph(
                    escape(
                        f'{impact.get("location") or case.location} | '
                        f'{impact.get("period_start") or ""} to '
                        f'{impact.get("period_end") or ""}'
                    ),
                    styles['CenterSmall']
                ),
                impact_table,
                Spacer(1, 4 * mm),
            ])
    closing_notes = []
    if case.notes:
        closing_notes.extend([
            Paragraph('Farmer observations', styles['Heading2']),
            Paragraph(escape(case.notes).replace('\n', '<br/>'), styles['Normal']),
            Spacer(1, 2 * mm),
        ])
    closing_notes.append(Paragraph(
        '<b>Important:</b> This report is a data-assisted evidence estimate prepared from '
        'farmer-provided information and images. It is not an official insurance valuation, '
        'government inspection, or claim approval.',
        styles['ReportDisclaimer']
    ))
    story.extend([PageBreak(), Paragraph(text['photos'], styles['Heading1'])])

    coordinates = (
        f'{case.gps_latitude:.6f}, {case.gps_longitude:.6f}'
        if case.gps_latitude is not None and case.gps_longitude is not None
        else text['not_recorded']
    )
    damage_raw = _decode_image_data(case.damage_image_data, 'Damage evidence')
    damage_caption = (
        f'<b>Damage evidence</b><br/>'
        f'Timestamp: {escape(report_datetime(case.damage_captured_at))}<br/>'
        f'GPS: {escape(coordinates)}'
    )
    if case.ai_evidence_image_data:
        ai_raw = _decode_image_data(
            case.ai_evidence_image_data,
            'AI diagnosis source image',
            min_width=128,
            min_height=128,
        )
        evidence_table = Table(
            [[
                ReportImage(
                    io.BytesIO(damage_raw),
                    width=72 * mm,
                    height=42 * mm,
                    kind='proportional',
                ),
                ReportImage(
                    io.BytesIO(ai_raw),
                    width=72 * mm,
                    height=42 * mm,
                    kind='proportional',
                ),
            ], [
                Paragraph(damage_caption, styles['CenterSmall']),
                Paragraph(
                    '<b>AI diagnosis source image</b><br/>'
                    f'{escape(case.ai_disease_name or "Disease evidence")}<br/>'
                    f'Confidence: {case.ai_confidence or 0:.1f}%',
                    styles['CenterSmall'],
                ),
            ]],
            colWidths=[85 * mm, 85 * mm],
        )
    else:
        evidence_table = Table(
            [[ReportImage(
                io.BytesIO(damage_raw),
                width=112 * mm,
                height=62 * mm,
                kind='proportional',
            )], [Paragraph(damage_caption, styles['CenterSmall'])]],
            colWidths=[170 * mm],
        )
    evidence_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('BOX', (0, 0), (-1, -1), 0.6, colors.HexColor('#D5E3D7')),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#D5E3D7')),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.extend([evidence_table, Spacer(1, 4 * mm)])

    additional_images = []
    if case.map_snapshot_data:
        additional_images.append(('Map snapshot', case.map_snapshot_data))
    if additional_images:
        cells = []
        for label, image_data in additional_images:
            raw = _decode_image_data(
                image_data,
                label,
                min_width=128 if label == 'AI diagnosis source image' else 320,
                min_height=128 if label == 'AI diagnosis source image' else 240,
            )
            cells.append([
                ReportImage(io.BytesIO(raw), width=60 * mm, height=34 * mm, kind='proportional'),
                Paragraph(label, styles['CenterSmall']),
            ])
        while len(cells) < 2:
            cells.append([Spacer(1, 34 * mm), Paragraph('', styles['CenterSmall'])])
        extra_table = Table(
            [[cells[0][0], cells[1][0]], [cells[0][1], cells[1][1]]],
            colWidths=[85 * mm, 85 * mm],
        )
        extra_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#D5E3D7')),
            ('INNERGRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#D5E3D7')),
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ]))
        story.extend([extra_table, Spacer(1, 4 * mm)])
    story.extend(closing_notes)
    story.append(Spacer(1, 3 * mm))

    if case.farmer_signature_data:
        signature_raw = _decode_signature_data(case.farmer_signature_data)
        signature_mark = ReportImage(
            io.BytesIO(signature_raw),
            width=62 * mm,
            height=18 * mm,
            kind='proportional'
        )
    else:
        signature_mark = report_value('', 'Signature or thumb impression not recorded')
    signatures = [
        [Paragraph('<b>Farmer signature / thumb impression</b>', styles['CenterSmall'])],
        [signature_mark],
        [Paragraph(
            escape(case.farmer_signature_method or 'Farmer acknowledgement'),
            styles['CenterSmall']
        )],
    ]
    signature_table = Table(signatures, colWidths=[82 * mm])
    signature_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#EEF6EF')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#C9D8CC')),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 1), (-1, 1), 7),
        ('BOTTOMPADDING', (0, 1), (-1, 1), 7),
    ]))
    story.extend([
        Paragraph(text['declaration'], styles['SectionLabel']),
        Paragraph(
            'The farmer declares that the submitted plot, crop, loss details, and '
            'photographic evidence are accurate to the best of their knowledge. '
            'This report does not claim verification by an agriculture officer, '
            'surveyor, insurer, or government authority.',
            styles['Normal']
        ),
        Spacer(1, 2 * mm),
    ])

    issuer_signature_path = os.path.join(
        os.path.dirname(os.path.dirname(__file__)),
        'assets',
        'agricomplete-signature.png'
    )
    issuer_table = None
    if os.path.exists(issuer_signature_path):
        issuer_signature = ReportImage(
            issuer_signature_path,
            width=64 * mm,
            height=14 * mm,
            kind='proportional'
        )
        issuer_table = Table([
            [Paragraph('<b>Digitally issued by AgriComplete Hub</b>', styles['CenterSmall'])],
            [issuer_signature],
            [Paragraph(
                f'Report ID: {escape(case.reference)}<br/>'
                f'Generated: {escape(report_datetime(case.created_at))}',
                styles['CenterSmall']
            )],
        ], colWidths=[82 * mm])
        issuer_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F0F6F1')),
            ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#C9D8CC')),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ]))
    if issuer_table is None:
        issuer_table = Table([[
            Paragraph(
                '<b>Digitally issued by AgriComplete Hub</b><br/>'
                f'Report ID: {escape(case.reference)}<br/>'
                f'Generated: {escape(report_datetime(case.created_at))}',
                styles['CenterSmall'],
            )
        ]], colWidths=[82 * mm])
        issuer_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#F0F6F1')),
            ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#C9D8CC')),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ]))
    signer_panel = Table(
        [[signature_table, issuer_table]],
        colWidths=[85 * mm, 85 * mm],
    )
    signer_panel.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 2),
        ('RIGHTPADDING', (0, 0), (-1, -1), 2),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.extend([signer_panel, Spacer(1, 4 * mm)])

    verify_base_url = os.getenv(
        'CROPSHIELD_VERIFY_BASE_URL',
        'https://agricomplete-frontend.onrender.com'
    ).strip().rstrip('/')
    verify_url = f'{verify_base_url}/cropshield-verify.html?reference={case.reference}'
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=8,
        border=4,
    )
    qr.add_data(verify_url)
    qr.make(fit=True)
    qr_code_image = qr.make_image(fill_color='black', back_color='white')
    qr_buffer = io.BytesIO()
    qr_code_image.save(qr_buffer, format='PNG')
    qr_buffer.seek(0)
    qr_image = ReportImage(qr_buffer, width=28 * mm, height=28 * mm)
    verification = Table([
        [
            qr_image,
            Paragraph(
                f'<font size="12"><b>{escape(text["verify"])}</b></font><br/>'
                f'Report reference: <b>{case.reference}</b><br/>'
                f'{verify_url}<br/><br/>'
                f'Evidence fingerprint:<br/><font size="6">{case.evidence_fingerprint}</font>',
                styles['Normal']
            )
        ]
    ], colWidths=[36 * mm, 134 * mm])
    verification.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#F4F8F4')),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#C9D9CC')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(verification)

    def report_footer(canvas, document):
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor('#C9D8CC'))
        canvas.setLineWidth(0.5)
        canvas.line(18 * mm, 12 * mm, A4[0] - 18 * mm, 12 * mm)
        canvas.setFont(normal_font, 7)
        canvas.setFillColor(colors.HexColor('#6B7F6E'))
        canvas.drawString(
            18 * mm,
            8 * mm,
            f'AgriComplete CropShield | {case.reference} | Claim-support evidence'
        )
        canvas.drawRightString(
            A4[0] - 18 * mm,
            8 * mm,
            f'Page {document.page}'
        )
        canvas.restoreState()

    doc.build(story, onFirstPage=report_footer, onLaterPages=report_footer)
    output.seek(0)
    return output


@cropshield_bp.route('/cases/<int:case_id>/report', methods=['GET'])
@jwt_required()
def download_report(case_id):
    user_id = _current_user_id()
    case = _owned_case(case_id, user_id)
    if not case:
        return jsonify({'msg': 'CropShield case not found'}), 404
    user = db.session.get(User, user_id)
    language = _clean_text(request.args.get('lang'), 2).lower() or 'en'
    if language not in REPORT_TEXT:
        return jsonify({'msg': 'Report language must be en, hi, or mr'}), 400
    try:
        report = _case_report_pdf(case, user, language)
    except (RuntimeError, ValueError) as err:
        return jsonify({'msg': str(err)}), 503
    return send_file(
        report,
        mimetype='application/pdf',
        as_attachment=True,
        download_name=f'{case.reference}-crop-loss-report-{language}.pdf',
    )
