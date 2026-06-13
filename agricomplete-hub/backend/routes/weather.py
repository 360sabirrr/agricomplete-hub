import os
from urllib.parse import urlencode
from urllib.request import urlopen, Request
from urllib.error import HTTPError, URLError
import json
from datetime import date, timedelta

from flask import Blueprint, jsonify, request

weather_bp = Blueprint('weather', __name__)

OPEN_METEO_CODES = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
}


def _fetch_json(url):
    req = Request(url, headers={'User-Agent': 'AgriCompleteHub/1.0'})
    try:
        with urlopen(req, timeout=15) as response:
            return json.loads(response.read().decode('utf-8'))
    except HTTPError as err:
        message = err.read().decode('utf-8', errors='ignore') or str(err)
        raise RuntimeError(message)
    except URLError as err:
        raise RuntimeError(str(err))


def _weatherapi_current_weather(city, api_key):
    params = urlencode({
        'key': api_key,
        'q': city,
        'days': 3,
        'aqi': 'yes',
        'alerts': 'no'
    })
    data = _fetch_json(f'https://api.weatherapi.com/v1/forecast.json?{params}')
    if data.get('error'):
        raise RuntimeError(data['error'].get('message', 'WeatherAPI request failed'))

    location = data.get('location', {})
    current = data.get('current', {})
    condition = current.get('condition', {})

    forecast_days = []
    for day in data.get('forecast', {}).get('forecastday', [])[:3]:
        day_data = day.get('day', {})
        day_condition = day_data.get('condition', {})
        forecast_days.append({
            'date': day.get('date', ''),
            'temp': day_data.get('avgtemp_c'),
            'condition': day_condition.get('text', '')
        })

    air_quality = current.get('air_quality', {})

    return {
        'provider': 'weatherapi',
        'location': ', '.join(filter(None, [
            location.get('name'),
            location.get('region'),
            location.get('country')
        ])) or city,
        'temperature': current.get('temp_c'),
        'condition': condition.get('text', 'Weather unavailable'),
        'humidity': current.get('humidity'),
        'wind_kph': current.get('wind_kph'),
        'visibility_km': current.get('vis_km'),
        'pressure_mb': current.get('pressure_mb'),
        'aqi': air_quality.get('us-epa-index'),
        'forecast': forecast_days
    }


def _openweather_current_weather(city, api_key):
    params = urlencode({
        'q': city,
        'appid': api_key,
        'units': 'metric'
    })
    current = _fetch_json(f'https://api.openweathermap.org/data/2.5/weather?{params}')
    if str(current.get('cod')) != '200':
        raise RuntimeError(current.get('message', 'OpenWeatherMap request failed'))

    forecast = _fetch_json(f'https://api.openweathermap.org/data/2.5/forecast?{params}')
    coords = current.get('coord') or {}
    aqi = None
    if coords.get('lat') is not None and coords.get('lon') is not None:
        aqi_params = urlencode({
            'lat': coords.get('lat'),
            'lon': coords.get('lon'),
            'appid': api_key
        })
        air = _fetch_json(f'https://api.openweathermap.org/data/2.5/air_pollution?{aqi_params}')
        aqi = (air.get('list') or [{}])[0].get('main', {}).get('aqi')

    by_date = {}
    for item in forecast.get('list', []):
        dt_text = item.get('dt_txt', '')
        date_text, _, time_text = dt_text.partition(' ')
        if not date_text:
            continue
        if date_text not in by_date or time_text == '12:00:00':
            by_date[date_text] = item

    forecast_days = []
    for date_text, item in list(by_date.items())[:3]:
        condition = (item.get('weather') or [{}])[0]
        forecast_days.append({
            'date': date_text,
            'temp': item.get('main', {}).get('temp'),
            'condition': condition.get('description') or condition.get('main') or ''
        })

    condition = (current.get('weather') or [{}])[0]
    wind_mps = current.get('wind', {}).get('speed')
    return {
        'provider': 'openweathermap',
        'location': ', '.join(filter(None, [
            current.get('name'),
            current.get('sys', {}).get('country')
        ])) or city,
        'temperature': current.get('main', {}).get('temp'),
        'condition': condition.get('description') or condition.get('main') or 'Weather unavailable',
        'humidity': current.get('main', {}).get('humidity'),
        'wind_kph': wind_mps * 3.6 if wind_mps is not None else None,
        'visibility_km': current.get('visibility') / 1000 if current.get('visibility') is not None else None,
        'pressure_mb': current.get('main', {}).get('pressure'),
        'aqi': aqi,
        'forecast': forecast_days
    }


