import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h3>Processing your document...</h3>
      <p>Extracting allergens and nutritional information</p>
      <div className="loading-steps">
        <div className="step">📄 Reading PDF</div>
        <div className="step">🔍 Analyzing content</div>
        <div className="step">🤖 AI extraction</div>
      </div>
    </div>
  );
}

export default LoadingSpinner;