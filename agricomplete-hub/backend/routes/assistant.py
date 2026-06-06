from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
import json
import os
import re
import time
import urllib.parse
import urllib.error
import urllib.request

assistant_bp = Blueprint('assistant', __name__)

DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash-lite'
DEFAULT_GEMINI_FALLBACK_MODELS = []
DEFAULT_GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent'
DEFAULT_GEMINI_TIMEOUT_SECONDS = 24
DEFAULT_GEMINI_RATE_LIMIT_COOLDOWN_SECONDS = 30
MAX_MESSAGE_LENGTH = 2500
MAX_HISTORY_ITEMS = 8

_gemini_cooldown_until = 0

OFFLINE_TOPIC_ANSWERS = [
    (('photosynthesis',), 'Photosynthesis is how plants use sunlight, water, and carbon dioxide to make food for growth. It also releases oxygen. Healthy green leaves, enough water, and balanced nutrients improve photosynthesis.'),
    (('agriculture', 'farming'), 'Agriculture is the practice of growing crops, raising animals, and managing land to produce food, fiber, and income. Good farming depends on soil, water, seed, weather, pest control, and market timing.'),
    (('crop rotation', 'rotation'), 'Crop rotation means growing different crop families on the same land in different seasons. It improves soil health, reduces pest buildup, and balances nutrient use.'),
    (('organic farming', 'organic'), 'Organic farming focuses on compost, farmyard manure, crop rotation, biological pest control, mulching, and soil health while avoiding synthetic chemicals as much as possible.'),
    (('drip irrigation', 'drip'), 'Drip irrigation gives water slowly near the root zone. It saves water, reduces weeds, and keeps leaves dry, which can lower disease risk.'),
    (('soil ph', 'ph value', 'ph'), 'Soil pH shows whether soil is acidic, neutral, or alkaline. Most crops grow well around pH 6.0 to 7.5, but exact needs depend on the crop.'),
    (('fertilizer', 'npk', 'nitrogen', 'phosphorus', 'potassium'), 'Fertilizer supplies nutrients crops need. Nitrogen supports leaves, phosphorus supports roots and flowering, and potassium improves strength, quality, and stress tolerance.'),
    (('urea',), 'Urea is a nitrogen fertilizer. It supports leafy growth, but too much can increase disease or lodging risk, so apply it in split doses and avoid heavy rain timing.'),
    (('yellow leaves', 'leaf yellowing'), 'Yellow leaves can be caused by nitrogen deficiency, too much water, drought stress, root damage, pests, disease, or natural aging. Check soil moisture and leaf undersides first.'),
    (('leaf spot', 'spots on leaves'), 'Leaf spots often come from fungal or bacterial disease, but pests and nutrient issues can look similar. Improve airflow, avoid overhead watering, and use a clear leaf photo for disease detection.'),
    (('market price', 'mandi'), 'Mandi price is the crop trading rate in a market yard. It changes with supply, demand, quality, moisture, transport cost, season, and buyer competition.'),
    (('artificial intelligence', 'ai'), 'AI is software that can understand patterns, answer questions, classify images, or make predictions from data. In this app it supports assistant replies and farming recommendations.'),
    (('machine learning', 'ml'), 'Machine learning is a type of AI where a model learns from examples. In farming it can help with disease prediction, crop suitability, and price or weather pattern analysis.'),
    (('api',), 'An API lets one software system request data or actions from another. This app uses APIs for login, profile, weather, marketplace, and AgriMate answers.'),
    (('python',), 'Python is a programming language used for websites, automation, data analysis, AI, and backend development.'),
    (('html',), 'HTML defines the structure of a web page, such as headings, buttons, forms, links, images, and sections.'),
    (('css',), 'CSS controls how a web page looks, including colors, spacing, layout, fonts, responsiveness, and animations.'),
    (('javascript', 'js'), 'JavaScript makes web pages interactive. It handles clicks, forms, API calls, charts, chat behavior, and dynamic UI updates.'),
    (('capital of india', 'india capital'), 'The capital of India is New Delhi.'),
    (('capital of maharashtra', 'maharashtra capital'), 'The capital of Maharashtra is Mumbai.'),
    (('pune', 'poona'), 'Pune is a major city in Maharashtra known for education, IT, manufacturing, culture, and history. It is often called the Oxford of the East because of its strong education sector. Pune is also famous for Shaniwar Wada, Aga Khan Palace, nearby forts, pleasant weather, food culture, startups, and the automobile industry.'),
]


