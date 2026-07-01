import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const cropAPI = {
  // Get crop recommendations
  getRecommendations: (formData) => 
    apiClient.post('/ai/recommendations', formData),

  // Get crop details
  getCropDetails: (cropName) =>
    apiClient.get(`/ai/crop/${cropName}`),

  // Get all crops
  getAllCrops: () =>
    apiClient.get('/crops')
};

export const weatherAPI = {
  // Get current weather
  getCurrentWeather: (location) =>
    apiClient.get('/weather/current', { params: { location } }),

  // Get weather forecast
  getForecast: (location) =>
    apiClient.get('/weather/forecast', { params: { location } }),

  // Get weather suitability for a crop
  getWeatherSuitability: (location, cropName) =>
    apiClient.get('/weather/suitability', { 
      params: { location, cropName } 
    })
};

export default apiClient;
