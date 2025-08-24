import { useState } from "react";

export default function CommonTool({ title, actionLabel, process, placeholder="Enter your text here..." }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    try {
      const result = await Promise.resolve(process(input)); // support sync + async
      setOutput(result);
      setError("");
    } catch (e) {
      let message = "Unknown error";

      if (e instanceof Error) {
        message = `${e.name}: ${e.message}`;
      } else if (typeof e === "string") {
        message = e;
      } else {
        try {
          message = JSON.stringify(e, null, 2);
        } catch {
          message = String(e);
        }
      }

      setError(message);
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #ffffff, #f5f5f5)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          marginBottom: "15px",
          color: "#333",
        }}
      >
        {title}
      </h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        rows={5}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          outline: "none",
          resize: "none",
          marginBottom: "15px",
          fontSize: "14px",
          color: "#333",
        }}
      />

      <button
        onClick={handleProcess}
        style={{
          width: "100%",
          padding: "12px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "15px",
          cursor: "pointer",
          transition: "background 0.2s ease",
        }}
        onMouseOver={(e) => (e.target.style.background = "#1d4ed8")}
        onMouseOut={(e) => (e.target.style.background = "#2563eb")}
      >
        {actionLabel}
      </button>

      {error && (
        <div
          style={{
            marginTop: "15px",
            padding: "12px",
            background: "#fee2e2",
            color: "#991b1b",
            border: "1px solid #fca5a5",
            borderRadius: "10px",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            fontSize: "13px",
          }}
        >
          ⚠️ Error:
          <pre style={{ marginTop: "6px" }}>{error}</pre>
        </div>
      )}

      {output && (
        <div>
          {/* Output Title */}
          <div
            style={{
              paddingTop: "20px",
              paddingBottom: "10px",
              color: "#1e3a8a",
              fontWeight: "bold",
              fontSize: "14px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Output:
          </div>

          {/* Output Textarea */}
          <textarea
            value={output}
            readOnly
            rows={6}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
              resize: "none",
              marginBottom: "15px",
              fontSize: "14px",
              color: "#333",
            }}
          />

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            style={{
              margin: "10px 15px 15px 15px",
              padding: "10px",
              width: "calc(100% - 30px)",
              background: "#e5e7eb",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {copied ? "✅ Copied!" : "📋 Copy Output"}
          </button>
        </div>
      )}
    </div>
  );
}
