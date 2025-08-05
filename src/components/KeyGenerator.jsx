import React, { useState } from "react";

export default function KeyGenerator() {
  const [length, setLength] = useState(32);
  const [base64Key, setBase64Key] = useState("");
  const [hexKey, setHexKey] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  // Helper functions
  const toBase64 = (buffer) => btoa(String.fromCharCode(...buffer));
  const toHex = (buffer) => Array.from(buffer).map(b => b.toString(16).padStart(2, '0')).join('');

  function generateKey() {
    if (length <= 0) return;
    const keyArray = new Uint8Array(length);
    crypto.getRandomValues(keyArray);

    setBase64Key(toBase64(keyArray));
    setHexKey(toHex(keyArray));
    setCopyStatus("");
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    setCopyStatus("✅ Copied!");
    setTimeout(() => setCopyStatus(""), 2000);
  }

  // Inline styles
  const box = {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  };
  const input = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    boxSizing: "border-box",
  };
  const button = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    border: "none",
    borderRadius: "6px",
    color: "white",
    backgroundColor: "#4a90e2",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
  };
  const resultBox = {
    background: "#f9f9f9",
    padding: "10px",
    borderRadius: "6px",
    wordBreak: "break-all",
    marginTop: "10px",
    textAlign: "left",
    fontSize: "14px",
  };
  const copyBtn = {
    marginTop: "6px",
    backgroundColor: "#6c757d",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  };
  const copyStatusStyle = {
    marginTop: "5px",
    fontSize: "12px",
    color: "#28a745",
    textAlign: "right",
  };

  return (
    <div style={box}>
      <h2 style={{ color: "#4a4a8a", marginBottom: "15px" }}>🔑 Random Key Generator</h2>

      <label>Key Length (bytes):</label>
      <input
        style={input}
        type="number"
        min="1"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />

      <button style={button} onClick={generateKey}>Generate Key</button>

      {base64Key && (
        <div style={resultBox}>
          <strong>Base64 Key:</strong>
          <div style={{ marginTop: "6px" }}>{base64Key}</div>
          <button style={copyBtn} onClick={() => copyToClipboard(base64Key)}>Copy Base64</button>
        </div>
      )}

      {hexKey && (
        <div style={resultBox}>
          <strong>Hex Key:</strong>
          <div style={{ marginTop: "6px" }}>{hexKey}</div>
          <button style={copyBtn} onClick={() => copyToClipboard(hexKey)}>Copy Hex</button>
          {copyStatus && <div style={copyStatusStyle}>{copyStatus}</div>}
        </div>
      )}
    </div>
  );
}
