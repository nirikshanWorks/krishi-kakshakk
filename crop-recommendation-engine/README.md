# Crop Recommendation Engine

A full-stack application that provides intelligent crop recommendations for farmers based on their location, soil type, budget, water availability, and current season.

## 🌟 Features

- **Crop recommendations**: Uses Google Gemini for optional analysis and suggestions
- **Weather Integration**: Fetches real-time weather data from OpenWeather API
- **Comprehensive Crop Database**: Information on 10+ crops with investment and profit predictions
- **Weather Suitability Analysis**: Checks if weather conditions are suitable for specific crops
- **Responsive UI**: Beautiful, mobile-friendly interface built with React

## 🏗️ Project Structure

```
crop-recommendation-engine/
├── backend/
│   ├── controllers/
│   │   ├── aiController.js          # Recommendations logic
│   │   └── weatherController.js     # Weather API integration
│   ├── routes/
│   │   ├── aiRoutes.js              # Recommendation endpoints
│   │   ├── weatherRoutes.js         # Weather endpoints
│   │   └── cropRoutes.js            # Crop endpoints
│   ├── server.js                    # Express server setup
│   ├── package.json
│   └── .env.example                 # Environment variables template
│
├── frontend/
│   ├── public/
│   │   └── index.html               # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── RecommendationForm.js       # Input form component
│   │   │   ├── RecommendationForm.css      # Form styling
│   │   │   ├── RecommendationResults.js    # Results display
│   │   │   ├── RecommendationResults.css   # Results styling
│   │   │   ├── WeatherWidget.js            # Weather widget
│   │   │   └── WeatherWidget.css           # Widget styling
│   │   ├── api/
│   │   │   └── apiClient.js         # API client setup
│   │   ├── App.js                   # Main app component
│   │   ├── App.css                  # App styling
│   │   ├── index.js                 # React entry point
│   │   └── index.css                # Global styles
│   └── package.json
│
└── README.md                         # This file
```

## 📋 Tech Stack

- **Frontend**: React 18.2.0, CSS3
- **Backend**: Node.js, Express.js
- **Generative integration**: Google Generative AI (Gemini)
- **Weather API**: OpenWeatherMap
- **HTTP Client**: Axios
- **Environment**: dotenv

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- API Keys:
  - Google Gemini API key
  - OpenWeather API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
WEATHER_API_KEY=your_openweather_api_key_here
WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
NODE_ENV=development
```

5. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 🔌 API Endpoints

### Recommendations
- **POST** `/api/ai/recommendations`
  - Body: `{ location, soilType, budget, waterAvailability, season }`
  - Returns: Crop recommendations (analysis optional)

- **GET** `/api/ai/crop/:cropName`
  - Returns: Detailed information about a specific crop

### Weather
- **GET** `/api/weather/current?location=city`
  - Returns: Current weather data for a location

- **GET** `/api/weather/forecast?location=city`
  - Returns: 5-day weather forecast

- **GET** `/api/weather/suitability?location=city&cropName=crop`
  - Returns: Weather suitability score for a crop

### Crops
- **GET** `/api/crops`
  - Returns: List of all available crops

## 💡 Crop Database

The engine recommends from 10 major crops:
- Rice
- Wheat
- Maize
- Sugarcane
- Cotton
- Groundnut
- Soybean
- Tomato
- Onion
- Potato

Each crop includes:
- Suitable soil types
- Water requirements
- Growing season
- Investment cost
- Expected profit
- Risk level
- Harvest duration
- Temperature range

## Analysis features

The Gemini service provides (optional):
- Detailed analysis of farming conditions
- Recommendation justification
- Risk assessment
- Best practices
- Planting and harvesting timeline

## 🌤️ Weather Integration

Real-time weather data including:
- Current temperature
- Humidity
- Rainfall
- Wind speed
- Visibility
- Sunrise/sunset times
- 5-day forecast

## 📱 Usage Example

1. **Enter Location**: Select your city (e.g., "Delhi", "Mumbai")
2. **Select Soil Type**: Choose from loamy, clayey, sandy-loam, etc.
3. **Enter Budget**: Investment amount in rupees
4. **Water Availability**: Select low, medium, or high
5. **Choose Season**: Monsoon, Winter, Summer, or Spring
6. **Get Recommendations**: Receive AI-powered crop suggestions
7. **Check Weather**: Verify current weather conditions for your location

## 🔒 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
GEMINI_API_KEY=sk-...
OPENAI_API_KEY=sk-...
WEATHER_API_KEY=your_key
WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
NODE_ENV=development
```

## 📊 Recommendation Algorithm

The system uses a scoring mechanism:
- **Soil type match**: +30 points
- **Season compatibility**: +25 points
- **Water availability match**: +25 points
- **Budget sufficiency**: +20 points

Crops with a score ≥ 40 are recommended, sorted by score descending.

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is already in use
- Verify `.env` file exists and has correct API keys
- Run `npm install` to ensure dependencies are installed

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in `server.js`
- Verify proxy setting in `package.json`

### Weather data not showing
- Verify OpenWeather API key is valid
- Check internet connection
- Location name must be valid city name

### AI Analysis not generating
- Verify Gemini API key is correct and has quota
- Check if Google Generative AI is available in your region

## 🎨 Customization

### Add New Crops
Edit `backend/controllers/aiController.js` and add to `cropDatabase` object:

```javascript
newCrop: {
  name: 'New Crop',
  soilTypes: ['loamy'],
  waterNeeded: 'medium',
  season: ['monsoon'],
  averageInvestment: 25000,
  expectedProfit: 50000,
  riskLevel: 'low',
  harvestDuration: '120 days',
  minTemperature: 15,
  maxTemperature: 30
}
```

### Modify Scoring Algorithm
Update the scoring logic in `getRecommendations` function in `aiController.js`

### Change UI Theme
Modify color values in CSS files, especially:
- `RecommendationForm.css`
- `App.css`

## 📝 Notes

- The weather API requires an active internet connection
- Gemini AI requires valid API quota
- Recommendations are based on predefined crop database
- For production, implement proper error handling and logging

## 📄 License

This project is open-source and available for educational and commercial use.

## 🤝 Support

For issues or suggestions, please contact the development team.

---

**Happy Farming! 🌾**
