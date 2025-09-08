import React, { useState } from "react";

export default function Base64ToFile() {
  const [base64, setBase64] = useState("");
  const [fileName, setFileName] = useState("output.txt");
  const [error, setError] = useState("");

  // Convert Base64 string to File
  const base64ToFile = (base64, filename, mimeType) => {
    const parts = base64.split(",");
    const byteString = atob(parts[1] || parts[0]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeType });
    return new File([blob], filename, { type: mimeType });
  };

  const handleConvertAndDownload = () => {
    try {
      setError(""); // clear old error
      if (!base64.trim()) {
        setError("Please enter a Base64 string.");
        return;
      }
      const safeFileName = fileName.trim() || "output.txt";
      const file = base64ToFile(base64, safeFileName, "text/plain");

      // Create download link and auto-click it
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = safeFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError("❌ Invalid Base64 string.");
    }
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
      <h3 style={{ marginBottom: "15px", textAlign: "center", color: "#333" }}>
        Base64 → File Converter
      </h3>
      <h5>Output File Name: </h5>
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter file name (default: output.txt)"
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginBottom: "15px",
          fontSize: "14px",
          outline: "none"
        }}
      />
      <h5>Base64 Text: </h5>
      <textarea
        style={{
          width: "100%",
          minHeight: "120px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          resize: "vertical",
          fontSize: "14px",
          marginBottom: "15px",
          outline: "none"
        }}
        placeholder="Paste Base64 string here..."
        value={base64}
        onChange={(e) => setBase64(e.target.value)}
      />

      <button
        onClick={handleConvertAndDownload}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background 0.3s"
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Convert & Download
      </button>

      {error && (
        <p style={{ marginTop: "15px", color: "red", fontWeight: "bold" }}>
          {error}
        </p>
      )}
    </div>
  );
}
