import React, { useState } from 'react';
import RecommendationForm from './components/RecommendationForm';
import RecommendationResults from './components/RecommendationResults';
import WeatherWidget from './components/WeatherWidget';
import './App.css';

function App() {
  const [results, setResults] = useState(null);

  const handleFormSubmit = (data) => {
    setResults(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🌾 AI Crop Recommendation Engine</h1>
          <p>Intelligent crop suggestions based on your farming conditions</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <RecommendationForm onSubmit={handleFormSubmit} />
          
          <WeatherWidget />

          {results && <RecommendationResults data={results} />}
        </div>
      </main>

      <footer className="app-footer">
        <p>🌍 Powered by AI • Weather Data • Crop Science</p>
      </footer>
    </div>
  );
}

export default App;
