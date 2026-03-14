import React, { useState } from 'react';

export default function TwentyFourPoint() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const operators = ['+', '-', '*', '/'];

  const round = (num) => {
    return Math.round(num * 1000000) / 1000000;
  };

  const applyOp = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : null;
      default: return null;
    }
  };

  const formatNum = (num) => {
    if (Number.isInteger(num)) return num.toString();
    return num.toFixed(4).replace(/\.?0+$/, '');
  };

  const formatExpr = (expr) => {
    return expr.replace(/\*/g, '×').replace(/\//g, '÷');
  };

  const solve24 = (nums) => {
    if (nums.length !== 4) return null;

    const permutations = permute(nums);

    for (const [a, b, c, d] of permutations) {
      for (const op1 of operators) {
        for (const op2 of operators) {
          for (const op3 of operators) {
            // ((a op1 b) op2 c) op3 d
            let r1 = applyOp(a, b, op1);
            if (r1 === null) continue;
            let r2 = applyOp(r1, c, op2);
            if (r2 === null) continue;
            let r3 = applyOp(r2, d, op3);
            if (r3 !== null && round(r3) === 24) {
              return `(${formatNum(a)} ${op1} ${formatNum(b)}) ${op2} ${formatNum(c)}) ${op3} ${formatNum(d)} = 24`;
            }

            // (a op1 (b op2 c)) op3 d
            r1 = applyOp(b, c, op2);
            if (r1 === null) continue;
            r2 = applyOp(a, r1, op1);
            if (r2 === null) continue;
            r3 = applyOp(r2, d, op3);
            if (r3 !== null && round(r3) === 24) {
              return `(${formatNum(a)} ${op1} (${formatNum(b)} ${op2} ${formatNum(c)})) ${op3} ${formatNum(d)} = 24`;
            }

            // a op1 ((b op2 c) op3 d)
            r1 = applyOp(b, c, op2);
            if (r1 === null) continue;
            r2 = applyOp(r1, d, op3);
            if (r2 === null) continue;
            r3 = applyOp(a, r2, op1);
            if (r3 !== null && round(r3) === 24) {
              return `${formatNum(a)} ${op1} ((${formatNum(b)} ${op2} ${formatNum(c)}) ${op3} ${formatNum(d)}) = 24`;
            }

            // a op1 (b op2 (c op3 d))
            r1 = applyOp(c, d, op3);
            if (r1 === null) continue;
            r2 = applyOp(b, r1, op2);
            if (r2 === null) continue;
            r3 = applyOp(a, r2, op1);
            if (r3 !== null && round(r3) === 24) {
              return `${formatNum(a)} ${op1} (${formatNum(b)} ${op2} (${formatNum(c)} ${op3} ${formatNum(d)})) = 24`;
            }

            // (a op1 b) op2 (c op3 d)
            r1 = applyOp(a, b, op1);
            if (r1 === null) continue;
            r2 = applyOp(c, d, op3);
            if (r2 === null) continue;
            r3 = applyOp(r1, r2, op2);
            if (r3 !== null && round(r3) === 24) {
              return `(${formatNum(a)} ${op1} ${formatNum(b)}) ${op2} (${formatNum(c)} ${op3} ${formatNum(d)}) = 24`;
            }

            // ((a op1 b) op2 c) op3 d - alternate form
            r1 = applyOp(a, b, op1);
            if (r1 === null) continue;
            r2 = applyOp(r1, c, op2);
            if (r2 === null) continue;
            r3 = applyOp(d, r2, op3);
            if (r3 !== null && round(r3) === 24) {
              return `${formatNum(d)} ${op3} ((${formatNum(a)} ${op1} ${formatNum(b)}) ${op2} ${formatNum(c)}) = 24`;
            }
          }
        }
      }
    }

    return null;
  };

  const permute = (arr) => {
    if (arr.length <= 1) return [arr];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = arr.slice();
      rest.splice(i, 1);
      const perms = permute(rest);
      for (const p of perms) {
        result.push([arr[i], ...p]);
      }
    }
    return result;
  };

  const handleSolve = () => {
    setError('');
    setResult('');

    const nums = input.split(/[\s,]+/).map(s => parseFloat(s)).filter(n => !isNaN(n));

    if (nums.length !== 4) {
      setError('Please input exactly 4 numbers separated by spaces or commas');
      return;
    }

    if (nums.some(n => n <= 0)) {
      setError('Please input positive numbers only');
      return;
    }

    const solution = solve24(nums);

    if (solution) {
      setResult(formatExpr(solution));
    } else {
      setResult('No solution found');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>24 Point Solver</h2>
      <p style={styles.subtitle}>Enter 4 numbers to find a solution that equals 24</p>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Input (4 numbers, space or comma separated)</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter 4 numbers (e.g., 1 2 3 4)"
          style={styles.input}
        />
      </div>

      <button style={styles.button} onClick={handleSolve}>
        Solve
      </button>

      {error && (
        <div style={styles.error}>{error}</div>
      )}

      {result && (
        <div style={styles.result}>
          <div style={styles.resultLabel}>Result:</div>
          <div style={styles.resultValue}>{result}</div>
        </div>
      )}

      <div style={styles.examples}>
        <div style={styles.examplesTitle}>Examples:</div>
        <div style={styles.exampleItem}>1 2 3 4 → (1 + 2 + 3) × 4 = 24</div>
        <div style={styles.exampleItem}>5 5 5 1 → 5 × (5 - 1/5) = 24</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e40af',
    margin: '0 0 8px 0',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0 0 20px 0',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '18px',
    borderRadius: '8px',
    border: '2px solid #e2e8f0',
    outline: 'none',
    boxSizing: 'border-box',
    textAlign: 'center',
    letterSpacing: '2px',
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#fff',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
  },
  error: {
    marginTop: '16px',
    padding: '12px',
    background: '#fee2e2',
    color: '#991b1b',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center',
  },
  result: {
    marginTop: '20px',
    padding: '16px',
    background: '#dcfce7',
    borderRadius: '8px',
    border: '2px solid #22c55e',
  },
  resultLabel: {
    fontSize: '14px',
    color: '#166534',
    marginBottom: '8px',
  },
  resultValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#166534',
    textAlign: 'center',
  },
  examples: {
    marginTop: '24px',
    padding: '16px',
    background: '#f8fafc',
    borderRadius: '8px',
  },
  examplesTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '8px',
  },
  exampleItem: {
    fontSize: '13px',
    color: '#64748b',
    marginBottom: '4px',
    fontFamily: 'monospace',
  },
};
