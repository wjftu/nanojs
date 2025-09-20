import React, { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);

  const [useLower, setUseLower] = useState(true);
  const [lower, setLower] = useState("abcdefghijklmnopqrstuvwxyz");

  const [useUpper, setUseUpper] = useState(true);
  const [upper, setUpper] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  const [useNumbers, setUseNumbers] = useState(true);
  const [numbers, setNumbers] = useState("0123456789");

  const [useSymbols, setUseSymbols] = useState(true);
  const [symbols, setSymbols] = useState("!@#$%^&*()_+~[]{}|;:,.<>?");

  const [useExtra, setUseExtra] = useState(false);
  const [extra, setExtra] = useState("");

  const [password, setPassword] = useState("");

  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (useLower) charset += lower;
    if (useUpper) charset += upper;
    if (useNumbers) charset += numbers;
    if (useSymbols) charset += symbols;
    if (useExtra) charset += extra;

    if (!charset) {
      alert("Please enable at least one character set.");
      return;
    }

    if (typeof length !== "number" || length <= 0) {
      alert("Password length must be a positive number.");
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    const pwd = Array.from(array, num => charset[num % charset.length]).join("");
    setPassword(pwd);
  };

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Random Password Generator</h2>

      <label style={{ display: "block", marginBottom: "10px" }}>
        Password Length:
        <input
          type="number"
          value={length}
          min="1"
          onChange={e => setLength(parseInt(e.target.value, 10))}
          style={{ marginLeft: "10px", padding: "5px", width: "60px" }}
        />
      </label>

      <form style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={useLower}
            onChange={e => setUseLower(e.target.checked)}
          /> Lowercase:
          <input
            type="text"
            value={lower}
            onChange={e => setLower(e.target.value)}
            disabled={!useLower}
            style={{ display: "block", marginTop: "5px", padding: "5px", width: "100%" }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={useUpper}
            onChange={e => setUseUpper(e.target.checked)}
          /> Uppercase:
          <input
            type="text"
            value={upper}
            onChange={e => setUpper(e.target.value)}
            disabled={!useUpper}
            style={{ display: "block", marginTop: "5px", padding: "5px", width: "100%" }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={e => setUseNumbers(e.target.checked)}
          /> Numbers:
          <input
            type="text"
            value={numbers}
            onChange={e => setNumbers(e.target.value)}
            disabled={!useNumbers}
            style={{ display: "block", marginTop: "5px", padding: "5px", width: "100%" }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={e => setUseSymbols(e.target.checked)}
          /> Symbols:
          <input
            type="text"
            value={symbols}
            onChange={e => setSymbols(e.target.value)}
            disabled={!useSymbols}
            style={{ display: "block", marginTop: "5px", padding: "5px", width: "100%" }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={useExtra}
            onChange={e => setUseExtra(e.target.checked)}
          /> Extra characters:
          <input
            type="text"
            value={extra}
            onChange={e => setExtra(e.target.value)}
            disabled={!useExtra}
            placeholder="Add your own characters"
            style={{ display: "block", marginTop: "5px", padding: "5px", width: "100%" }}
          />
        </label>
      </form>

      <button
        onClick={generatePassword}
        style={{ width: "100%", padding: "10px", background: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Generate Password
      </button>

      {password && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ marginBottom: "5px" }}>Generated Password:</h3>
          <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px", background: "#f9f9f9", fontFamily: "monospace", wordBreak: "break-all" }}>
            {password}
          </div>
          <button
            onClick={handleCopy}
            style={{ marginTop: "10px", padding: "8px", width: "100%", background: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            {copied ? "✅ Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      )}
    </div>
  );
}
