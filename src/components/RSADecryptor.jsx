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

const RSADecryptor = () => {
  const [privateKeyPEM, setPrivateKeyPEM] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [copyMessage, setCopyMessage] = useState("Copy to clipboard");

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage(`copied`);
      setTimeout(() => setCopyMessage("Copy to clipboard"), 3000);
    });
  }

  async function importPrivateKey(pem) {
    const clean = pem.replace(/-----.*-----/g, "").replace(/\s/g, "");
    const binary = Uint8Array.from(atob(clean), (c) => c.charCodeAt(0));
    return await crypto.subtle.importKey(
      "pkcs8",
      binary.buffer,
      { name: "RSA-OAEP", hash: "SHA-256" },
      true,
      ["decrypt"]
    );
  }

  async function decryptMessage() {
    if (!privateKeyPEM || !encrypted) return alert("Enter private key and message");
    try {
      const privateKey = await importPrivateKey(privateKeyPEM);
      const encryptedBytes = Uint8Array.from(atob(encrypted), (c) => c.charCodeAt(0));
      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        encryptedBytes
      );
      setDecrypted(new TextDecoder().decode(decryptedBuffer));
    } catch {
      alert("Failed to decrypt. Check the key or message format.");
    }
  }

  return (
    <div style={styles.box}>
      <div style={styles.title}>🔑 RSA Decryptor</div>
      <textarea
        style={styles.textarea}
        rows="4"
        placeholder="Paste Private Key (PEM)"
        value={privateKeyPEM}
        onChange={(e) => setPrivateKeyPEM(e.target.value)}
      />
      <textarea
        style={styles.textarea}
        rows="3"
        placeholder="Paste Encrypted Message (Base64)"
        value={encrypted}
        onChange={(e) => setEncrypted(e.target.value)}
      />
      <button style={styles.button} onClick={decryptMessage}>
        Decrypt
      </button>
      {decrypted && (
        <>
        <br />
        <div style={styles.title}>Decrypted Message</div>
        <textarea
          style={styles.textarea}
          rows="3"
          readOnly
          value={decrypted}
        />
        <button style={styles.button} onClick={() => copyToClipboard(decrypted)}>
          {copyMessage}
        </button>
        </>
      )}
    </div>
  );
};

export default RSADecryptor;
