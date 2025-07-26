import React, { useState } from 'react';

function Sum() {
  const [input, setInput] = useState('');
  const [sum, setSum] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const lines = value
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');

    let total = 0;
    for (let i = 0; i < lines.length; i++) {
      const num = Number(lines[i]);
      if (isNaN(num)) {
        setSum(null);
        setError(`❌ Line ${i + 1} is not a valid number: "${lines[i]}"`);
        return;
      }
      total += num;
    }

    setError(null);
    setSum(total);
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '1.5rem',
      border: '1px solid #ddd',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#fefefe'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Sum Calculator</h2>
      <textarea
        rows={6}
        cols={10}
        placeholder="Enter numbers\nOne per line"
        value={input}
        onChange={handleChange}
        style={{
          width: '100%',
          fontSize: '1rem',
          padding: '0.5rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          resize: 'none',
          textAlign: 'left',
          fontFamily: 'monospace',
          boxSizing: 'border-box'
        }}
      />
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        {error ? (
          <p style={{ color: '#e53935', fontWeight: 'bold' }}>{error}</p>
        ) : sum !== null ? (
          <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>
            ✅ Sum: {sum}
          </p>
        ) : (
          <p style={{ color: '#888' }}>Enter numbers above ☝️</p>
        )}
      </div>
    </div>
  );
}

export default Sum;
