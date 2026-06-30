# AI Crop Recommendation Engine - Complete Project

## Project Overview

A full-stack web application that provides intelligent, AI-powered crop recommendations for farmers based on their specific conditions and constraints.

### What It Does

**For Farmers:**
- Get personalized crop recommendations based on location, soil, budget, and water availability
- Understand investment required and expected profit for each crop
- Assess risk levels before planting
- Check real-time weather suitability
- Receive AI expert analysis and best practices

**For Developers:**
- Learn full-stack development (React + Node.js)
- Integrate AI/ML (Google Gemini)
- Work with Weather APIs
- Understand REST APIs
- Practice responsive web design

---

## 📦 What's Included

### ✅ Complete Backend
- Express.js server with full API
- Crop recommendation algorithm
- Weather API integration
- Google Gemini AI integration
- Error handling and validation

### ✅ Complete Frontend
- React components with hooks
- Beautiful responsive UI
- Form validation
- Weather widget
- Results visualization
- Modern CSS styling

### ✅ Full Documentation
- API documentation
- Setup instructions
- Quick start guide
- Deployment guide
- Contribution guidelines

### ✅ 10+ Crops Included
- Rice, Wheat, Maize, Sugarcane
- Cotton, Groundnut, Soybean
- Tomato, Onion, Potato

Each with:
- Soil requirements
- Water needs
- Suitable seasons
- Investment costs
- Expected profits
- Risk assessment
- Harvest duration
- Temperature ranges

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js (v14+)
- API keys:
  - Google Gemini: https://makersuite.google.com/app/apikey
  - OpenWeatherMap: https://openweathermap.org/api

### Installation

**Option 1: Automated (Windows)**
```bash
install.bat
```

**Option 2: Automated (Mac/Linux)**
```bash
bash install.sh
```

**Option 3: Manual**
```bash
# Backend
cd backend
npm install
# Add .env with API keys
npm start

# In new terminal - Frontend
cd frontend
npm install
npm start
```

---

## 📚 Documentation

1. **README.md** - Comprehensive project documentation
2. **SETUP_INSTRUCTIONS.md** - Detailed setup guide
3. **QUICKSTART.md** - 5-minute quick start
4. **API_DOCUMENTATION.md** - Complete API reference
5. **DEPLOYMENT.md** - Production deployment guide
6. **CONTRIBUTING.md** - How to contribute

---

## 🏗️ Project Structure

```
crop-recommendation-engine/
├── backend/
│   ├── controllers/         # Business logic
│   ├── routes/             # API endpoints
│   ├── server.js           # Express app
│   ├── package.json        # Dependencies
│   └── .env.example        # Environment template
│
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api/            # API client
│   │   ├── App.js          # Main component
│   │   └── index.js        # Entry point
│   ├── public/             # Static files
│   └── package.json        # Dependencies
│
├── Documentation files (*.md)
├── install.bat             # Windows installer
└── install.sh              # Mac/Linux installer
```

---

## 💻 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 18.2.0 |
| Styling | CSS3 | - |
| Backend | Node.js + Express | 18.2 / 4.18 |
| AI | Google Generative AI | Latest |
| Weather | OpenWeatherMap API | - |
| HTTP | Axios | 1.6.0 |
| Environment | dotenv | 16.3.1 |

---

## 🔑 Features

### Crop Recommendation Algorithm
```
Score = (Soil Match × 30%) + (Season Match × 25%) + 
        (Water Match × 25%) + (Budget × 20%)
```

### Recommendation Details
- ✅ Best crop matches
- ✅ Expected investment
- ✅ Expected profit
- ✅ Risk level (Low/Medium/High)
- ✅ Harvest duration
- ✅ Reasons for recommendation

### Weather Integration
- ✅ Current weather conditions
- ✅ 5-day forecast
- ✅ Crop-weather suitability scoring
- ✅ Temperature and humidity checks
- ✅ Rainfall monitoring

### AI Features
- ✅ Gemini AI analysis
- ✅ Customized recommendations
- ✅ Risk assessment
- ✅ Best practices guidance
- ✅ Planting timeline

---

## 📊 API Endpoints

### AI Recommendations
```
POST /api/ai/recommendations
Body: { location, soilType, budget, waterAvailability, season }
Returns: Top 5 crops with scores and AI analysis
```

