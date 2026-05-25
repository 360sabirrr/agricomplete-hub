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
- Weather alerts using WeatherAPI
- Plant disease prediction UI for future ML integration
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

### API
- WeatherAPI

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
SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://username:password@localhost:5432/agricompletehub
WEATHER_API_KEY=your_weatherapi_key
FLASK_ENV=development
```

## Weather API ( Temporary ) 

This project uses WeatherAPI to show weather forecasts and alerts.

Example endpoint:
```bash
https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=London&days=1&aqi=no&alerts=no
```

Weather data is used for:
- current forecast
- rain alerts
- temperature updates
- humidity details
- wind warnings

## Backend

The backend will be built with Flask and will handle:
- weather data requests
- crop recommendation logic
- disease prediction API integration
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

- Better chatbot with AI responses
- Buyer and farmer chat system
- Map-based nearby buyer discovery
- Dashboard analytics charts