def _get_json_body():
    data = request.get_json(silent=True)
    return data if isinstance(data, dict) else {}


def _clean_text(value, max_length=MAX_MESSAGE_LENGTH):
    text = str(value or '').strip()
    return text[:max_length]


def _current_user_context():
    try:
        verify_jwt_in_request(optional=True)
        user_id = get_jwt_identity()
    except Exception:
        user_id = None

    if not user_id:
        return ''

    try:
        from models import User
        user = User.query.get(int(user_id))
    except Exception:
        user = None

    if not user:
        return ''

    fields = {
        'name': f"{user.first_name or ''} {user.last_name or ''}".strip() or user.username,
        'state': user.state,
        'district': user.district,
        'village': user.village,
        'farm_area': user.total_area,
        'soil_type': user.soil_type,
        'irrigation_source': user.irrigation_source,
        'primary_crops': user.primary_crops,
        'farming_type': user.farming_type,
    }
    compact = {key: value for key, value in fields.items() if value}
    return f"Known user/farm context: {json.dumps(compact, ensure_ascii=False)}" if compact else ''


def _marketplace_context():
    try:
        from models import MarketListing
        listings = MarketListing.query.order_by(MarketListing.created_at.desc()).limit(6).all()
    except Exception:
        listings = []

    if not listings:
        return ''

    compact = [
        {
            'crop': item.crop_name,
            'price_per_quintal': item.price,
            'quantity': item.quantity,
            'location': item.location,
            'category': item.category,
        }
        for item in listings
    ]
    return f"Recent marketplace listings: {json.dumps(compact, ensure_ascii=False)}"


def _system_prompt():
    context_lines = [
        'You are AgriMate inside AgriComplete Hub, a farming web app.',
        'Answer the user question directly like a helpful LLM assistant.',
        'You can discuss farming, crops, disease symptoms, soil, fertilizer, irrigation, weather planning, marketplace selling/buying, app usage, and general questions.',
        'If the question is not farming-related, still answer normally and briefly.',
        'Always answer the actual question first. If details are missing, make reasonable assumptions, give a useful general answer, then ask 1-3 follow-up questions at the end.',
        'For crop recommendation questions, suggest practical crop options by season/water/soil assumptions instead of only asking for location.',
        'For medical, legal, financial, pesticide, or safety-sensitive advice, provide general guidance and recommend confirming with a qualified expert or official source.',
        'Do not claim live weather, live mandi prices, or government rules unless the provided context includes them.',
        'Keep answers concise: usually 2 to 6 short bullets or one short paragraph.',
    ]
    user_context = _current_user_context()
    market_context = _marketplace_context()
    if user_context:
        context_lines.append(user_context)
    if market_context:
        context_lines.append(market_context)
    return '\n'.join(context_lines)


def _offline_key_matches(lowered, key):
    normalized_key = str(key or '').strip().lower()
    if not normalized_key:
        return False
    if re.fullmatch(r'[a-z0-9]{1,3}', normalized_key):
        return re.search(rf'\b{re.escape(normalized_key)}\b', lowered) is not None
    return normalized_key in lowered


def _offline_topic_answer(text):
    lowered = text.lower()
    for keys, answer in OFFLINE_TOPIC_ANSWERS:
        if any(_offline_key_matches(lowered, key) for key in keys):
            return answer
    return ''


