import React, { useMemo, useState } from "react";

export default function RegexMatcher({ title = "Regex Matcher" }) {
  const [text, setText] = useState("");
  const [pattern, setPattern] = useState("");
  const [dedupe, setDedupe] = useState(false);
  const [copied, setCopied] = useState(false);

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: "" };
    try {
      const re = new RegExp(pattern, "g");
      const list = [];
      let m;
      while ((m = re.exec(text)) !== null) {
        list.push(m[0]);
        if (m[0] === "") re.lastIndex++;
      }
      return { matches: list, error: "" };
    } catch (e) {
      return { matches: [], error: e.message };
    }
  }, [text, pattern]);

  const outputMatches = useMemo(
    () => (dedupe ? Array.from(new Set(matches)) : matches),
    [matches, dedupe]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputMatches.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed:", e);
    }
  };

  const style = {
    box: {
      maxWidth: "720px",
      margin: "20px auto",
      padding: "16px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontFamily: "Arial, sans-serif",
    },
    label: {
      display: "block",
      margin: "10px 0 4px",
      fontSize: "13px",
      fontWeight: "bold",
    },
    textarea: {
      width: "100%",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontFamily: "monospace",
      fontSize: "13px",
      boxSizing: "border-box",
    },
    input: {
      width: "100%",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontFamily: "monospace",
      fontSize: "13px",
      boxSizing: "border-box",
    },
    error: {
      color: "#c0392b",
      fontSize: "13px",
      marginTop: "8px",
    },
    count: {
      fontSize: "13px",
      color: "#666",
      marginTop: "8px",
    },
    output: {
      marginTop: "8px",
      padding: "8px",
      background: "#f7f7f7",
      border: "1px solid #eee",
      borderRadius: "4px",
      fontFamily: "monospace",
      fontSize: "13px",
      whiteSpace: "pre-wrap",
      wordBreak: "break-all",
      maxHeight: "300px",
      overflowY: "auto",
    },
    line: {
      borderBottom: "1px solid #eee",
      padding: "2px 0",
    },
    buttons: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
      marginTop: "8px",
    },
    button: {
      padding: "6px 12px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      background: "#fff",
      cursor: "pointer",
      fontSize: "13px",
    },
    buttonActive: {
      background: "#4a90e2",
      color: "#fff",
      borderColor: "#4a90e2",
    },
    copied: {
      fontSize: "12px",
      color: "#27ae60",
    },
  };

  return (
    <div style={style.box}>
      <h3 style={{ margin: 0 }}>{title}</h3>

      <label style={style.label}>Text</label>
      <textarea
        style={style.textarea}
        rows={8}
        placeholder="Paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <label style={style.label}>Regular expression</label>
      <input
        style={style.input}
        type="text"
        placeholder="e.g. \\b\\w+@\\w+\\.\\w+\\b"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
      />

      {error && <div style={style.error}>Invalid regex: {error}</div>}

      {pattern && !error && (
        <>
          <div style={style.count}>
            {outputMatches.length} match(es)
            {dedupe && matches.length !== outputMatches.length
              ? ` (from ${matches.length}, duplicates removed)`
              : ""}
          </div>
          <div style={style.buttons}>
            <button style={style.button} onClick={handleCopy}>
              Copy output
            </button>
            <button
              style={{
                ...style.button,
                ...(dedupe ? style.buttonActive : {}),
              }}
              onClick={() => setDedupe((v) => !v)}
            >
              {dedupe ? "Show duplicates" : "Remove duplicates"}
            </button>
            {copied && <span style={style.copied}>Copied!</span>}
          </div>
          <div style={style.output}>
            {outputMatches.length === 0
              ? "No matches"
              : outputMatches.map((m, i) => (
                  <div key={i} style={style.line}>
                    {m === "" ? "(empty)" : m}
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
}
