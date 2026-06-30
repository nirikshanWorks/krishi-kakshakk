const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Get crop recommendations based on farmer's conditions
router.post('/recommendations', aiController.getRecommendations);

// Get detailed information about a specific crop
router.get('/crop/:cropName', aiController.getCropDetails);

module.exports = router;