def _question_topic(message):
    topic = re.sub(r'\s+', ' ', _clean_text(message, 320)).strip(' ?!.')
    lowered = topic.lower()
    prefixes = [
        'can you explain me about ', 'can you explain about ', 'can you explain ',
        'please explain me about ', 'please explain about ', 'please explain ',
        'explain me about ', 'explain about ', 'explain ',
        'tell me about ', 'what is ', 'what are ',
        'who is ', 'who are ', 'define ', 'meaning of ', 'how to ', 'how do i ', 'how can i ',
        'why is ', 'why are ', 'why do ', 'why does ', 'give me ', 'show me ',
    ]
    for prefix in prefixes:
        if lowered.startswith(prefix):
            topic = topic[len(prefix):].strip() or topic
            break

    topic = re.sub(r"\b(please\s+)?(do not|don't|dont)\s+give me\b.*$", '', topic, flags=re.IGNORECASE)
    topic = re.sub(r'\b(famous\s+){2,}', 'famous ', topic, flags=re.IGNORECASE)
    topic = re.sub(r'\b(explain me|explain)\b\s*$', '', topic, flags=re.IGNORECASE)
    return topic.strip(' ?!.') or _clean_text(message, 120).strip(' ?!.')


def _simple_local_answer(message):
    text = re.sub(r'\s+', ' ', _clean_text(message, 120).lower()).strip(' .,!?:;-')
    greetings = {
        'hi', 'hii', 'hello', 'hey', 'hey there', 'good morning', 'good afternoon',
        'good evening', 'namaste', 'namaskar', 'नमस्ते', 'नमस्कार'
    }
    thanks = {'thanks', 'thank you', 'ok thanks', 'okay thanks', 'धन्यवाद'}
    goodbyes = {'bye', 'goodbye', 'see you', 'see you later'}

    if text in greetings:
        return 'Hi! I am AgriMate. Ask me anything about farming, crops, weather planning, marketplace, or any general question.'
    if text in thanks:
        return 'You are welcome. Ask me anytime if you need help with farming or the app.'
    if text in goodbyes:
        return 'Goodbye. Come back anytime when you need farming or app help.'
    return ''


def _prompt_aware_fallback_answer(message):
    text = _clean_text(message, 320)
    lowered = text.lower()
    topic = _question_topic(text)
    topic_answer = _offline_topic_answer(lowered)
    if topic_answer:
        return topic_answer
    if any(item in lowered for item in ['what crop', 'which crop', 'crop should', 'plant in my farm', 'seed in my farm', 'sow in my farm', 'grow in my farm', 'recommend crop']):
        return (
            'For a safe general crop choice, match the crop to your season and water supply:\n'
            '- Rainy/kharif season: soybean, maize, cotton, pigeon pea, or paddy if you have plenty of water.\n'
            '- Winter/rabi season: wheat, gram/chickpea, mustard, onion, or garlic with irrigation.\n'
            '- Low-water farms: gram, pigeon pea, millet, sorghum, sesame, or groundnut are usually safer than paddy.\n'
            'For a more exact recommendation, share your location, soil type, water source, and current season.'
        )
    if any(item in lowered for item in ['compare', 'difference between', ' vs ', ' versus ']):
        return f'For "{topic}", compare purpose, cost, effort, risk, time, and expected result. For farming decisions, also compare water need, soil suitability, pest risk, and market demand.'
    if lowered.startswith('how ') or any(item in lowered for item in ['how to', 'how can i', 'how do i']):
        return f'To handle "{topic}", define the exact goal, gather the needed details, take one small action, and review the result. For farm work, include crop, location, soil, water, and symptoms.'
    if lowered.startswith('why ') or any(item in lowered for item in ['reason for', 'cause of', 'because of']):
        return f'The likely reason for "{topic}" depends on the situation. Check recent changes, environment, timing, inputs used, and visible symptoms before deciding the action.'
    if lowered.startswith('what ') or lowered.startswith('who ') or any(item in lowered for item in ['define', 'meaning of', 'explain']):
        return f'{topic}: Here is the most useful way to understand it: what it is, the main facts or features, why it matters, and one practical example. Ask a more specific question to get a deeper answer.'
    return f'{topic}: I can help with a concise explanation, comparison, or next-step guidance. Share the exact detail you want, such as meaning, importance, examples, advantages, disadvantages, or practical use.'


