from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required, verify_jwt_in_request
from datetime import timezone
from extensions import db
from models import DiseaseScan
import json
import logging
import os
import threading
import time

os.environ.setdefault('CUDA_VISIBLE_DEVICES', '-1')
os.environ.setdefault('TF_NUM_INTRAOP_THREADS', '1')
os.environ.setdefault('TF_NUM_INTEROP_THREADS', '1')
os.environ.setdefault('OMP_NUM_THREADS', '1')

disease_bp = Blueprint('disease', __name__)
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
MODEL_PATHS = [
    os.getenv('DISEASE_MODEL_PATH'),
    os.path.join(BASE_DIR, 'Models', 'crop_disease_model.keras'),
    os.path.join(BASE_DIR, 'models', 'crop_disease_model.keras'),
]
TFLITE_MODEL_PATHS = [
    os.getenv('DISEASE_TFLITE_MODEL_PATH'),
    os.path.join(BASE_DIR, 'Models', 'crop_disease_model.tflite'),
    os.path.join(BASE_DIR, 'models', 'crop_disease_model.tflite'),
]
CLASS_NAMES_PATHS = [
    os.getenv('DISEASE_CLASS_NAMES_PATH'),
    os.path.join(BASE_DIR, 'ML', 'class_names.json'),
    os.path.join(BASE_DIR, 'class_names.json'),
]
TREATMENTS_PATHS = [
    os.getenv('DISEASE_TREATMENTS_PATH'),
    os.path.join(BASE_DIR, 'recommendations', 'treatments.json'),
    os.path.join(BASE_DIR, 'ML', 'treatment.json'),
]

IMG_SIZE = (128, 128)
MAX_UPLOAD_BYTES = 8 * 1024 * 1024
RECENT_SCAN_LIMIT = 4
PRELOAD_MODEL = os.getenv('DISEASE_PRELOAD_MODEL', 'false').lower() == 'true'
BACKGROUND_WARMUP = os.getenv('DISEASE_BACKGROUND_WARMUP', 'true').lower() == 'true'
INFERENCE_VERSION = 'litert-raw-pixel-input-v3'
MODEL_INPUT_PREPROCESSING = 'embedded_in_saved_model'

_model = None
_model_runtime = None
_class_names = None
_treatments = None
_model_warmed = False
_warmup_started = False
_warmup_in_progress = False
_model_lock = threading.Lock()
_inference_lock = threading.Lock()


def _get_current_user_id():
    try:
        return int(get_jwt_identity())
    except (TypeError, ValueError):
        return None


def _get_optional_current_user_id():
    try:
        verify_jwt_in_request(optional=True)
        identity = get_jwt_identity()
        return int(identity) if identity is not None else None
    except Exception as err:
        logger.warning('Ignoring disease scan history auth token: %s', err)
        return None


def _scan_created_at_utc(scan):
    if not scan.created_at:
        return None
    created_at = scan.created_at
    if created_at.tzinfo is None:
        created_at = created_at.replace(tzinfo=timezone.utc)
    return created_at.astimezone(timezone.utc).isoformat().replace('+00:00', 'Z')


def _serialize_scan(scan):
    return {
        'id': scan.id,
        'class_name': scan.class_name,
        'name': scan.display_name,
        'confidence': round(float(scan.confidence or 0), 2),
        'severity': scan.severity or 'Unknown',
        'badgeClass': scan.badge_class or 'badge-info',
        'created_at': _scan_created_at_utc(scan),
    }


def _record_disease_scan(label, confidence, severity, badge_class):
    user_id = _get_optional_current_user_id()
    if user_id is None:
        return None

    scan = DiseaseScan(
        user_id=user_id,
        class_name=str(label or '')[:150],
        display_name=_format_label(label)[:150],
        confidence=float(confidence or 0),
        severity=str(severity or 'Unknown')[:30],
        badge_class=str(badge_class or 'badge-info')[:40],
    )
    try:
        db.session.add(scan)
        db.session.commit()
        return scan
    except Exception as err:
        db.session.rollback()
        logger.error('Failed to save disease scan history: %s', err, exc_info=True)
        return None


def _first_existing_path(paths):
    for path in paths:
        if path and os.path.exists(path):
            return path
    return ''


