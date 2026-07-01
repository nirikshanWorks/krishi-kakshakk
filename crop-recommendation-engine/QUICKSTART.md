# Quick Start Guide - AI Crop Recommendation Engine

## 🚀 5-Minute Quick Start

### Prerequisites
- Node.js installed ([Download](https://nodejs.org/))
- API keys from:
  - Google Gemini: https://makersuite.google.com/app/apikey
  - OpenWeatherMap: https://openweathermap.org/api

### Step 1: Backend Setup (2 minutes)
```bash
cd crop-recommendation-engine/backend
npm install
```

Create `.env` file:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_key
WEATHER_API_KEY=your_weather_key
NODE_ENV=development
```

Start backend:
```bash
npm start
```
✅ Backend running on http://localhost:5000

### Step 2: Frontend Setup (2 minutes)
Open NEW terminal:
```bash
cd crop-recommendation-engine/frontend
npm install
npm start
```
✅ Frontend opens at http://localhost:3000

### Step 3: Use the Application (1 minute)
1. Enter your location
2. Select soil type
3. Enter budget
4. Choose water availability
5. Pick current season
6. Click "Get Recommendations"

## 📋 Feature Checklist

- ✅ AI Crop Recommendations
- ✅ Weather Integration
- ✅ Real-time Weather Data
- ✅ Weather Suitability Check
- ✅ Comprehensive Crop Database
- ✅ Investment & Profit Estimates
- ✅ Risk Level Assessment
- ✅ Beautiful Responsive UI

## 📁 Project Files Overview

### Backend Files
```
backend/
├── server.js                      # Main server file
├── controllers/
│   ├── aiController.js           # Crop recommendations logic
│   └── weatherController.js      # Weather data fetching
├── routes/
│   ├── aiRoutes.js
│   ├── weatherRoutes.js
│   └── cropRoutes.js
└── package.json
```

### Frontend Files
```
frontend/
├── src/
│   ├── App.js                    # Main app component
│   ├── components/
│   │   ├── RecommendationForm.js
│   │   ├── RecommendationResults.js
│   │   └── WeatherWidget.js
│   └── api/
│       └── apiClient.js          # API calls
└── package.json
```

## 🔑 Important API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/ai/recommendations` | Get crop suggestions |
| GET | `/api/weather/current` | Get current weather |
| GET | `/api/weather/forecast` | Get 5-day forecast |
| GET | `/api/weather/suitability` | Check crop-weather match |
| GET | `/api/ai/crop/:cropName` | Get crop details |

## 🌾 Supported Crops

1. Rice - Monsoon, High water
2. Wheat - Winter, Medium water
3. Maize - Summer, Medium water
4. Sugarcane - Winter, High water
5. Cotton - Summer, Medium water
6. Groundnut - Summer, Low water
7. Soybean - Monsoon, Medium water
8. Tomato - Winter/Summer, Medium water
9. Onion - Winter, Low water
10. Potato - Winter, Medium water

## 🎯 Common Tasks

### Add New Crop
Edit `backend/controllers/aiController.js`:
```javascript
newCropName: {
  name: 'Crop Name',
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

### Change Colors
Edit CSS files (colors in RecommendationForm.css):
```css
/* Change primary color */
background: linear-gradient(135deg, #NEW_COLOR1 0%, #NEW_COLOR2 100%);
```

### Disable AI Analysis
In `aiController.js`, comment out:
```javascript
// if (process.env.GEMINI_API_KEY) {
//   aiAnalysis = await generateAIAnalysis(...)
// }
```

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| Port 5000 busy | Change PORT in `.env` |
| API keys invalid | Verify in Google/OpenWeatherMap dashboards |
| Can't connect frontend | Ensure backend is running on port 5000 |
| Weather not loading | Check internet, valid city name |
| Build errors | Delete `node_modules`, run `npm install` |

## 📚 Documentation Files

- `README.md` - Full project documentation
- `API_DOCUMENTATION.md` - Detailed API reference
- `SETUP_INSTRUCTIONS.md` - Complete setup guide
- `QUICKSTART.md` - This file

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Upload 'build' folder to hosting service
```

### Backend (Heroku/Railway/Render)
```bash
# Add to .env
NODE_ENV=production
# Deploy the 'backend' folder
```

## 💡 Tips & Tricks

1. **Test API calls** - Use Postman or curl
2. **Monitor logs** - Check browser console (F12) and terminal
3. **Real-time feedback** - Use React DevTools browser extension
4. **API testing** - Use Insomnia or REST Client VS Code extension

## 🎓 Learning Path

1. Understand the form inputs
2. Trace how data flows to backend
3. See how AI analyzes conditions
4. Check weather API integration
5. Modify crop database
6. Customize UI components
7. Deploy to production

## 📞 Need Help?

1. Check error messages in console
2. Review API_DOCUMENTATION.md
3. Verify API keys are correct
4. Ensure both servers are running
5. Check network tab (F12 → Network)

---

**Ready to revolutionize farming with AI? Start now! 🌾**