### Weather
```
GET /api/weather/current?location=city
GET /api/weather/forecast?location=city
GET /api/weather/suitability?location=city&cropName=crop
```

### Crop Details
```
GET /api/ai/crop/{cropName}
GET /api/crops
```

---

## 🎨 User Interface

### Main Form
- Location input
- Soil type selector (5 options)
- Budget input
- Water availability selector
- Season selector
- Submit button

### Results Display
- Ranked crop recommendations (1-5)
- Expandable crop cards
- Investment & profit details
- Risk levels
- Match reasons
- AI expert analysis

### Weather Widget
- Location search
- Real-time weather data
- Temperature, humidity, rainfall
- Wind speed and visibility

---

## 🔧 Configuration

### Backend .env
```env
PORT=5000
GEMINI_API_KEY=your_key
WEATHER_API_KEY=your_key
NODE_ENV=development
```

### Frontend .env (optional)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🌾 Crop Database Sample

```javascript
rice: {
  name: 'Rice',
  soilTypes: ['clayey', 'loamy'],
  waterNeeded: 'high',
  season: ['monsoon', 'winter'],
  averageInvestment: 30000,
  expectedProfit: 50000,
  riskLevel: 'medium',
  harvestDuration: '120-150 days',
  minTemperature: 20,
  maxTemperature: 30
}
```

---

## 📱 Responsive Design

- ✅ Mobile-friendly
- ✅ Tablet optimized
- ✅ Desktop full-featured
- ✅ Touch-friendly buttons
- ✅ Readable on all devices

---

## 🚀 Deployment Options

### Frontend
- **Vercel** - Recommended for React
- **Netlify** - Alternative
- **GitHub Pages** - Free option

### Backend
- **Heroku** - Easy deployment
- **Railway.app** - Modern alternative
- **Render** - Another option
- **AWS/GCP/Azure** - Enterprise option

See DEPLOYMENT.md for detailed instructions.

---

## 🤖 AI Integration

### Google Gemini AI
Provides:
- Detailed farming condition analysis
- Personalized recommendations
- Risk factor assessment
- Best farming practices
- Planting/harvesting guidelines

To enable: Add GEMINI_API_KEY to .env

### Fallback Mode
Works without AI (recommendations still provided)

---

## 🌤️ Weather API

### OpenWeatherMap Integration
Provides:
- Real-time weather
- 5-day forecast
- Temperature ranges
- Humidity levels
- Wind data
- Rainfall tracking

Free tier available with API key.

---

## 🧪 Testing

### Test with Postman
- Import API endpoints
- Test with sample data
- Verify responses

### Browser Testing
- Check F12 console for errors
- Verify network requests
- Test responsive design

### API Testing Sample
```bash
curl -X POST http://localhost:5000/api/ai/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "location": "Delhi",
    "soilType": "loamy",
    "budget": 50000,
    "waterAvailability": "medium",
    "season": "monsoon"
  }'
```

---

## 📈 Future Enhancements

- [ ] User authentication
- [ ] Save recommendations
- [ ] Mobile app (React Native)
- [ ] Machine learning model
- [ ] Soil testing results input
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Push notifications
- [ ] Historical data analysis
- [ ] Community forum

---

## 🔒 Security

Current implementation:
- Input validation
- Error handling
- Environment variables
- CORS configuration

Production improvements:
- Authentication (JWT)
- Rate limiting
- Input sanitization
- HTTPS only
- Database encryption

---

## 📞 Support & Help

1. **Check Documentation** - README.md, SETUP_INSTRUCTIONS.md
2. **API Reference** - API_DOCUMENTATION.md
3. **Quick Fix** - QUICKSTART.md
4. **Browser Console** - F12 for errors
5. **Terminal Output** - Check server logs

---

---

## 📝 License

This project is open-source. Free to use for educational and commercial purposes.

---

## 🙏 Credits

- React team for amazing framework
- Express.js community
- Google Generative AI
- OpenWeatherMap API
- Agriculture experts who provided crop data

---

## 🌾 Start Farming Smart!

**Transform agriculture with AI-powered recommendations.**

```
1. Get API keys
2. Run install script
3. Add API keys to .env
4. Start servers
5. Open browser
6. Enter your details
7. Get recommendations
```

---

**Happy Farming! 🌾**
