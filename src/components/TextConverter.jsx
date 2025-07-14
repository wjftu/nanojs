import React, { useState } from 'react';

export default function TextConverter({ label = 'Convert', convert }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      const result = convert(input);
      setOutput(result);
      setError('');
    } catch (e) {
      setOutput('');
      setError(e.message || 'Conversion failed');
    }
    setCopied(false); 
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const styles = {
    container: {
      backgroundColor: '#f9f9fb',
      border: '1px solid #e0e0e0',
      borderRadius: 12,
      padding: 24,
      marginBottom: 32,
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
      fontFamily: 'sans-serif',
    },
    heading: {
      marginBottom: 16,
      fontSize: 20,
      fontWeight: 600,
    },
    textarea: {
      width: '100%',
      padding: 10,
      fontSize: 14,
      borderRadius: 8,
      border: '1px solid #ccc',
      resize: 'vertical',
      fontFamily: 'monospace',
      boxSizing: 'border-box',
    },
    buttonGroup: {
      marginTop: 12,
      marginBottom: 12,
    },

    button: {
      padding: '8px 16px',
      fontSize: 16,
      marginRight: 10,
      borderRadius: 6,
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#2ecc71',
      color: '#fff',
      transition: 'background-color 0.2s',
      fontWeight: 'bold',  // 👈 Make button text bold
    },
    
    clearButton: {
      backgroundColor: '#cf521d',
    },
    outputSection: {
      marginTop: 12,
    },
    label: {
      fontWeight: 600,
      display: 'block',
      marginBottom: 4,
    },
    error: {
      color: '#d32f2f',
      backgroundColor: '#fdecea',
      padding: '10px',
      borderRadius: 6,
      marginTop: 10,
      fontSize: 14,
    },
    copiedText: {
      color: '#388e3c',
      fontSize: 16,
      marginLeft: 8,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.heading}>{label}</div>

      <textarea
        rows={4}
        style={styles.textarea}
        placeholder="Enter input text..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div style={styles.buttonGroup}>
        <button onClick={handleConvert} style={styles.button}>
          Convert
        </button>
        <button
          onClick={handleClear}
          style={{ ...styles.button, ...styles.clearButton }}
        >
          Clear
        </button>
      </div>

      {output && (
        <div style={styles.outputSection}>
          <span style={styles.label}>Output:</span>
          <textarea
            rows={4}
            style={styles.textarea}
            value={output}
            readOnly
          />
          <div style={styles.buttonGroup}>
            <button onClick={handleCopy} style={{ ...styles.button, ...styles.copyButton }}>
              Copy Output
            </button>
            {copied && <span style={styles.copiedText}>Copied!</span>}
          </div>
        </div>
      )}

      {error && <div style={styles.error}>Error: {error}</div>}
    </div>
  );
}