def _local_fallback_answer(message):
    text = _clean_text(message, 320)
    lowered = text.lower()
    if any(item in lowered for item in ['who are you', 'your name', 'what is agrimate']):
        return (
            'I am AgriMate, the assistant inside AgriComplete Hub. '
            'I can answer farming questions, app questions, and general questions.'
        )
    if any(item in lowered for item in ['not responding', 'not working', 'stuck', 'no response']):
        return 'AgriMate is responding now. If the online AI or local model is unavailable, I will still return a quick local answer.'
    return _prompt_aware_fallback_answer(text)


def _clean_history(history):
    if not isinstance(history, list):
        return []

    cleaned = []
    for item in history[-MAX_HISTORY_ITEMS:]:
        if not isinstance(item, dict):
            continue
        role = item.get('role')
        content = _clean_text(item.get('content'), 900)
        if role not in {'user', 'assistant'} or not content:
            continue
        cleaned.append({'role': role, 'content': content})
    return cleaned


def _gemini_settings():
    api_key = os.getenv('GEMINI_API_KEY') or os.getenv('GOOGLE_API_KEY')
    api_url = os.getenv('GEMINI_API_URL') or DEFAULT_GEMINI_API_URL
    model = (os.getenv('GEMINI_MODEL') or DEFAULT_GEMINI_MODEL).strip()
    if model.startswith('models/'):
        model = model.split('/', 1)[1]
    return api_key, api_url, model


def _gemini_timeout_seconds():
    raw_value = os.getenv('GEMINI_TIMEOUT_SECONDS')
    try:
        return max(4, min(float(raw_value or DEFAULT_GEMINI_TIMEOUT_SECONDS), 30))
    except (TypeError, ValueError):
        return DEFAULT_GEMINI_TIMEOUT_SECONDS


def _gemini_model_candidates(primary_model):
    configured = os.getenv('GEMINI_FALLBACK_MODELS') or ''
    fallback_models = [item.strip() for item in configured.split(',') if item.strip()] or DEFAULT_GEMINI_FALLBACK_MODELS
    models = [primary_model, *fallback_models]
    unique_models = []
    for model in models:
        normalized = model.split('/', 1)[1] if model.startswith('models/') else model
        if normalized and normalized not in unique_models:
            unique_models.append(normalized)
    return unique_models


def _gemini_url(api_url, model):
    if '{model}' in api_url:
        return api_url.format(model=urllib.parse.quote(model, safe=''))
    return api_url


def _gemini_history(history):
    contents = []
    for item in _clean_history(history):
        role = 'model' if item['role'] == 'assistant' else 'user'
        contents.append({
            'role': role,
            'parts': [{'text': item['content']}],
        })
    return contents


def _extract_gemini_text(data):
    if not isinstance(data, dict):
        return None, 'Gemini returned a non-JSON response.'

    candidates = data.get('candidates')
    if not isinstance(candidates, list) or not candidates:
        feedback = data.get('promptFeedback') if isinstance(data.get('promptFeedback'), dict) else {}
        block_reason = feedback.get('blockReason')
        suffix = f' Block reason: {block_reason}.' if block_reason else ''
        return None, f'Gemini returned no candidates.{suffix}'

    candidate = candidates[0] if isinstance(candidates[0], dict) else {}
    content = candidate.get('content') if isinstance(candidate.get('content'), dict) else {}
    parts = content.get('parts') if isinstance(content.get('parts'), list) else []
    answer = ''.join(
        str(part.get('text', ''))
        for part in parts
        if isinstance(part, dict) and part.get('text')
    ).strip()

    if answer:
        return answer, None

    finish_reason = candidate.get('finishReason') or 'unknown'
    return None, f'Gemini returned an empty response. Finish reason: {finish_reason}.'


