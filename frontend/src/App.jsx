import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/extract`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 second timeout
      });

      setResults(response.data);
    } catch (err) {
      console.error('Upload error:', err);
      setError(
        err.response?.data?.detail || 
        err.message || 
        'An error occurred while processing the file'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🍽️ Food Allergen & Nutrition Extractor</h1>
          <p>Upload a PDF to automatically extract allergen and nutritional information</p>
        </div>
      </header>

      <main className="App-main">
        <div className="container">
          {!loading && !results && (
            <FileUpload onFileUpload={handleFileUpload} />
          )}

          {loading && <LoadingSpinner />}

          {error && (
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <h3>Processing Error</h3>
              <p>{error}</p>
              <button onClick={handleReset} className="btn-reset">
                Try Again
              </button>
            </div>
          )}

          {results && (
            <ResultsDisplay results={results} onReset={handleReset} />
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>Powered by OpenAI GPT-4 | Supports multilingual documents</p>
      </footer>
    </div>
  );
}

export default App;