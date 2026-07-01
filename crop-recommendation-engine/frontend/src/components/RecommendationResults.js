import React, { useState } from 'react';
import './RecommendationResults.css';

const RecommendationResults = ({ data }) => {
  const [expandedCrop, setExpandedCrop] = useState(null);

  if (!data || !data.recommendations) {
    return <div className="no-results">No recommendations available</div>;
  }

  const toggleExpand = (cropName) => {
    setExpandedCrop(expandedCrop === cropName ? null : cropName);
  };

  return (
    <div className="results-container">
      <h2 className="results-title">Recommended Crops</h2>

      <div className="recommendations-list">
        {data.recommendations.map((crop, index) => (
          <div key={index} className="crop-card">
            <div className="crop-header" onClick={() => toggleExpand(crop.name)}>
              <div className="crop-rank">#{index + 1}</div>
              <div className="crop-info">
                <h3>{crop.name}</h3>
                <div className="crop-score">
                  Match Score: <span className="score-value">{crop.score}%</span>
                </div>
              </div>
              <div className={`expand-icon ${expandedCrop === crop.name ? 'expanded' : ''}`}>
                ▼
              </div>
            </div>

            {expandedCrop === crop.name && (
              <div className="crop-details">
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Expected Investment:</span>
                    <span className="detail-value">₹{crop.averageInvestment.toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Expected Profit:</span>
                    <span className="detail-value profit">₹{crop.expectedProfit.toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Risk Level:</span>
                    <span className={`detail-value risk-${crop.riskLevel.toLowerCase()}`}>
                      {crop.riskLevel}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Harvest Duration:</span>
                    <span className="detail-value">{crop.harvestDuration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Soil Types:</span>
                    <span className="detail-value">{crop.soilTypes.join(', ')}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Water Needed:</span>
                    <span className="detail-value">{crop.waterNeeded}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Suitable Seasons:</span>
                    <span className="detail-value">{crop.season.join(', ')}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Temperature Range:</span>
                    <span className="detail-value">{crop.minTemperature}°C - {crop.maxTemperature}°C</span>
                  </div>
                </div>

                <div className="match-reasons">
                  <h4>Why This Crop?</h4>
                  <ul>
                    {crop.matchReasons.map((reason, i) => (
                      <li key={i}>{reason}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {data.aiAnalysis && data.aiAnalysis.analysis && (
        <div className="ai-analysis">
          <h2>AI Agricultural Expert Analysis</h2>
          <div className="analysis-content">
            {data.aiAnalysis.analysis.split('\n').map((line, i) => (
              line.trim() && <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationResults;
