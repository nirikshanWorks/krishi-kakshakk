const express = require('express');
const router = express.Router();

// Simple crop recommendations endpoint
router.get('/', (req, res) => {
  const crops = [
    { id: 1, name: 'Rice', season: 'monsoon' },
    { id: 2, name: 'Wheat', season: 'winter' },
    { id: 3, name: 'Maize', season: 'summer' },
    { id: 4, name: 'Cotton', season: 'monsoon' },
    { id: 5, name: 'Sugarcane', season: 'winter' }
  ];
  res.json({ success: true, crops });
});

router.get('/:cropName', (req, res) => {
  const { cropName } = req.params;
  res.json({ 
    success: true, 
    crop: { 
      name: cropName,
      message: 'Use /api/ai/recommendations for detailed crop recommendations'
    } 
  });
});

module.exports = router;