def _load_json_file(paths, default):
    path = _first_existing_path(paths)
    if not path:
        return default
    with open(path, 'r', encoding='utf-8') as file:
        return json.load(file)


def _load_model_bundle():
    global _model, _model_runtime, _class_names, _treatments, _model_warmed

    if _model is not None and _class_names is not None:
        return _model, _class_names, _treatments or {}

    with _model_lock:
        if _model is not None and _class_names is not None:
            return _model, _class_names, _treatments or {}

        tflite_model_path = _first_existing_path(TFLITE_MODEL_PATHS)
        keras_model_path = _first_existing_path(MODEL_PATHS)
        model_path = tflite_model_path or keras_model_path
        if not model_path:
            raise FileNotFoundError('Disease model file was not found in backend/Models.')

        class_names = _load_json_file(CLASS_NAMES_PATHS, [])
        if not isinstance(class_names, list) or not class_names:
            raise FileNotFoundError('Disease class_names.json was not found or is invalid.')

        if tflite_model_path:
            try:
                from ai_edge_litert.interpreter import Interpreter
            except ImportError:
                import tensorflow as tf
                Interpreter = tf.lite.Interpreter

            _model = Interpreter(model_path=tflite_model_path, num_threads=1)
            _model.allocate_tensors()
            _model_runtime = 'litert'
        else:
            import tensorflow as tf

            try:
                tf.config.threading.set_intra_op_parallelism_threads(1)
                tf.config.threading.set_inter_op_parallelism_threads(1)
            except RuntimeError:
                pass

            _model = tf.keras.models.load_model(keras_model_path)
            _model_runtime = 'keras'

        _class_names = [str(item) for item in class_names]
        _treatments = _load_json_file(TREATMENTS_PATHS, {})
        _warm_model(_model)
        _model_warmed = True
        logger.info('Disease model loaded with %s runtime from %s.', _model_runtime, model_path)
        return _model, _class_names, _treatments or {}


def _warm_model(model):
    import numpy as np

    dummy_batch = np.zeros((1, IMG_SIZE[0], IMG_SIZE[1], 3), dtype='float32')
    _run_inference(model, dummy_batch)


def _run_inference(model, batch):
    import numpy as np

    with _inference_lock:
        if _model_runtime == 'litert':
            input_details = model.get_input_details()[0]
            output_details = model.get_output_details()[0]
            input_batch = batch.astype(input_details['dtype'], copy=False)

            if np.issubdtype(input_details['dtype'], np.integer):
                scale, zero_point = input_details.get('quantization', (0.0, 0))
                if scale:
                    input_batch = np.rint(batch / scale + zero_point).astype(input_details['dtype'])

            model.set_tensor(input_details['index'], input_batch)
            model.invoke()
            predictions = model.get_tensor(output_details['index'])

            if np.issubdtype(output_details['dtype'], np.integer):
                scale, zero_point = output_details.get('quantization', (0.0, 0))
                if scale:
                    predictions = (predictions.astype('float32') - zero_point) * scale
            return predictions

        predictions = model(batch, training=False)
        return predictions.numpy() if hasattr(predictions, 'numpy') else np.asarray(predictions)


def _start_background_warmup():
    global _warmup_started, _warmup_in_progress

    if _model_warmed or _warmup_in_progress:
        return

    _warmup_started = True
    _warmup_in_progress = True

    def warmup():
        global _warmup_in_progress
        try:
            _load_model_bundle()
            logger.info('Disease prediction model warmed in background.')
        except Exception as err:
            logger.warning('Disease prediction background warmup failed: %s', err)
        finally:
            _warmup_in_progress = False

    threading.Thread(target=warmup, name='disease-model-warmup', daemon=True).start()


def _model_status():
    model_path = _first_existing_path(TFLITE_MODEL_PATHS) or _first_existing_path(MODEL_PATHS)
    class_names_path = _first_existing_path(CLASS_NAMES_PATHS)
    treatments_path = _first_existing_path(TREATMENTS_PATHS)
    return {
        'configured': bool(model_path and class_names_path),
        'loaded': _model is not None and _class_names is not None,
        'warmed': _model_warmed,
        'warming': _warmup_in_progress,
        'warmup_started': _warmup_started,
        'runtime': _model_runtime,
        'model_path': model_path,
        'class_names_path': class_names_path,
        'treatments_path': treatments_path,
        'preload_enabled': PRELOAD_MODEL,
        'background_warmup_enabled': BACKGROUND_WARMUP,
        'inference_version': INFERENCE_VERSION,
        'model_input_preprocessing': MODEL_INPUT_PREPROCESSING,
    }


