import os

import requests
from flask import Blueprint, current_app, jsonify, request


market_prices_bp = Blueprint('market_prices', __name__)

DATA_GOV_MANDI_ENDPOINT = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070'


def _clean_text(value, max_length=80):
    text = str(value or '').strip()
    return text[:max_length]


def _bounded_limit(value):
    try:
        limit = int(value)
    except (TypeError, ValueError):
        limit = 50
    return max(1, min(limit, 200))


def _clean_price(value):
    text = _clean_text(value, 30).replace(',', '')
    try:
        return float(text)
    except (TypeError, ValueError):
        return None


def _normalize_record(record):
    return {
        'state': _clean_text(record.get('state')),
        'district': _clean_text(record.get('district')),
        'market': _clean_text(record.get('market')),
        'commodity': _clean_text(record.get('commodity')),
        'variety': _clean_text(record.get('variety') or record.get('grade')),
        'arrival_date': _clean_text(record.get('arrival_date')),
        'min_price': _clean_price(record.get('min_price')),
        'modal_price': _clean_price(record.get('modal_price')),
        'max_price': _clean_price(record.get('max_price')),
    }


def _safe_upstream_message(response):
    try:
        payload = response.json()
    except ValueError:
        return _clean_text(response.text, 180) or response.reason
    if isinstance(payload, dict):
        for key in ('message', 'error', 'title', 'desc'):
            if payload.get(key):
                return _clean_text(payload.get(key), 180)
    return response.reason


def _error_response(message, status=502, **extra):
    payload = {
        'success': False,
        'error': message,
        'records': [],
    }
    payload.update(extra)
    response = jsonify(payload)
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    return response, status


@market_prices_bp.route('/market-prices', methods=['GET'])
def get_market_prices():
    api_key = _clean_text(os.getenv('DATA_GOV_API_KEY'), 200)
    if not api_key or api_key == 'your_data_gov_api_key_here':
        return _error_response('DATA_GOV_API_KEY is not configured on the backend.', 503)

    state = _clean_text(request.args.get('state') or 'Maharashtra')
    commodity = _clean_text(request.args.get('commodity') or 'Onion')
    district = _clean_text(request.args.get('district'))
    market = _clean_text(request.args.get('market'))
    limit = _bounded_limit(request.args.get('limit'))

    params = {
        'api-key': api_key,
        'format': 'json',
        'offset': 0,
        'limit': limit,
        'filters[state]': state,
        'filters[commodity]': commodity,
    }
    if district:
        params['filters[district]'] = district
    if market:
        params['filters[market]'] = market

    try:
        response = requests.get(
            DATA_GOV_MANDI_ENDPOINT,
            params=params,
            timeout=20,
            headers={
                'Accept': 'application/json',
                'User-Agent': 'AgriComplete-Hub/1.0',
            },
        )
    except requests.Timeout:
        current_app.logger.warning('Data.gov.in mandi API timed out for state=%s commodity=%s', state, commodity)
        return _error_response('Data.gov.in mandi API timed out. Please try again.', 504)
    except requests.RequestException as err:
        current_app.logger.warning('Data.gov.in mandi API connection failed: %s', err)
        return _error_response('Could not connect to Data.gov.in mandi API.', 502)

    if response.status_code >= 400:
        upstream_message = _safe_upstream_message(response)
        current_app.logger.warning(
            'Data.gov.in mandi API returned %s: %s',
            response.status_code,
            upstream_message,
        )
        return _error_response(
            f'Data.gov.in request failed with status {response.status_code}: {upstream_message}',
            502,
            upstream_status=response.status_code,
        )

    try:
        payload = response.json()
    except ValueError:
        return _error_response('Data.gov.in returned an invalid JSON response.', 502)

    if isinstance(payload, dict) and str(payload.get('status', '')).lower() == 'error':
        return _error_response(
            _clean_text(payload.get('message') or payload.get('error'), 180) or 'Data.gov.in returned an error.',
            502,
        )

    records = payload.get('records')
    if not isinstance(records, list):
        return _error_response('Data.gov.in response did not contain mandi records.', 502)

    normalized_records = [_normalize_record(record) for record in records if isinstance(record, dict)]
    if not normalized_records:
        response = jsonify({
            'success': True,
            'message': 'No mandi records found for the selected filters.',
            'records': [],
        })
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
        return response

    response = jsonify({
        'success': True,
        'records': normalized_records,
    })
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    return response
