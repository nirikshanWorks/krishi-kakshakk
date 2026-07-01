const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Crop database with characteristics
const cropDatabase = {
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
  },
  wheat: {
    name: 'Wheat',
    soilTypes: ['loamy', 'clayey'],
    waterNeeded: 'medium',
    season: ['winter', 'spring'],
    averageInvestment: 25000,
    expectedProfit: 45000,
    riskLevel: 'low',
    harvestDuration: '120-140 days',
    minTemperature: 10,
    maxTemperature: 25
  },
  maize: {
    name: 'Maize (Corn)',
    soilTypes: ['loamy', 'sandy-loam'],
    waterNeeded: 'medium',
    season: ['summer', 'monsoon'],
    averageInvestment: 20000,
    expectedProfit: 40000,
    riskLevel: 'low',
    harvestDuration: '100-120 days',
    minTemperature: 18,
    maxTemperature: 28
  },
  sugarcane: {
    name: 'Sugarcane',
    soilTypes: ['loamy', 'sandy-loam'],
    waterNeeded: 'high',
    season: ['winter', 'spring'],
    averageInvestment: 50000,
    expectedProfit: 100000,
    riskLevel: 'medium',
    harvestDuration: '12-18 months',
    minTemperature: 20,
    maxTemperature: 30
  },
  cotton: {
    name: 'Cotton',
    soilTypes: ['loamy', 'sandy-loam'],
    waterNeeded: 'medium',
    season: ['summer', 'monsoon'],
    averageInvestment: 35000,
    expectedProfit: 60000,
    riskLevel: 'high',
    harvestDuration: '180-210 days',
    minTemperature: 21,
    maxTemperature: 30
  },
  groundnut: {
    name: 'Groundnut',
    soilTypes: ['sandy-loam', 'loamy'],
    waterNeeded: 'low',
    season: ['summer', 'monsoon'],
    averageInvestment: 15000,
    expectedProfit: 35000,
    riskLevel: 'low',
    harvestDuration: '90-120 days',
    minTemperature: 20,
    maxTemperature: 30
  },
  soybean: {
    name: 'Soybean',
    soilTypes: ['loamy', 'sandy-loam'],
    waterNeeded: 'medium',
    season: ['monsoon', 'summer'],
    averageInvestment: 18000,
    expectedProfit: 40000,
    riskLevel: 'low',
    harvestDuration: '90-110 days',
    minTemperature: 20,
    maxTemperature: 30
  },
  tomato: {
    name: 'Tomato',
    soilTypes: ['loamy', 'sandy-loam'],
    waterNeeded: 'medium',
    season: ['winter', 'summer'],
    averageInvestment: 40000,
    expectedProfit: 80000,
    riskLevel: 'high',
    harvestDuration: '60-80 days',
    minTemperature: 21,
    maxTemperature: 32
  },
  onion: {
    name: 'Onion',
    soilTypes: ['loamy', 'sandy-loam'],
    waterNeeded: 'medium',
    season: ['winter', 'spring'],
    averageInvestment: 25000,
    expectedProfit: 55000,
    riskLevel: 'medium',
    harvestDuration: '120-150 days',
    minTemperature: 13,
    maxTemperature: 24
  },
  potato: {
    name: 'Potato',
    soilTypes: ['loamy', 'sandy-loam'],
    waterNeeded: 'medium',
    season: ['winter', 'spring'],
    averageInvestment: 22000,
    expectedProfit: 50000,
    riskLevel: 'low',
    harvestDuration: '90-120 days',
    minTemperature: 10,
    maxTemperature: 20
  }
};

