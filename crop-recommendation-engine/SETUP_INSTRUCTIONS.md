# Setup Instructions

## Complete Installation Guide

### Step 1: Prerequisites

Make sure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional)

Verify installation:
```bash
node --version
npm --version
```

### Step 2: Get API Keys

You'll need API keys from:

#### A. Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API key"
3. Copy the API key

#### B. OpenWeatherMap API
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to API keys section
4. Copy your API key

### Step 3: Backend Setup

```bash
# Navigate to backend directory
cd crop-recommendation-engine/backend

# Install dependencies
npm install

# Create .env file
# On Windows:
copy .env.example .env
# On Mac/Linux:
cp .env.example .env

# Edit .env and add your API keys
# Open .env in a text editor and replace:
# GEMINI_API_KEY=your_key_here
# WEATHER_API_KEY=your_key_here
```

**Backend .env Configuration**:
```env
PORT=5000
GEMINI_API_KEY=sk-your-gemini-key-here
OPENAI_API_KEY=sk-your-openai-key-here
WEATHER_API_KEY=your-openweather-key-here
WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
NODE_ENV=development
```

**Start Backend Server**:
```bash
npm start
```

You should see: `Server is running on port 5000`

### Step 4: Frontend Setup

Open a **NEW terminal/command prompt** and:

```bash
# Navigate to frontend directory
cd crop-recommendation-engine/frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will automatically open at `http://localhost:3000`

## Running the Application

### Terminal 1 - Backend Server
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

### Terminal 2 - Frontend Server
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

Keep both terminals open while developing.

## Verifying Setup

### Check Backend
```bash
# In a new terminal
curl http://localhost:5000/health
# Expected response: {"status":"Backend is running"}
```

### Check Frontend
Open browser and visit: `http://localhost:3000`

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
# Creates optimized build in 'build' folder
```

### Backend Production
```bash
cd backend
# Set NODE_ENV=production in .env
npm start
```

## Troubleshooting

### Issue: "Port 5000 already in use"
**Solution**: Change PORT in .env or kill process using port 5000
```bash
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### Issue: "API key invalid"
**Solution**: 
- Verify API key is copied correctly
- Check for extra spaces in .env
- Ensure API key has correct permissions

### Issue: "Cannot find module"
**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: CORS error
**Solution**: Ensure backend is running and frontend can reach it
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

### Issue: Weather data not loading
**Solution**:
- Verify OpenWeatherMap API key is active
- Check internet connection
- Use valid city names (e.g., "Delhi", not "Delhi India")

## Development Commands

### Backend
```bash
npm start          # Start server
npm run dev        # Start with auto-reload (requires nodemon)
```

### Frontend
```bash
npm start          # Start dev server
npm build          # Build for production
npm test           # Run tests
```

## Next Steps

1. ✅ Backend setup complete
2. ✅ Frontend setup complete
3. Enter your farm details in the web app
4. Get AI crop recommendations
5. Check weather conditions
6. View detailed crop information

## Support

- Check API documentation in `API_DOCUMENTATION.md`
- Review README.md for feature details
- Check console for error messages
- Ensure all ports are available

Happy Farming! 🌾