def _open_meteo_geocode(city):
    parts = [part.strip() for part in str(city or '').split(',') if part.strip()]
    candidates = [str(city or '').strip()]
    if parts:
        candidates.extend([parts[0], *reversed(parts[-2:])])

    seen = set()
    for candidate in candidates:
        normalized = candidate.casefold()
        if not candidate or normalized in seen:
            continue
        seen.add(normalized)
        params = urlencode({
            'name': candidate,
            'count': 1,
            'language': 'en',
            'format': 'json'
        })
        data = _fetch_json(f'https://geocoding-api.open-meteo.com/v1/search?{params}')
        results = data.get('results') or []
        if results:
            return results[0]
    raise RuntimeError(f'Could not find location: {city}')


def _open_meteo_current_weather(city):
    place = _open_meteo_geocode(city)
    params = urlencode({
        'latitude': place.get('latitude'),
        'longitude': place.get('longitude'),
        'current': 'temperature_2m,relative_humidity_2m,weather_code,pressure_msl,wind_speed_10m',
        'daily': 'temperature_2m_max,temperature_2m_min,weather_code',
        'forecast_days': 3,
        'timezone': 'auto'
    })
    data = _fetch_json(f'https://api.open-meteo.com/v1/forecast?{params}')
    current = data.get('current', {})
    daily = data.get('daily', {})

    dates = daily.get('time') or []
    max_temps = daily.get('temperature_2m_max') or []
    min_temps = daily.get('temperature_2m_min') or []
    weather_codes = daily.get('weather_code') or []
    forecast_days = []
    for index, date_text in enumerate(dates[:3]):
        max_temp = max_temps[index] if index < len(max_temps) else None
        min_temp = min_temps[index] if index < len(min_temps) else None
        if max_temp is not None and min_temp is not None:
            temp = (max_temp + min_temp) / 2
        else:
            temp = max_temp if max_temp is not None else min_temp
        code = weather_codes[index] if index < len(weather_codes) else None
        forecast_days.append({
            'date': date_text,
            'temp': temp,
            'condition': OPEN_METEO_CODES.get(code, 'Weather unavailable')
        })

    location_parts = [
        place.get('name'),
        place.get('admin1'),
        place.get('country')
    ]
    code = current.get('weather_code')
    return {
        'provider': 'open-meteo',
        'location': ', '.join(filter(None, location_parts)) or city,
        'temperature': current.get('temperature_2m'),
        'condition': OPEN_METEO_CODES.get(code, 'Weather unavailable'),
        'humidity': current.get('relative_humidity_2m'),
        'wind_kph': current.get('wind_speed_10m'),
        'visibility_km': None,
        'pressure_mb': current.get('pressure_msl'),
        'aqi': None,
        'forecast': forecast_days
    }


