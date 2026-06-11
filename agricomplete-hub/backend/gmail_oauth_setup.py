import json
import os
import secrets
import threading
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.error import HTTPError
from urllib.parse import parse_qs, urlencode, urlparse
from urllib.request import Request, urlopen


AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
TOKEN_URL = 'https://oauth2.googleapis.com/token'
SCOPE = 'https://www.googleapis.com/auth/gmail.send'
REDIRECT_URI = 'http://127.0.0.1:8765'


class OAuthCallbackHandler(BaseHTTPRequestHandler):
    result = {}

    def do_GET(self):
        query = parse_qs(urlparse(self.path).query)
        self.result.update({
            'code': query.get('code', [''])[0],
            'state': query.get('state', [''])[0],
            'error': query.get('error', [''])[0],
        })
        body = (
            '<h2>Google authorization received.</h2>'
            '<p>You can close this tab and return to the terminal.</p>'
        )
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(body.encode('utf-8'))))
        self.end_headers()
        self.wfile.write(body.encode('utf-8'))

    def log_message(self, *_):
        return


def main():
    client_id = os.getenv('GMAIL_API_CLIENT_ID', '').strip()
    client_secret = os.getenv('GMAIL_API_CLIENT_SECRET', '').strip()
    if not client_id or not client_secret:
        raise SystemExit(
            'Set GMAIL_API_CLIENT_ID and GMAIL_API_CLIENT_SECRET in your terminal first.'
        )

    state = secrets.token_urlsafe(24)
    authorization_url = f'{AUTH_URL}?{urlencode({
        "client_id": client_id,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": SCOPE,
        "access_type": "offline",
        "prompt": "consent",
        "state": state,
    })}'

    server = HTTPServer(('127.0.0.1', 8765), OAuthCallbackHandler)
    server.timeout = 180
    print('Opening Google authorization in your browser...')
    print(authorization_url)
    threading.Timer(0.5, webbrowser.open, args=(authorization_url,)).start()
    server.handle_request()
    server.server_close()

    result = OAuthCallbackHandler.result
    if result.get('error'):
        raise SystemExit(f'Google authorization failed: {result["error"]}')
    if not result.get('code') or result.get('state') != state:
        raise SystemExit('Google authorization did not return a valid code.')

    token_request = Request(
        TOKEN_URL,
        data=urlencode({
            'client_id': client_id,
            'client_secret': client_secret,
            'code': result['code'],
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
        }).encode('utf-8'),
        headers={'Content-Type': 'application/x-www-form-urlencoded'},
        method='POST'
    )
    try:
        with urlopen(token_request, timeout=30) as response:
            token_payload = json.loads(response.read().decode('utf-8'))
    except HTTPError as err:
        try:
            detail = json.loads(err.read().decode('utf-8'))
        except (UnicodeDecodeError, json.JSONDecodeError):
            detail = {'error': f'HTTP {err.code}'}
        raise SystemExit(f'Google token exchange failed: {detail}') from err

    refresh_token = token_payload.get('refresh_token')
    if not refresh_token:
        raise SystemExit(
            'Google did not return a refresh token. Revoke the app authorization and run again.'
        )

    verify_request = Request(
        TOKEN_URL,
        data=urlencode({
            'client_id': client_id,
            'client_secret': client_secret,
            'refresh_token': refresh_token,
            'grant_type': 'refresh_token',
        }).encode('utf-8'),
        headers={'Content-Type': 'application/x-www-form-urlencoded'},
        method='POST'
    )
    try:
        with urlopen(verify_request, timeout=30) as response:
            verify_payload = json.loads(response.read().decode('utf-8'))
    except HTTPError as err:
        raise SystemExit(
            'Google created the refresh token but could not verify it. Run the setup again.'
        ) from err
    if not verify_payload.get('access_token'):
        raise SystemExit('Google did not validate the generated refresh token.')

    print('\nRefresh token verified successfully.')
    print('\nAdd this secret to Render. Do not commit or share it:')
    print(f'GMAIL_API_REFRESH_TOKEN={refresh_token}')


if __name__ == '__main__':
    main()
