import React, { useState } from 'react';
import axios from 'axios';
import './RecommendationForm.css';

const RecommendationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    location: '',
    soilType: 'loamy',
    budget: '',
    waterAvailability: 'medium',
    season: 'monsoon'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form
      if (!formData.location.trim()) {
        throw new Error('Please enter a location');
      }
      if (!formData.budget || formData.budget <= 0) {
        throw new Error('Please enter a valid budget');
      }

      const response = await axios.post(
        'http://localhost:5000/api/ai/recommendations',
        formData
      );

      onSubmit(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="recommendation-form" onSubmit={handleSubmit}>
      <h2>Crop Recommendation Engine</h2>
      <p className="form-description">
        Enter your farming details to get AI-powered crop recommendations
      </p>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="location">Location *</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter your city or region"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="soilType">Soil Type *</label>
        <select
          id="soilType"
          name="soilType"
          value={formData.soilType}
          onChange={handleChange}
        >
          <option value="loamy">Loamy Soil</option>
          <option value="clayey">Clayey Soil</option>
          <option value="sandy-loam">Sandy Loam</option>
          <option value="sandy">Sandy Soil</option>
          <option value="silty">Silty Soil</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="budget">Budget (₹) *</label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Enter budget in rupees"
          min="1000"
          step="1000"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="waterAvailability">Water Availability *</label>
        <select
          id="waterAvailability"
          name="waterAvailability"
          value={formData.waterAvailability}
          onChange={handleChange}
        >
          <option value="low">Low (Rainfall dependent)</option>
          <option value="medium">Medium (Moderate irrigation)</option>
          <option value="high">High (Abundant water)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="season">Current Season *</label>
        <select
          id="season"
          name="season"
          value={formData.season}
          onChange={handleChange}
        >
          <option value="monsoon">Monsoon (Jun-Sep)</option>
          <option value="winter">Winter (Oct-Feb)</option>
          <option value="summer">Summer (Mar-May)</option>
          <option value="spring">Spring</option>
        </select>
      </div>

      <button type="submit" disabled={loading} className="submit-button">
        {loading ? 'Loading Recommendations...' : 'Get Recommendations'}
      </button>
    </form>
  );
};

export default RecommendationForm;