def _safe_float(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _weather_window_summary(daily, days):
    dates = daily.get('time') or []
    precipitation = daily.get('precipitation_sum') or []
    maximums = daily.get('temperature_2m_max') or []
    minimums = daily.get('temperature_2m_min') or []
    humidities = daily.get('relative_humidity_2m_mean') or []
    start_index = max(0, len(dates) - days)
    indexes = range(start_index, len(dates))

    rainfall_values = [
        value for index in indexes
        if index < len(precipitation)
        for value in [_safe_float(precipitation[index])]
        if value is not None
    ]
    maximum_values = [
        value for index in indexes
        if index < len(maximums)
        for value in [_safe_float(maximums[index])]
        if value is not None
    ]
    minimum_values = [
        value for index in indexes
        if index < len(minimums)
        for value in [_safe_float(minimums[index])]
        if value is not None
    ]
    humidity_values = [
        value for index in indexes
        if index < len(humidities)
        for value in [_safe_float(humidities[index])]
        if value is not None
    ]
    return {
        'days': days,
        'rainfall_mm': round(sum(rainfall_values), 1),
        'max_temperature_c': round(max(maximum_values), 1) if maximum_values else None,
        'min_temperature_c': round(min(minimum_values), 1) if minimum_values else None,
        'average_humidity_percent': (
            round(sum(humidity_values) / len(humidity_values), 1)
            if humidity_values else None
        ),
        'records_used': len(list(indexes)),
    }


def _open_meteo_weather_impact(city):
    place = _open_meteo_geocode(city)
    end_date = date.today() - timedelta(days=1)
    params = urlencode({
        'latitude': place.get('latitude'),
        'longitude': place.get('longitude'),
        'daily': (
            'precipitation_sum,temperature_2m_max,temperature_2m_min,'
            'relative_humidity_2m_mean'
        ),
        'past_days': 30,
        'forecast_days': 1,
        'timezone': 'auto',
    })
    data = _fetch_json(f'https://api.open-meteo.com/v1/forecast?{params}')
    source_daily = data.get('daily') or {}
    dates = source_daily.get('time') or []
    included_indexes = [
        index for index, date_text in enumerate(dates)
        if date_text <= end_date.isoformat()
    ][-30:]
    daily = {
        key: [
            values[index] for index in included_indexes
            if index < len(values)
        ]
        for key, values in source_daily.items()
        if isinstance(values, list)
    }
    if not daily.get('time'):
        raise RuntimeError('Historical weather provider returned no daily records')

    return {
        'provider': 'open-meteo',
        'location': ', '.join(filter(None, [
            place.get('name'),
            place.get('admin1'),
            place.get('country'),
        ])) or city,
        'latitude': place.get('latitude'),
        'longitude': place.get('longitude'),
        'period_start': (daily.get('time') or [end_date.isoformat()])[0],
        'period_end': (daily.get('time') or [end_date.isoformat()])[-1],
        'windows': {
            '7_days': _weather_window_summary(daily, 7),
            '15_days': _weather_window_summary(daily, 15),
            '30_days': _weather_window_summary(daily, 30),
        },
    }


@weather_bp.route('/current', methods=['GET'])
def current_weather():
    city = (request.args.get('city') or '').strip()
    if not city:
        return jsonify({'msg': 'City is required'}), 400

    try:
        api_key = os.getenv('WEATHERAPI_KEY') or os.getenv('WEATHER_API_KEY')
        if not api_key:
            raise RuntimeError('WeatherAPI key is not configured')
        weather = _weatherapi_current_weather(city, api_key)
    except RuntimeError as primary_err:
        try:
            openweather_key = (
                os.getenv('OPENWEATHER_API_KEY') or
                os.getenv('OPENWEATHERMAP_API_KEY') or
                os.getenv('WEATHER_API_KEY') or
                os.getenv('WEATHERAPI_KEY')
            )
            if not openweather_key:
                raise RuntimeError('OpenWeatherMap key is not configured')
            weather = _openweather_current_weather(city, openweather_key)
            weather['fallback_reason'] = str(primary_err)
        except (RuntimeError, TypeError, ValueError) as secondary_err:
            try:
                weather = _open_meteo_current_weather(city)
                weather['fallback_reason'] = str(secondary_err)
                weather['primary_details'] = str(primary_err)
            except (RuntimeError, TypeError, ValueError) as fallback_err:
                return jsonify({
                    'msg': 'Weather data is unavailable for this location',
                    'details': str(fallback_err),
                    'primary_details': str(primary_err),
                    'secondary_details': str(secondary_err)
                }), 502

    try:
        if weather.get('temperature') is None:
            raise RuntimeError('Weather provider did not return a temperature')
        weather['temperature'] = round(float(weather['temperature']))
        return jsonify(weather), 200
    except (RuntimeError, TypeError, ValueError) as err:
        return jsonify({
            'msg': 'Weather data is unavailable for this location',
            'details': str(err)
        }), 502


@weather_bp.route('/impact', methods=['GET'])
def weather_impact():
    city = (request.args.get('city') or '').strip()
    if not city:
        return jsonify({'msg': 'City is required'}), 400
    try:
        return jsonify(_open_meteo_weather_impact(city)), 200
    except (RuntimeError, TypeError, ValueError) as err:
        return jsonify({
            'msg': 'Historical weather impact is unavailable for this location',
            'details': str(err),
        }), 502
