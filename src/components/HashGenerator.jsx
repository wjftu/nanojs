import React, { useState, useRef } from 'react';

const HashGenerator = ({hashAlgorithm = 'SHA-256'}) => {
  const [inputType, setInputType] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  // Utility function to convert ArrayBuffer to Hex string
  const bufferToHex = (buffer) => {
    const byteArray = new Uint8Array(buffer);
    return Array.from(byteArray)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  };

  // Generate hash function
  const generateHash = async () => {
    if (!textInput && !selectedFile && inputType === 'text') {
      alert('Please enter some text or select a file');
      return;
    }

    if (inputType === 'file' && !selectedFile) {
      alert('Please select a file');
      return;
    }

    setIsLoading(true);
    setOutput('');

    try {
      let data;

      if (inputType === 'text') {
        // Encode text input
        const encoder = new TextEncoder();
        data = encoder.encode(textInput);
      } else {
        // Read file as ArrayBuffer
        data = await readFileAsArrayBuffer(selectedFile);
      }

      // Generate hash using Web Crypto API
      const hashBuffer = await crypto.subtle.digest(hashAlgorithm, data);
      const hashHex = bufferToHex(hashBuffer);
      
      setOutput(hashHex);
    } catch (error) {
      console.error('Error generating hash:', error);
      setOutput('Error: Could not generate hash. Make sure you are using HTTPS or localhost.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to read file as ArrayBuffer
  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsArrayBuffer(file);
    });
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Clear all inputs and results
  const handleClear = () => {
    setTextInput('');
    setSelectedFile(null);
    setOutput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "0.5rem", padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h3>{hashAlgorithm} Hash Generator</h3>
      
      {/* Input Type Selection */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          Input Type:
          <select 
            value={inputType} 
            onChange={(e) => setInputType(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="text">Text</option>
            <option value="file">File</option>
          </select>
        </label>
      </div>

      {/* Text Input */}
      {inputType === 'text' && (
        <div style={{ marginBottom: '20px' }}>
          <label>
            Enter Text:
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text to hash"
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '10px',
                marginTop: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}
            />
          </label>
        </div>
      )}

      {/* File Input */}
      {inputType === 'file' && (
        <div style={{ marginBottom: '20px' }}>
          <label>
            Select File:
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              style={{ marginLeft: '10px', marginTop: '10px' }}
            />
          </label>
          {selectedFile && (
            <p style={{ marginTop: '10px', color: '#666' }}>
              Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={generateHash}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Generating...' : 'Generate Hash'}
        </button>
        
        <button
          onClick={handleClear}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear All
        </button>
      </div>

      {/* Hash Result */}
      {output && (
        <div style={{ margin: '20px' }}>
          <h3>Hash Result ({hashAlgorithm}):</h3>
          <div
            style={{
              padding: '15px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              wordBreak: 'break-all',
              fontFamily: 'monospace',
              fontSize: '14px',
              maxHeight: '200px',
              overflowY: 'auto'
            }}
          >
            {output}
          </div>
          
          {/* Copy to Clipboard Button */}
          <button
            onClick={handleCopy}
            style={{
              padding: '10px',
              margin: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {copied ? "✅ Copied!" : "📋 Copy Output"}
          </button>
        </div>
      )}


    </div>
  );
};

export default HashGenerator;