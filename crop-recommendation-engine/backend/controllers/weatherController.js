const axios = require('axios');

const weatherAPI = axios.create({
  baseURL: process.env.WEATHER_API_BASE_URL || 'https://api.openweathermap.org/data/2.5',
  timeout: 5000
});

// Get weather data for a location
const getWeatherByLocation = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    if (!process.env.WEATHER_API_KEY) {
      return res.status(500).json({ error: 'Weather API key not configured' });
    }

    // Fetch weather data
    const response = await weatherAPI.get('/weather', {
      params: {
        q: location,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric'
      }
    });

    const weatherData = response.data;

    res.json({
      success: true,
      weather: {
        location: `${weatherData.name}, ${weatherData.sys.country}`,
        temperature: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        minTemp: weatherData.main.temp_min,
        maxTemp: weatherData.main.temp_max,
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        windSpeed: weatherData.wind.speed,
        description: weatherData.weather[0].description,
        cloudiness: weatherData.clouds.all,
        rainfall: weatherData.rain ? weatherData.rain['1h'] : 0,
        visibility: weatherData.visibility,
        sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()
      }
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Location not found' });
    }
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

// Get 5-day weather forecast
const getWeatherForecast = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    if (!process.env.WEATHER_API_KEY) {
      return res.status(500).json({ error: 'Weather API key not configured' });
    }

    // Fetch forecast data
    const response = await weatherAPI.get('/forecast', {
      params: {
        q: location,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric'
      }
    });

    const forecastData = response.data;
    const forecasts = forecastData.list.slice(0, 40); // 5 days of 3-hour forecasts

    const processedForecasts = forecasts.map(forecast => ({
      dateTime: new Date(forecast.dt * 1000).toLocaleString(),
      timestamp: forecast.dt,
      temperature: forecast.main.temp,
      feelsLike: forecast.main.feels_like,
      humidity: forecast.main.humidity,
      description: forecast.weather[0].description,
      windSpeed: forecast.wind.speed,
      rainfall: forecast.rain ? forecast.rain['3h'] : 0,
      cloudiness: forecast.clouds.all
    }));

    res.json({
      success: true,
      location: `${forecastData.city.name}, ${forecastData.city.country}`,
      forecast: processedForecasts
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Location not found' });
    }
    console.error('Error fetching forecast:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather forecast' });
  }
};

// Get weather suitability for a crop
const getWeatherSuitability = async (req, res) => {
  try {
    const { location, cropName } = req.query;

    if (!location || !cropName) {
      return res.status(400).json({ error: 'Location and cropName are required' });
    }

    if (!process.env.WEATHER_API_KEY) {
      return res.status(500).json({ error: 'Weather API key not configured' });
    }

    // Crop temperature requirements
    const cropRequirements = {
      rice: { min: 20, max: 30, preferredRainfall: 150, description: 'High water requirement' },
      wheat: { min: 10, max: 25, preferredRainfall: 50, description: 'Low water requirement' },
      maize: { min: 18, max: 28, preferredRainfall: 60, description: 'Medium water requirement' },
      sugarcane: { min: 20, max: 30, preferredRainfall: 150, description: 'High water requirement' },
      cotton: { min: 21, max: 30, preferredRainfall: 50, description: 'Medium water requirement' },
      groundnut: { min: 20, max: 30, preferredRainfall: 50, description: 'Low water requirement' },
      soybean: { min: 20, max: 30, preferredRainfall: 60, description: 'Medium water requirement' },
      tomato: { min: 21, max: 32, preferredRainfall: 60, description: 'Medium water requirement' },
      onion: { min: 13, max: 24, preferredRainfall: 50, description: 'Low water requirement' },
      potato: { min: 10, max: 20, preferredRainfall: 50, description: 'Medium water requirement' }
    };

    // Fetch weather data
    const response = await weatherAPI.get('/weather', {
      params: {
        q: location,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric'
      }
    });

    const weatherData = response.data;
    const crop = cropRequirements[cropName.toLowerCase()];

    if (!crop) {
      return res.status(404).json({ error: 'Crop not found in database' });
    }

    const currentTemp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const rainfall = weatherData.rain ? weatherData.rain['1h'] : 0;

    // Calculate suitability score
    let suitabilityScore = 100;
    const issues = [];

    if (currentTemp < crop.min || currentTemp > crop.max) {
      suitabilityScore -= 25;
      issues.push(`Temperature ${currentTemp}°C is outside ideal range (${crop.min}°C - ${crop.max}°C)`);
    }

    if (humidity < 30 || humidity > 90) {
      suitabilityScore -= 15;
      issues.push(`Humidity ${humidity}% is not ideal`);
    }

    res.json({
      success: true,
      suitability: {
        cropName,
        location: `${weatherData.name}, ${weatherData.sys.country}`,
        currentWeather: {
          temperature: currentTemp,
          humidity,
          rainfall,
          description: weatherData.weather[0].description
        },
        cropRequirements: crop,
        suitabilityScore: Math.max(0, suitabilityScore),
        suitabilityLevel: suitabilityScore >= 75 ? 'Excellent' : suitabilityScore >= 50 ? 'Good' : suitabilityScore >= 25 ? 'Fair' : 'Poor',
        issues,
        recommendation: suitabilityScore >= 75 ? 'Ideal conditions for planting' : 
                       suitabilityScore >= 50 ? 'Acceptable conditions, monitor weather' : 
                       'Not suitable, wait for better conditions'
      }
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Location not found' });
    }
    console.error('Error calculating suitability:', error.message);
    res.status(500).json({ error: 'Failed to calculate weather suitability' });
  }
};

module.exports = {
  getWeatherByLocation,
  getWeatherForecast,
  getWeatherSuitability
};