def _preprocess_image(uploaded_file):
    import numpy as np
    from PIL import Image, UnidentifiedImageError

    uploaded_file.stream.seek(0, os.SEEK_END)
    size = uploaded_file.stream.tell()
    uploaded_file.stream.seek(0)
    if size > MAX_UPLOAD_BYTES:
        raise ValueError('Image is too large. Upload a leaf photo under 8 MB.')

    try:
        image = Image.open(uploaded_file.stream).convert('RGB')
    except UnidentifiedImageError as err:
        raise ValueError('Uploaded file is not a valid image.') from err

    image = image.resize(IMG_SIZE)
    image_array = np.asarray(image, dtype='float32')
    return np.expand_dims(image_array, axis=0)


def _format_label(label):
    return str(label or '').replace('___', ' - ').replace('_', ' ').strip()


def _split_guidance(value):
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    text = str(value or '').strip()
    if not text:
        return []
    return [part.strip() for part in text.replace(';', '.').split('.') if part.strip()]


def _is_healthy_label(label):
    lowered = str(label or '').lower()
    return 'healthy' in lowered


def _is_background_label(label):
    return 'background' in str(label or '').lower()


def _severity_for(label, confidence):
    if _is_healthy_label(label) or _is_background_label(label):
        return 'Low', 'badge-info'
    if confidence >= 80:
        return 'High', 'badge-danger'
    if confidence >= 55:
        return 'Moderate', 'badge-warning'
    return 'Low', 'badge-warning'


def _guidance_for(label, treatments):
    formatted_label = _format_label(label)
    details = treatments.get(label) if isinstance(treatments, dict) else {}
    details = details if isinstance(details, dict) else {}

    if _is_background_label(label):
        return {
            'description': 'The model did not detect a clear crop leaf in this image. Upload a close, well-lit leaf photo for a reliable diagnosis.',
            'symptoms': ['No clear crop leaf pattern was detected.'],
            'treatment': ['Retake the photo with one leaf centered in the frame.'],
            'prevention': ['Use a plain background and avoid blurry or dark photos.'],
        }

    if _is_healthy_label(label):
        return {
            'description': f'The uploaded leaf most closely matches {formatted_label}. No major disease pattern was detected.',
            'symptoms': ['Leaf appears generally healthy in the uploaded image.'],
            'treatment': _split_guidance(details.get('treatment')) or ['No disease treatment is needed right now.'],
            'prevention': _split_guidance(details.get('prevention')) or ['Continue regular monitoring, balanced watering, and field hygiene.'],
        }

    cause = str(details.get('cause') or '').strip()
    return {
        'description': cause or f'The model detected signs most consistent with {formatted_label}. Confirm with field symptoms before applying chemicals.',
        'symptoms': _split_guidance(details.get('symptoms')) or [
            f'Visual leaf pattern matched the {formatted_label} class.',
            'Check nearby leaves for similar spots, yellowing, curling, mold, or pest activity.',
        ],
        'treatment': _split_guidance(details.get('treatment')) or [
            'Remove heavily infected leaves where practical.',
            'Avoid overhead watering and improve airflow.',
            'Confirm locally before using any pesticide or fungicide.',
        ],
        'prevention': _split_guidance(details.get('prevention')) or [
            'Use crop rotation and clean field sanitation.',
            'Inspect plants regularly and act early when symptoms appear.',
        ],
    }


@disease_bp.route('/status', methods=['GET'])
def disease_status():
    should_warm = str(request.args.get('warm') or '').strip().lower() in {'1', 'true', 'yes'}
    should_wait = str(request.args.get('wait') or '').strip().lower() in {'1', 'true', 'yes'}

    if should_wait:
        try:
            _load_model_bundle()
        except Exception as err:
            logger.error('Disease model readiness check failed: %s', err, exc_info=True)
            status = _model_status()
            status.update({
                'ready': False,
                'msg': str(err),
            })
            return jsonify(status), 503
    elif should_warm:
        _start_background_warmup()

    status = _model_status()
    status['ready'] = bool(status['loaded'] and status['warmed'])
    return jsonify(status), 200