def _call_gemini_llm(message, history, api_key, api_url, model):
    payload = {
        'systemInstruction': {
            'parts': [{'text': _system_prompt()}],
        },
        'contents': [
            *_gemini_history(history),
            {'role': 'user', 'parts': [{'text': message}]},
        ],
        'generationConfig': {
            'temperature': 0.55,
            'maxOutputTokens': 650,
        },
    }
    req = urllib.request.Request(
        _gemini_url(api_url, model),
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Content-Type': 'application/json',
            'x-goog-api-key': api_key,
        },
        method='POST',
    )

    try:
        with urllib.request.urlopen(req, timeout=_gemini_timeout_seconds()) as response:
            data = json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as err:
        try:
            error_body = json.loads(err.read().decode('utf-8'))
            message = error_body.get('error', {}).get('message') or str(err)
        except Exception:
            message = str(err)
        return None, f'Gemini request failed: {message}'
    except Exception as err:
        return None, f'Gemini request failed: {err}'

    return _extract_gemini_text(data)


def _is_rate_limit_error(error):
    lowered = str(error or '').lower()
    return any(item in lowered for item in ['quota exceeded', 'rate limit', 'retry in', '429'])


def _retry_after_seconds(error):
    match = re.search(r'retry in\s+([0-9.]+)s', str(error or ''), re.IGNORECASE)
    if not match:
        return DEFAULT_GEMINI_RATE_LIMIT_COOLDOWN_SECONDS
    try:
        return max(5, min(int(float(match.group(1))) + 1, 120))
    except (TypeError, ValueError):
        return DEFAULT_GEMINI_RATE_LIMIT_COOLDOWN_SECONDS


def _call_llm(message, history):
    global _gemini_cooldown_until

    gemini_api_key, gemini_api_url, gemini_model = _gemini_settings()
    if not gemini_api_key:
        return None, 'Gemini API key is not configured. Add GEMINI_API_KEY to backend/.env and restart the backend.'

    remaining_cooldown = int(_gemini_cooldown_until - time.time())
    if remaining_cooldown > 0:
        return None, f'Gemini rate limit cooldown active. Please retry in {remaining_cooldown}s.'

    errors = []
    for model in _gemini_model_candidates(gemini_model):
        answer, error = _call_gemini_llm(message, history, gemini_api_key, gemini_api_url, model)
        if answer:
            return answer, None
        errors.append(f'{model}: {error}')

    error_text = 'Gemini request failed for all configured models. ' + ' | '.join(errors)
    if _is_rate_limit_error(error_text):
        _gemini_cooldown_until = time.time() + _retry_after_seconds(error_text)
    return None, error_text


@assistant_bp.route('/status', methods=['GET'])
def assistant_status():
    gemini_api_key, _, gemini_model = _gemini_settings()
    return jsonify({
        'provider': 'gemini',
        'configured': bool(gemini_api_key),
        'model': gemini_model,
        'fallback_models': _gemini_model_candidates(gemini_model),
    }), 200


@assistant_bp.route('/chat', methods=['POST'])
def chat():
    data = _get_json_body()
    message = _clean_text(data.get('message'))
    if not message:
        return jsonify({'msg': 'Message is required'}), 400

    simple_answer = _simple_local_answer(message)
    if simple_answer:
        return jsonify({
            'answer': simple_answer,
            'source': 'local'
        }), 200

    answer, error = _call_llm(message, data.get('history'))
    if error:
        return jsonify({
            'msg': error,
            'answer': _local_fallback_answer(message),
            'source': 'fallback'
        }), 200

    return jsonify({
        'answer': answer,
        'source': 'llm'
    }), 200

