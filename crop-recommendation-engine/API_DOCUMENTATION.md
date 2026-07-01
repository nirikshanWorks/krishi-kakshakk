# Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### 1. Get Crop Recommendations

**Endpoint**: `POST /ai/recommendations`

**Description**: Get crop recommendations based on farmer's conditions

**Request Body**:
```json
{
  "location": "Delhi",
  "soilType": "loamy",
  "budget": 50000,
  "waterAvailability": "medium",
  "season": "monsoon"
}
```

**Response**:
```json
{
  "success": true,
  "recommendations": [
    {
      "name": "Rice",
      "soilTypes": ["clayey", "loamy"],
      "waterNeeded": "high",
      "season": ["monsoon", "winter"],
      "averageInvestment": 30000,
      "expectedProfit": 50000,
      "riskLevel": "medium",
      "harvestDuration": "120-150 days",
      "minTemperature": 20,
      "maxTemperature": 30,
      "score": 95,
      "matchReasons": [
        "Soil type compatible",
        "Season appropriate",
        "Water availability matched",
        "Budget sufficient"
      ]
    }
  ],
  "aiAnalysis": {
    "analysis": "Based on your conditions...",
    "generatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

---

### 2. Get Crop Details

**Endpoint**: `GET /ai/crop/{cropName}`

**Description**: Get detailed information about a specific crop

**Parameters**:
- `cropName` (path): Name of the crop (e.g., "rice", "wheat")

**Response**:
```json
{
  "success": true,
  "crop": {
    "name": "Rice",
    "soilTypes": ["clayey", "loamy"],
    "waterNeeded": "high",
    "season": ["monsoon", "winter"],
    "averageInvestment": 30000,
    "expectedProfit": 50000,
    "riskLevel": "medium",
    "harvestDuration": "120-150 days",
    "minTemperature": 20,
    "maxTemperature": 30,
    "tips": [
      { "tip": "Maintain proper water level..." },
      { "tip": "Use quality seeds..." }
    ]
  }
}
```

---

### 3. Get Current Weather

**Endpoint**: `GET /weather/current`

**Description**: Get current weather data for a location

**Query Parameters**:
- `location` (required): City name or location

**Response**:
```json
{
  "success": true,
  "weather": {
    "location": "Delhi, IN",
    "temperature": 28.5,
    "feelsLike": 32.1,
    "minTemp": 25.0,
    "maxTemp": 30.5,
    "humidity": 65,
    "pressure": 1013,
    "windSpeed": 5.2,
    "description": "partly cloudy",
    "cloudiness": 40,
    "rainfall": 0,
    "visibility": 10000,
    "sunrise": "6:30:00 AM",
    "sunset": "6:45:00 PM"
  }
}
```

---

### 4. Get Weather Forecast

**Endpoint**: `GET /weather/forecast`

**Description**: Get 5-day weather forecast for a location

**Query Parameters**:
- `location` (required): City name or location

**Response**:
```json
{
  "success": true,
  "location": "Delhi, IN",
  "forecast": [
    {
      "dateTime": "1/1/2024, 3:00:00 PM",
      "timestamp": 1704110400,
      "temperature": 28.5,
      "feelsLike": 32.1,
      "humidity": 65,
      "description": "partly cloudy",
      "windSpeed": 5.2,
      "rainfall": 0,
      "cloudiness": 40
    }
  ]
}
```

---

### 5. Get Weather Suitability for Crop

**Endpoint**: `GET /weather/suitability`

**Description**: Check if current weather is suitable for growing a specific crop

**Query Parameters**:
- `location` (required): City name
- `cropName` (required): Name of the crop

**Response**:
```json
{
  "success": true,
  "suitability": {
    "cropName": "rice",
    "location": "Delhi, IN",
    "currentWeather": {
      "temperature": 28.5,
      "humidity": 65,
      "rainfall": 0,
      "description": "partly cloudy"
    },
    "cropRequirements": {
      "min": 20,
      "max": 30,
      "preferredRainfall": 150,
      "description": "High water requirement"
    },
    "suitabilityScore": 85,
    "suitabilityLevel": "Excellent",
    "issues": [],
    "recommendation": "Ideal conditions for planting"
  }
}
```

---

### 6. Get All Crops

**Endpoint**: `GET /crops`

**Description**: Get list of all available crops

**Response**:
```json
{
  "success": true,
  "crops": [
    { "id": 1, "name": "Rice", "season": "monsoon" },
    { "id": 2, "name": "Wheat", "season": "winter" },
    { "id": 3, "name": "Maize", "season": "summer" }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "All fields are required: location, soilType, budget, waterAvailability, season"
}
```

### 404 Not Found
```json
{
  "error": "Crop not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Detailed error message here"
}
```

---

## Request/Response Formats

All requests and responses use **JSON** format with `Content-Type: application/json`

## CORS

Backend supports CORS for requests from frontend (default: http://localhost:3000)

## Rate Limiting

No rate limiting currently implemented. Consider adding for production.

## Authentication

Currently no authentication required. Add JWT or API keys for production use.