@disease_bp.route('/scans', methods=['GET'])
@jwt_required()
def recent_scans():
    user_id = _get_current_user_id()
    if user_id is None:
        return jsonify({'msg': 'Invalid authentication token'}), 401

    try:
        limit = int(request.args.get('limit', RECENT_SCAN_LIMIT))
    except (TypeError, ValueError):
        limit = RECENT_SCAN_LIMIT
    limit = max(1, min(limit, RECENT_SCAN_LIMIT))

    scans = (
        DiseaseScan.query
        .filter_by(user_id=user_id)
        .order_by(DiseaseScan.created_at.desc(), DiseaseScan.id.desc())
        .limit(limit)
        .all()
    )
    return jsonify({'scans': [_serialize_scan(scan) for scan in scans]}), 200


@disease_bp.route('/predict', methods=['POST'])
def predict_disease():
    start_total_time = time.time()
    if 'image' not in request.files:
        return jsonify({'msg': 'Leaf image is required'}), 400

    try:
        model, class_names, treatments = _load_model_bundle()

        start_preprocess_time = time.time()
        batch = _preprocess_image(request.files['image'])
        end_preprocess_time = time.time()
        logger.info(f'Image preprocessing took: {end_preprocess_time - start_preprocess_time:.4f} seconds')

        start_inference_time = time.time()
        predictions = _run_inference(model, batch)
        end_inference_time = time.time()
        logger.info(f'Model inference took: {end_inference_time - start_inference_time:.4f} seconds')

        scores = predictions[0].tolist()
        predicted_index = max(range(len(scores)), key=lambda index: scores[index])
        if predicted_index >= len(class_names):
            raise RuntimeError('Model output does not match class_names.json.')

        label = class_names[predicted_index]
        confidence = round(float(scores[predicted_index]) * 100, 2)
        severity, badge_class = _severity_for(label, confidence)
        guidance = _guidance_for(label, treatments)

        top_predictions = sorted(
            [
                {
                    'class_name': class_names[index],
                    'name': _format_label(class_names[index]),
                    'confidence': round(float(score) * 100, 2),
                }
                for index, score in enumerate(scores[:len(class_names)])
            ],
            key=lambda item: item['confidence'],
            reverse=True
        )[:3]

        start_db_record_time = time.time()
        saved_scan = _record_disease_scan(label, confidence, severity, badge_class)
        end_db_record_time = time.time()
        logger.info(f'Database record took: {end_db_record_time - start_db_record_time:.4f} seconds')

        response = {
            'status': 'ok',
            'disease': label,
            'class_name': label,
            'name': _format_label(label),
            'confidence': confidence,
            'severity': severity,
            'badgeClass': badge_class,
            'description': guidance['description'],
            'symptoms': guidance['symptoms'],
            'treatment': guidance['treatment'],
            'prevention': guidance['prevention'],
            'top_predictions': top_predictions,
            'inference_version': INFERENCE_VERSION,
            'model_input_preprocessing': MODEL_INPUT_PREPROCESSING,
        }
        if saved_scan:
            response['scan'] = _serialize_scan(saved_scan)

        end_total_time = time.time()
        logger.info(f'Total predict_disease request took: {end_total_time - start_total_time:.4f} seconds')

        return jsonify(response), 200
    except ValueError as err:
        return jsonify({'msg': str(err), 'status': 'invalid_image'}), 400
    except Exception as err:
        logger.error('Disease prediction failed: %s', err, exc_info=True)
        return jsonify({
            'msg': str(err),
            'status': 'model_error'
        }), 503


if PRELOAD_MODEL:
    try:
        _load_model_bundle()
        logger.info('Disease prediction model loaded during startup.')
    except Exception as err:
        logger.warning('Disease prediction model was not preloaded: %s', err)
elif BACKGROUND_WARMUP:
    _start_background_warmup()
