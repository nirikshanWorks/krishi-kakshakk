const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Get current weather for a location
router.get('/current', weatherController.getWeatherByLocation);

// Get weather forecast
router.get('/forecast', weatherController.getWeatherForecast);

// Get weather suitability for a crop
router.get('/suitability', weatherController.getWeatherSuitability);

module.exports = router;
