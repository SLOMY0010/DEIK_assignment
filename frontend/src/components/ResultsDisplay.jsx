import React from 'react';
import './ResultsDisplay.css';

function ResultsDisplay({ results, onReset }) {
  const allergensList = [
    { key: 'gluten', label: 'Gluten' },
    { key: 'egg', label: 'Egg' },
    { key: 'crustaceans', label: 'Crustaceans' },
    { key: 'fish', label: 'Fish' },
    { key: 'peanut', label: 'Peanut' },
    { key: 'soy', label: 'Soy' },
    { key: 'milk', label: 'Milk' },
    { key: 'tree_nuts', label: 'Tree Nuts' },
    { key: 'celery', label: 'Celery' },
    { key: 'mustard', label: 'Mustard' },
  ];

  const nutritionList = [
    { key: 'energy', label: 'Energy' },
    { key: 'fat', label: 'Fat' },
    { key: 'carbohydrate', label: 'Carbohydrate' },
    { key: 'sugar', label: 'Sugar' },
    { key: 'protein', label: 'Protein' },
    { key: 'sodium', label: 'Sodium' },
  ];

  const downloadJSON = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'extraction-results.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>✅ Extraction Complete</h2>
        <p className="processing-method">
          Processing method: <span>{results.processing_method === 'ocr' ? '🔍 OCR (Scanned PDF)' : '📄 Text Extraction'}</span>
        </p>
      </div>

      <div className="results-grid">
        {/* Allergens Section */}
        <div className="results-section allergens-section">
          <h3>🚨 Allergens</h3>
          <div className="allergens-grid">
            {allergensList.map((allergen) => {
              const isPresent = results.allergens[allergen.key];
              return (
                <div
                  key={allergen.key}
                  className={`allergen-item ${isPresent ? 'present' : 'absent'}`}
                >
                  <span className="allergen-icon">
                    {isPresent ? '⚠️' : '✓'}
                  </span>
                  <span className="allergen-label">{allergen.label}</span>
                  <span className="allergen-status">
                    {isPresent ? 'Present' : 'Not detected'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nutritional Values Section */}
        <div className="results-section nutrition-section">
          <h3>📊 Nutritional Values</h3>
          <div className="nutrition-table">
            {nutritionList.map((nutrient) => {
              const value = results.nutritional_values[nutrient.key];
              return (
                <div key={nutrient.key} className="nutrition-row">
                  <span className="nutrition-label">{nutrient.label}</span>
                  <span className="nutrition-value">
                    {value || 'Not found'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Raw Text Preview */}
      {results.raw_text_preview && (
        <div className="results-section preview-section">
          <h3>📝 Text Preview</h3>
          <div className="text-preview">
            <code>{results.raw_text_preview}</code>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="results-actions">
        <button onClick={downloadJSON} className="btn-download">
          📥 Download JSON
        </button>
        <button onClick={onReset} className="btn-new">
          ⬆️ Upload New File
        </button>
      </div>
    </div>
  );
}

export default ResultsDisplay;