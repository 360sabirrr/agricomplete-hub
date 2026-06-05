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

### Smart Agriculture Features
- Crop recommendation based on inputs like location, season, irrigation type, and crop history
- Weather alerts through the Flask backend weather route
- Plant disease prediction flow prepared for future ML model integration
- Live mandi price display
- Direct farmer-to-buyer marketplace
- Water and fertilizer usage guidance
- Simple chatbot for farming help

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
- Gemini API for AI chatbot responses when `GEMINI_API_KEY` is configured
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
JWT_SECRET_KEY=your_secret_key
DATABASE_URL=postgresql+psycopg2://username:password@localhost:5432/agricompletehub
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
GEMINI_FALLBACK_MODELS=gemini-2.5-flash-lite,gemini-2.0-flash,gemini-2.0-flash-lite
GEMINI_TIMEOUT_SECONDS=24
WEATHERAPI_KEY=your_weatherapi_key
OPENWEATHER_API_KEY=your_openweathermap_key
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

Render backend start command:
```bash
cd agricomplete-hub/backend && gunicorn app:app
```

Set these Render environment variables:
```env
DATABASE_URL=your_render_postgresql_external_or_internal_url
JWT_SECRET_KEY=generate_a_long_secret
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
GEMINI_FALLBACK_MODELS=gemini-2.5-flash-lite,gemini-2.0-flash,gemini-2.0-flash-lite
GEMINI_TIMEOUT_SECONDS=24
WEATHERAPI_KEY=optional_weatherapi_key
OPENWEATHER_API_KEY=optional_openweathermap_key_for_aqi
FLASK_ENV=production
FLASK_DEBUG=False
```

The frontend API URL is deployment-aware in `frontend/js/main.js`:
- local browser uses `http://localhost:5000/api`
- deployed frontend uses `https://agricomplete-backend.onrender.com/api`
- you can override it with `window.AGRICOMPLETE_API_URL` or a `<meta name="api-url">` tag

## Backend

The backend is built with Flask and handles:
- weather data requests
- crop recommendation logic
- disease prediction API integration placeholder
- login and profile data
- marketplace listings
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
