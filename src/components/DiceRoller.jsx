import React, { useState } from 'react';

export default function DiceRoller() {
  const [diceCount, setDiceCount] = useState(1);
  const [results, setResults] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [rollingValues, setRollingValues] = useState([]);

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    const finalResults = Array.from({ length: diceCount }, () => 
      Math.floor(Math.random() * 6) + 1
    );

    const interval = setInterval(() => {
      setRollingValues(Array.from({ length: diceCount }, () => 
        Math.floor(Math.random() * 6) + 1
      ));
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      setRollingValues([]);
      setResults(finalResults);
      setIsRolling(false);
    }, 1000);
  };

  const total = results ? results.reduce((a, b) => a + b, 0) : 0;
  const displayValues = isRolling ? rollingValues : results;

  const renderDots = (value) => {
    const dotPatterns = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    };

    const positions = dotPatterns[value] || [4];

    return (
      <div style={styles.diceFace}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((pos) => (
          <div
            key={pos}
            style={{
              ...styles.dot,
              opacity: positions.includes(pos) ? 1 : 0,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Dice Roller</h2>
        <p style={styles.subtitle}>Roll a D6 dice</p>
      </div>

      <div style={styles.diceSection}>
        {displayValues ? (
          <div style={styles.diceGrid}>
            {displayValues.map((value, index) => (
              <div key={index} style={styles.diceCard}>
                {renderDots(value)}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.diceGrid}>
            {Array.from({ length: diceCount }).map((_, index) => (
              <div key={index} style={styles.diceCard}>
                {renderDots(1)}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        style={{
          ...styles.rollBtn,
          ...(isRolling ? styles.rollBtnRolling : {}),
        }}
        onClick={rollDice}
        disabled={isRolling}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>

      <div style={styles.controlSection}>
        <label style={styles.label}>Number of Dice</label>
        <div style={styles.countControl}>
          <button
            style={styles.countBtn}
            onClick={() => setDiceCount(Math.max(1, diceCount - 1))}
            disabled={isRolling}
          >
            -
          </button>
          <span style={styles.countDisplay}>{diceCount}</span>
          <button
            style={styles.countBtn}
            onClick={() => setDiceCount(Math.min(10, diceCount + 1))}
            disabled={isRolling}
          >
            +
          </button>
        </div>
      </div>

      {results && (
        <div style={styles.resultSection}>
          <div style={styles.resultGrid}>
            {results.map((value, index) => (
              <div key={index} style={styles.resultDice}>
                <span style={styles.resultDiceValue}>{value}</span>
              </div>
            ))}
          </div>
          <div style={styles.totalSection}>
            <span style={styles.totalLabel}>Total</span>
            <span style={styles.totalValue}>{total}</span>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '30px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e40af',
    margin: '0 0 8px 0',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '15px',
    margin: 0,
  },
  diceSection: {
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  diceGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
  },
  diceCard: {
    width: '60px',
    height: '60px',
    background: '#fff',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diceFace: {
    width: '44px',
    height: '44px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '2px',
  },
  dot: {
    width: '10px',
    height: '10px',
    background: '#1e293b',
    borderRadius: '50%',
    transition: 'opacity 0.1s ease',
  },
  rollBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
    marginBottom: '20px',
  },
  rollBtnRolling: {
    opacity: 0.7,
  },
  controlSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#475569',
  },
  countControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: '#fff',
    borderRadius: '10px',
    border: '2px solid #cbd5e1',
    padding: '4px 8px',
  },
  countBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: 'none',
    background: '#f1f5f9',
    color: '#475569',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countDisplay: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    minWidth: '30px',
    textAlign: 'center',
  },
  resultSection: {
    marginTop: '24px',
    textAlign: 'center',
    padding: '20px',
    background: '#f8fafc',
    borderRadius: '12px',
  },
  resultGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  resultDice: {
    width: '36px',
    height: '36px',
    background: '#fff',
    borderRadius: '8px',
    border: '2px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultDiceValue: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1e40af',
  },
  totalSection: {
    borderTop: '1px solid #e2e8f0',
    paddingTop: '12px',
  },
  totalLabel: {
    display: 'block',
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '4px',
  },
  totalValue: {
    fontSize: '48px',
    fontWeight: '800',
    color: '#1e40af',
  },
};
