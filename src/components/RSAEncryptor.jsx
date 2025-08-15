import React, { useState } from "react";

const styles = {
  box: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "15px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "20px",
    marginBottom: "10px",
    color: "#2563eb",
  },
  textarea: {
    width: "100%",
    marginTop: "8px",
    padding: "8px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  button: {
    width: "100%",
    marginTop: "8px",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
  },
};

const RSAEncryptor = () => {
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [copyMessage, setCopyMessage] = useState("Copy to clipboard");

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage(`copied`);
      setTimeout(() => setCopyMessage("Copy to clipboard"), 3000);
    });
  }

  async function importKey(pem) {
    const clean = pem.replace(/-----.*-----/g, "").replace(/\s/g, "");
    console.log(clean);
    const binary = Uint8Array.from(atob(clean), (c) => c.charCodeAt(0));
    return await crypto.subtle.importKey(
      "spki",
      binary.buffer,
      { name: "RSA-OAEP", hash: "SHA-256" },
      true,
      ["encrypt"]
    );
  }

  async function encrypt() {
    if (!key || !message) return alert("Enter key and message");
    try {
      const publicKey = await importKey(key);
      const data = new TextEncoder().encode(message);
      const enc = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, data);
      setEncrypted(btoa(String.fromCharCode(...new Uint8Array(enc))));
    } catch {
      alert("Invalid key format");
    }
  }

  return (
    <div style={styles.box}>
      <div style={styles.title}>🔐 RSA Encryptor</div>
      <textarea
        style={styles.textarea}
        rows="4"
        placeholder="Paste Public Key (PEM)"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <textarea
        style={styles.textarea}
        rows="3"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button style={styles.button} onClick={encrypt}>
        Encrypt
      </button>
      {encrypted && (
        <>
          <hr />
          <div style={styles.title}>Encrypted Message:</div>
          <textarea
            style={styles.textarea}
            rows="4"
            readOnly
            value={encrypted}
          />
          <button style={styles.button} onClick={() => copyToClipboard(encrypted)}>
            {copyMessage}
          </button>
        </>
      )}
    </div>
  );
};

export default RSAEncryptor;
