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
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "10px",
    display: "block",
  },
  select: {
    width: "100%",
    marginTop: "6px",
    padding: "8px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
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
    marginTop: "10px",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
  },
  smallBtn: {
    marginTop: "5px",
    marginRight: "5px",
    padding: "6px 12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
  },
  successMsg: {
    color: "green",
    fontSize: "13px",
    marginTop: "5px",
  },
};

const RSAKeyGenerator = () => {
  const [keyLength, setKeyLength] = useState(2048);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  // Convert ArrayBuffer to PEM
  function arrayBufferToBase64(buf) {
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
  }

  function toPem(base64, type) {
    return `-----BEGIN ${type} KEY-----\n${base64.replace(/(.{64})/g, "$1\n")}\n-----END ${type} KEY-----`;
  }

  async function generateKeys() {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: parseInt(keyLength, 10),
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"]
    );

    const publicKeyData = await crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKeyData = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    setPublicKey(toPem(arrayBufferToBase64(publicKeyData), "PUBLIC"));
    setPrivateKey(toPem(arrayBufferToBase64(privateKeyData), "PRIVATE"));
  }

  // Copy to clipboard
  function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage(`${type} copied to clipboard`);
      setTimeout(() => setCopyMessage(""), 2000);
    });
  }

  // Download key as file
  function downloadKeyFile(filename, content) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div style={styles.box}>
      <div style={styles.title}>🔑 RSA Key Pair Generator</div>

      <label style={styles.label}>Select Key Length:</label>
      <select
        style={styles.select}
        value={keyLength}
        onChange={(e) => setKeyLength(e.target.value)}
      >
        <option value="1024">1024 bits (Faster, Less Secure)</option>
        <option value="2048">2048 bits (Recommended)</option>
        <option value="4096">4096 bits (More Secure, Slower)</option>
      </select>

      <button style={styles.button} onClick={generateKeys}>
        Generate Key Pair
      </button>

      {publicKey && (
        <>
          <label style={styles.label}>Public Key:</label>
          <textarea style={styles.textarea} rows="5" readOnly value={publicKey} />
          <div>
            <button style={styles.smallBtn} onClick={() => copyToClipboard(publicKey, "Public key")}>
              Copy Public Key
            </button>
            <button style={styles.smallBtn} onClick={() => downloadKeyFile("public_key.pem", publicKey)}>
              Download Public Key
            </button>
          </div>

          <label style={styles.label}>Private Key:</label>
          <textarea style={styles.textarea} rows="6" readOnly value={privateKey} />
          <div>
            <button style={styles.smallBtn} onClick={() => copyToClipboard(privateKey, "Private key")}>
              Copy Private Key
            </button>
            <button style={styles.smallBtn} onClick={() => downloadKeyFile("private_key.pem", privateKey)}>
              Download Private Key
            </button>
          </div>

          {copyMessage && <div style={styles.successMsg}>{copyMessage}</div>}
        </>
      )}
    </div>
  );
};

export default RSAKeyGenerator;