// Get crop recommendations
const getRecommendations = async (req, res) => {
  try {
    const { location, soilType, budget, waterAvailability, season } = req.body;

    // Validate input
    if (!location || !soilType || !budget || !waterAvailability || !season) {
      return res.status(400).json({ 
        error: 'All fields are required: location, soilType, budget, waterAvailability, season' 
      });
    }

    // Normalize inputs
    const normalizedSoilType = soilType.toLowerCase();
    const normalizedSeason = season.toLowerCase();
    const normalizedWater = waterAvailability.toLowerCase();

    // Filter crops based on criteria
    let recommendedCrops = [];
    
    for (const [cropKey, crop] of Object.entries(cropDatabase)) {
      let score = 0;
      const reasons = [];

      // Soil type match
      if (crop.soilTypes.includes(normalizedSoilType)) {
        score += 30;
        reasons.push('Soil type compatible');
      }

      // Season match
      if (crop.season.some(s => normalizedSeason.includes(s))) {
        score += 25;
        reasons.push('Season appropriate');
      }

      // Water availability match
      if (
        (normalizedWater === 'high' && crop.waterNeeded === 'high') ||
        (normalizedWater === 'medium' && ['medium', 'low'].includes(crop.waterNeeded)) ||
        (normalizedWater === 'low' && crop.waterNeeded === 'low')
      ) {
        score += 25;
        reasons.push('Water availability matched');
      }

      // Budget match
      if (budget >= crop.averageInvestment) {
        score += 20;
        reasons.push('Budget sufficient');
      }

      if (score >= 40) {
        recommendedCrops.push({
          ...crop,
          score,
          matchReasons: reasons
        });
      }
    }

    // Sort by score
    recommendedCrops.sort((a, b) => b.score - a.score);
    recommendedCrops = recommendedCrops.slice(0, 5); // Top 5 recommendations

    // Generate AI analysis if Gemini API key is available
    let aiAnalysis = {};
    if (process.env.GEMINI_API_KEY) {
      aiAnalysis = await generateAIAnalysis(
        location,
        soilType,
        budget,
        waterAvailability,
        season,
        recommendedCrops
      );
    }

    res.json({
      success: true,
      recommendations: recommendedCrops,
      aiAnalysis
    });
  } catch (error) {
    console.error('Error in getRecommendations:', error);
    res.status(500).json({ error: error.message });
  }
};

// Generate AI analysis using Gemini
const generateAIAnalysis = async (location, soilType, budget, waterAvailability, season, recommendations) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are an agricultural expert. Based on the following farmer's conditions, provide detailed recommendations:

Location: ${location}
Soil Type: ${soilType}
Budget: ₹${budget}
Water Availability: ${waterAvailability}
Season: ${season}

Recommended Crops (top 3):
${recommendations.slice(0, 3).map((crop, i) => `${i + 1}. ${crop.name} - Investment: ₹${crop.averageInvestment}, Expected Profit: ₹${crop.expectedProfit}`).join('\n')}

Please provide:
1. A brief analysis of the farmer's conditions
2. Top recommendation with justification
3. Risk factors to consider
4. Best practices for success
5. When to plant and when to harvest

Keep the response concise and practical.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return {
      analysis: responseText,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating AI analysis:', error);
    return {
      analysis: 'AI analysis could not be generated',
      error: error.message
    };
  }
};

// Get detailed crop information
const getCropDetails = async (req, res) => {
  try {
    const { cropName } = req.params;
    const normalizedName = cropName.toLowerCase();

    const crop = cropDatabase[normalizedName];

    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    // Get additional AI-generated tips if available
    let tips = [];
    if (process.env.GEMINI_API_KEY) {
      tips = await generateCropTips(crop.name);
    }

    res.json({
      success: true,
      crop: {
        ...crop,
        tips
      }
    });
  } catch (error) {
    console.error('Error in getCropDetails:', error);
    res.status(500).json({ error: error.message });
  }
};

// Generate crop-specific tips using Gemini
const generateCropTips = async (cropName) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Provide 5 practical farming tips for growing ${cropName}. Format as JSON array with 'tip' keys. Be concise.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse response as JSON
    try {
      const tipsArray = JSON.parse(responseText);
      return tipsArray;
    } catch {
      return [{ tip: responseText }];
    }
  } catch (error) {
    console.error('Error generating crop tips:', error);
    return [];
  }
};

module.exports = {
  getRecommendations,
  getCropDetails
};
