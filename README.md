# AgriComplete Hub 🌿

AgriComplete Hub is a smart agriculture platform built to help farmers make better farming decisions in one simple place.  
It provides crop recommendation, weather forecasting, plant disease detection, mandi price tracking, direct farmer-to-buyer connections, water and fertilizer guidance, login/profile support, AI chatbot help, and multilingual support.

## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Weather API](#weather-api)
- [Backend](#backend)
- [Database](#database)
- [Future Improvements](#future-improvements)
- [License](#license)

## About

AgriComplete Hub is a hackathon-ready smart farming web application designed for real farmers.  
The UI is simple, modern, and mobile-friendly so that farmers can use it easily on both desktop and mobile devices.

This project focuses on practical agricultural support:
- Better crop planning
- Weather-based alerts
- Disease detection assistance
- Market price visibility
- Direct buyer connections
- Resource-saving advice
- Verifiable crop-loss evidence reports

## Features

### Frontend
- Modern landing page
- Farmer login and profile pages
- Personalized dashboard
- Crop recommendation page
- Weather forecast page
- Disease detection page
- Mandi price page
- Marketplace page
- Water and fertilizer guidance
- AI chatbot interface
- Multi-language support
- CropShield crop-insurance evidence reports with 72-hour loss-intimation checks,
  claim-readiness checklists, 7/15/30-day weather impact analysis, photographic
  evidence, farmer signatures/thumb impressions, and QR verification

### Smart Agriculture Features
- Crop recommendation based on inputs like location, season, irrigation type, and crop history
- Weather alerts through the Flask backend weather route
- Plant disease prediction flow prepared for future ML model integration
- Live mandi price display
- Direct farmer-to-buyer marketplace
- Water and fertilizer usage guidance
- Simple chatbot for farming help
- Before/after crop evidence, transparent loss estimates, case status tracking, and public report verification

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Flask

### Database
- PostgreSQL

### APIs
- OpenRouter API for AI chatbot responses when `OPENROUTER_API_KEY` is configured
- WeatherAPI.com for weather pages when `WEATHERAPI_KEY` is configured
- OpenWeatherMap for weather page AQI/weather fallback when `OPENWEATHER_API_KEY` is configured
- Open-Meteo as a no-key weather page fallback without AQI

### Planned ML Module
- Crop disease prediction model using a real-world dataset



## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/agricomplete-hub.git
cd agricomplete-hub
```

### 2. Open frontend
Open the `frontend/index.html` file in your browser.

If you are using a local server, you can use:
```bash
cd frontend
python -m http.server 5500
```

Then open:
```bash
http://localhost:5500
```

### 3. Install backend dependencies
```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

**Windows**
```bash
venv\Scripts\activate
```

**Mac/Linux**
```bash
source venv/bin/activate
```

Install packages:
```bash
pip install -r requirements.txt
```

### 4. Run Flask backend
```bash
python app.py
```

## Environment Variables

Create a `.env` file in the root or backend folder.

```env
# Generate with: python -c "import secrets; print(secrets.token_urlsafe(48))"
JWT_SECRET_KEY=replace_with_a_unique_random_value_of_at_least_32_characters
JWT_ACCESS_TOKEN_MINUTES=60
DATABASE_URL=postgresql+psycopg2://username:password@localhost:5432/agricompletehub
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openrouter/auto
OPENROUTER_FALLBACK_MODELS=
OPENROUTER_TIMEOUT_SECONDS=24
WEATHERAPI_KEY=your_weatherapi_key
OPENWEATHER_API_KEY=your_openweathermap_key
EMAIL_DELIVERY_PROVIDER=gmail_api
GMAIL_API_CLIENT_ID=your_google_oauth_client_id
GMAIL_API_CLIENT_SECRET=your_google_oauth_client_secret
GMAIL_API_REFRESH_TOKEN=your_google_oauth_refresh_token
GMAIL_API_FROM=your_gmail_address
GMAIL_API_FROM_NAME=AgriComplete Hub
GMAIL_API_TIMEOUT_SECONDS=15
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USERNAME=your_email@example.com
SMTP_PASSWORD=your_email_app_password
SMTP_FROM=your_email@example.com
SMTP_FROM_NAME=AgriComplete Hub
SMTP_USE_TLS=false
SMTP_USE_SSL=true
PASSWORD_RESET_TOKEN_MINUTES=15
CROPSHIELD_VERIFY_BASE_URL=https://agricomplete-frontend.onrender.com
FLASK_ENV=development
FLASK_DEBUG=True
```

## Weather API

This project uses the backend weather route for dashboard weather data. The frontend should call the backend, not a weather provider directly.

Provider order:
- WeatherAPI.com when `WEATHERAPI_KEY` is valid
- OpenWeatherMap when `OPENWEATHER_API_KEY` is valid, including AQI
- Open-Meteo fallback when no key works, but AQI may be unavailable

Example endpoint:
```bash
http://localhost:5000/api/weather/current?city=Pune
```

Weather data is used for:
- current forecast
- rain alerts
- temperature updates
- humidity details
- wind warnings
- AQI labels: Good, Fair, Bad, Dangerous

## Deployment Notes

This repo includes a `render.yaml` Blueprint for deploying the Flask backend, static frontend, and a Render Postgres database together.

Render start command:
```bash
cd agricomplete-hub/backend && gunicorn --workers 1 --timeout 300 app:app
```

When creating the Blueprint, Render provisions the Postgres database and injects `DATABASE_URL` automatically. Enter values for the secrets Render prompts for:
```env
OPENROUTER_API_KEY=your_openrouter_api_key
WEATHERAPI_KEY=optional_weatherapi_key
OPENWEATHER_API_KEY=optional_openweathermap_key_for_aqi
EMAIL_DELIVERY_PROVIDER=gmail_api
GMAIL_API_CLIENT_ID=your_google_oauth_client_id
GMAIL_API_CLIENT_SECRET=your_google_oauth_client_secret
GMAIL_API_REFRESH_TOKEN=your_google_oauth_refresh_token
GMAIL_API_FROM=your_gmail_address
GMAIL_API_FROM_NAME=AgriComplete Hub
GMAIL_API_TIMEOUT_SECONDS=15
CROPSHIELD_VERIFY_BASE_URL=https://agricomplete-frontend.onrender.com
```

The frontend API URL is deployment-aware in `frontend/js/main.js`:
- local browser uses `http://localhost:5000/api`
- deployed frontend uses the current service origin plus `/api`
- you can override it with `window.AGRICOMPLETE_API_URL` or a `<meta name="api-url">` tag

For password reset email on Render, use the Gmail API provider. It sends over HTTPS and does not depend on SMTP ports. Enable the Gmail API, create a Google OAuth desktop client, set `GMAIL_API_CLIENT_ID` and `GMAIL_API_CLIENT_SECRET` locally, then run:

```bash
cd agricomplete-hub/backend
python gmail_oauth_setup.py
```

Authorize the same mailbox used by `GMAIL_API_FROM`, then store the generated refresh token only in Render.
For long-running deployment, publish the OAuth consent configuration to Production; Google refresh tokens for external apps left in Testing expire after seven days.

## Backend

The backend is built with Flask and handles:
- weather data requests
- crop recommendation logic
- disease prediction API integration placeholder
- login and profile data
- marketplace listings
- CropShield insurance evidence cases, public verification, and formal PDF reports
- chatbot responses
- PostgreSQL database operations

## Database

PostgreSQL will be used to store:
- user details
- profiles
- crop recommendations
- weather logs
- marketplace listings
- buyer inquiries
- disease reports
- chatbot history

## Future Improvements

- Train and deploy the crop disease prediction model
- Better chatbot with AI responses
- Buyer and farmer chat system
- Map-based nearby buyer discovery
- Dashboard analytics charts
