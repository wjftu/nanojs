import React, { useState } from "react";

export default function AesGcmEncryptor() {
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [result, setResult] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  // Utility functions
  const toBase64 = (buffer) => btoa(String.fromCharCode(...new Uint8Array(buffer)));
  const fromBase64 = (str) => Uint8Array.from(atob(str), (c) => c.charCodeAt(0));

  async function importKey(base64Key) {
    const rawKey = fromBase64(base64Key);
    return await crypto.subtle.importKey("raw", rawKey, "AES-GCM", true, ["encrypt", "decrypt"]);
  }

  async function encrypt() {
    try {
      if (!key || !message) return;
      const cryptoKey = await importKey(key);
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const data = new TextEncoder().encode(message);
      const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, cryptoKey, data);

      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(encrypted), iv.length);
      setResult(toBase64(combined));
      setCopyStatus("");
    } catch (e) {
      setResult("⚠️ Encryption failed: " + e.message);
      setCopyStatus("");
    }
  }

  async function decrypt() {
    try {
      if (!key || !ciphertext) return;
      const cryptoKey = await importKey(key);
      const data = fromBase64(ciphertext);
      const iv = data.slice(0, 12);
      const content = data.slice(12);
      const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, cryptoKey, content);
      setResult(new TextDecoder().decode(decrypted));
      setCopyStatus("");
    } catch (e) {
      setResult("⚠️ Decryption failed: " + e.message);
      setCopyStatus("");
    }
  }

  function copyResult() {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopyStatus("✅ Copied!");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  }

  // Inline CSS
  const box = {
    maxWidth: "400px",
    margin: "40px auto",
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
    width: "48%",
    padding: "10px",
    margin: "6px 1%",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
  };
  const encryptBtn = { ...button, backgroundColor: "#4a90e2" };
  const decryptBtn = { ...button, backgroundColor: "#4caf50" };
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
  const resultBox = {
    background: "#f9f9f9",
    padding: "10px",
    borderRadius: "6px",
    wordBreak: "break-all",
    marginTop: "10px",
    textAlign: "left",
    fontSize: "14px",
  };
  const copyStatusStyle = {
    marginTop: "5px",
    fontSize: "12px",
    color: "#28a745",
    textAlign: "right",
  };

  return (
    <div style={box}>
      <h2 style={{ color: "#4a4a8a", marginBottom: "15px" }}>🔐 AES GCM Encryptor</h2>

      <label>Shared Key (Base64, 32 bytes):</label>
      <input
        style={input}
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      <label>Message to Encrypt:</label>
      <textarea
        style={input}
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <label>Ciphertext to Decrypt (Base64):</label>
      <textarea
        style={input}
        rows="3"
        value={ciphertext}
        onChange={(e) => setCiphertext(e.target.value)}
      ></textarea>

      <div>
        <button style={encryptBtn} onClick={encrypt}>Encrypt</button>
        <button style={decryptBtn} onClick={decrypt}>Decrypt</button>
      </div>

      {result && (
        <div style={resultBox}>
          <strong>Result:</strong>
          <div style={{ marginTop: "6px" }}>{result}</div>
          <button style={copyBtn} onClick={copyResult}>Copy Result</button>
          {copyStatus && <div style={copyStatusStyle}>{copyStatus}</div>}
        </div>
      )}
    </div>
  );
}
