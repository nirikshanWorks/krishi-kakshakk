import React, { useState } from 'react';
import axios from 'axios';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather/current?location=${location}`
      );
      setWeather(response.data.weather);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-widget">
      <h3>Check Weather</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {error && <div className="weather-error">{error}</div>}

      {weather && (
        <div className="weather-info">
          <h4>{weather.location}</h4>
          <div className="weather-main">
            <div className="temp">{weather.temperature}°C</div>
            <div className="description">{weather.description}</div>
          </div>
          <div className="weather-details">
            <div className="weather-detail">
              <span>Humidity:</span>
              <span>{weather.humidity}%</span>
            </div>
            <div className="weather-detail">
              <span>Wind Speed:</span>
              <span>{weather.windSpeed} m/s</span>
            </div>
            <div className="weather-detail">
              <span>Rainfall:</span>
              <span>{weather.rainfall || '0'} mm</span>
            </div>
            <div className="weather-detail">
              <span>Feels Like:</span>
              <span>{weather.feelsLike}°C</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
