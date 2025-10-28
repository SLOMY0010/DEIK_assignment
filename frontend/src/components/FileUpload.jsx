import React, { useState, useRef } from 'react';
import './FileUpload.css';

function FileUpload({ onFileUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="file-upload-container">
      <div
        className={`drop-zone ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleChange}
          style={{ display: 'none' }}
        />

        {!selectedFile ? (
          <div className="drop-zone-content">
            <div className="upload-icon">📄</div>
            <h3>Drop your PDF here</h3>
            <p>or</p>
            <button onClick={handleButtonClick} className="btn-select">
              Select PDF File
            </button>
            <p className="file-info">Supports text-based and scanned PDFs</p>
            <p className="file-info">Multilingual support (English, Hungarian, etc.)</p>
          </div>
        ) : (
          <div className="file-selected">
            <div className="file-icon">✅</div>
            <div className="file-details">
              <h4>{selectedFile.name}</h4>
              <p>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <div className="file-actions">
              <button onClick={handleUpload} className="btn-upload">
                Extract Data
              </button>
              <button onClick={handleClear} className="btn-clear">
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;