from flask import Blueprint, jsonify, request

disease_bp = Blueprint('disease', __name__)


@disease_bp.route('/predict', methods=['POST'])
def predict_disease():
    if 'image' not in request.files:
        return jsonify({'msg': 'Leaf image is required'}), 400

    # The ML model will be connected here after training/export.
    return jsonify({
        'msg': 'Disease prediction model is not deployed yet',
        'status': 'model_not_ready'
    }), 503
