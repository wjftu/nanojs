import React, { useState } from "react";

export default function FileToBase64() {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");

  // Convert File → Base64
  const handleFileUpload = (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result); // contains data:<mime>;base64,...
    };
    reader.onerror = () => {
      setError("❌ Failed to read file.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "sans-serif",
        background: "#fafafa"
      }}
    >
      <h2 style={{ marginBottom: "15px", textAlign: "center", color: "#333" }}>
        File → Base64 Converter
      </h2>

      <input
        type="file"
        onChange={handleFileUpload}
        style={{ marginBottom: "15px" }}
      />

      {error && (
        <p style={{ marginTop: "10px", color: "red", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      {base64 && (
        <textarea
          readOnly
          style={{
            width: "100%",
            minHeight: "150px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            resize: "vertical",
            fontSize: "14px",
            outline: "none"
          }}
          value={base64}
        />
      )}
    </div>
  );
}
