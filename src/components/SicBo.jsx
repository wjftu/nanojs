import React, { useState } from 'react';

export default function SicBo() {
  const [results, setResults] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [rollingValues, setRollingValues] = useState([1, 1, 1]);
  const [winningBets, setWinningBets] = useState([]);

  const betTypes = {
    small: { name: 'Small', desc: 'Sum 4-10 (not triple)', payout: 1 },
    big: { name: 'Big', desc: 'Sum 11-17 (not triple)', payout: 1 },
    anyTriple: { name: 'Any Triple', desc: 'Any three of a kind', payout: 30 },
    sum4: { name: 'Sum 4', desc: 'Total = 4', payout: 60 },
    sum5: { name: 'Sum 5', desc: 'Total = 5', payout: 30 },
    sum6: { name: 'Sum 6', desc: 'Total = 6', payout: 17 },
    sum7: { name: 'Sum 7', desc: 'Total = 7', payout: 12 },
    sum8: { name: 'Sum 8', desc: 'Total = 8', payout: 8 },
    sum9: { name: 'Sum 9', desc: 'Total = 9', payout: 6 },
    sum10: { name: 'Sum 10', desc: 'Total = 10', payout: 6 },
    sum11: { name: 'Sum 11', desc: 'Total = 11', payout: 6 },
    sum12: { name: 'Sum 12', desc: 'Total = 12', payout: 6 },
    sum13: { name: 'Sum 13', desc: 'Total = 13', payout: 8 },
    sum14: { name: 'Sum 14', desc: 'Total = 14', payout: 12 },
    sum15: { name: 'Sum 15', desc: 'Total = 15', payout: 17 },
    sum16: { name: 'Sum 16', desc: 'Total = 16', payout: 30 },
    sum17: { name: 'Sum 17', desc: 'Total = 17', payout: 60 },
  };

  const singleDiceOptions = [1, 2, 3, 4, 5, 6].map(n => ({
    id: `single${n}`,
    name: `${n}`,
    desc: `Number ${n} appears`,
    payout: [0, 1, 2, 3][n]
  }));

  const doubleOptions = [1, 2, 3, 4, 5, 6].map(n => ({
    id: `double${n}`,
    name: `Double ${n}`,
    desc: `Two ${n}'s`,
    payout: 10
  }));

  const tripleOptions = [1, 2, 3, 4, 5, 6].map(n => ({
    id: `triple${n}`,
    name: `Triple ${n}`,
    desc: `Three ${n}'s`,
    payout: 180
  }));

  const comboOptions = [
    [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
    [2, 3], [2, 4], [2, 5], [2, 6],
    [3, 4], [3, 5], [3, 6],
    [4, 5], [4, 6],
    [5, 6]
  ].map(([a, b]) => ({
    id: `combo${a}${b}`,
    name: `${a}-${b}`,
    desc: `${a} and ${b}`,
    payout: 5
  }));

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setResults(null);
    setWinningBets([]);

    const interval = setInterval(() => {
      setRollingValues([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      const finalResults = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ];
      setRollingValues(finalResults);
      setResults(finalResults);
      calculateWinnings(finalResults);
      setIsRolling(false);
    }, 1000);
  };

  const calculateWinnings = (dice) => {
    const sum = dice[0] + dice[1] + dice[2];
    const sorted = [...dice].sort();
    const unique = [...new Set(dice)];
    const triple = unique.length === 1;
    const allSame = triple;

    const wins = [];

    if (sum >= 4 && sum <= 10 && !allSame) {
      wins.push('small');
    }

    if (sum >= 11 && sum <= 17 && !allSame) {
      wins.push('big');
    }

    if (allSame) {
      wins.push('anyTriple');
    }

    if (triple) {
      const num = dice[0];
      wins.push(`triple${num}`);
    }

    if (unique.length === 2) {
      const doubleNum = sorted[1];
      wins.push(`double${doubleNum}`);
    }

    if (!allSame) {
      wins.push(`sum${sum}`);
    }

    dice.forEach(d => {
      wins.push(`single${d}`);
    });

    comboOptions.forEach(opt => {
      const [a, b] = opt.id.replace('combo', '').split('').map(Number);
      if ((dice.includes(a) && dice.includes(b))) {
        wins.push(opt.id);
      }
    });

    setWinningBets(wins);
  };

  const getBetPayout = (betId) => {
    if (betTypes[betId]) return betTypes[betId].payout;
    const single = singleDiceOptions.find(o => o.id === betId);
    if (single) return single.payout;
    const double = doubleOptions.find(o => o.id === betId);
    if (double) return double.payout;
    const triple = tripleOptions.find(o => o.id === betId);
    if (triple) return triple.payout;
    const combo = comboOptions.find(o => o.id === betId);
    if (combo) return combo.payout;
    return 1;
  };

  const getBetName = (betId) => {
    if (betTypes[betId]) return betTypes[betId].name;
    const single = singleDiceOptions.find(o => o.id === betId);
    if (single) return single.name;
    const double = doubleOptions.find(o => o.id === betId);
    if (double) return double.name;
    const triple = tripleOptions.find(o => o.id === betId);
    if (triple) return triple.name;
    const combo = comboOptions.find(o => o.id === betId);
    if (combo) return combo.name;
    return betId;
  };

  const renderDice = (value, index) => {
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
      <div key={index} style={styles.diceCard}>
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
      </div>
    );
  };

  const isBetWin = (betId) => winningBets.includes(betId);

  const renderBetSection = (title, options) => (
    <div style={styles.betSection}>
      <h4 style={styles.sectionTitle}>{title}</h4>
      <div style={styles.betGrid}>
        {options.map(opt => (
          <div
            key={opt.id}
            style={{
              ...styles.betItem,
              ...(isBetWin(opt.id) ? styles.betItemWin : {}),
            }}
          >
            <span style={styles.betName}>{opt.name}</span>
            <span style={styles.betDesc}>{opt.desc}</span>
            <span style={styles.betPayout}>{opt.payout}:1</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Sic Bo</h2>
        <p style={styles.subtitle}>Roll the dice and see winning bets</p>
      </div>

      <div style={styles.diceSection}>
        <div style={styles.diceRow}>
          {rollingValues.map((value, index) => renderDice(value, index))}
        </div>
        <div style={results ? styles.sumDisplay : styles.sumDisplayHidden}>
          Sum: {results ? results[0] + results[1] + results[2] : 0}
        </div>
      </div>

      <button
        style={{
          ...styles.rollButton,
          ...(isRolling ? styles.rollButtonDisabled : {}),
        }}
        onClick={rollDice}
        disabled={isRolling}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>

      <div style={styles.bettingArea}>
        {renderBetSection('Big / Small', [
          { id: 'small', name: 'Small', desc: '4-10', payout: 1 },
          { id: 'big', name: 'Big', desc: '11-17', payout: 1 },
        ])}

        {renderBetSection('Triples', [
          { id: 'anyTriple', name: 'Any Triple', desc: 'Any', payout: 30 },
          ...tripleOptions,
        ])}

        {renderBetSection('Doubles', doubleOptions)}

        {renderBetSection('Combos', comboOptions)}

        {renderBetSection('Single Dice', singleDiceOptions)}

        {renderBetSection('Sums', Object.entries(betTypes).map(([id, data]) => ({ id, ...data })))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  diceRow: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  },
  diceCard: {
    width: '70px',
    height: '70px',
    background: '#fff',
    borderRadius: '14px',
    border: '2px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diceFace: {
    width: '50px',
    height: '50px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '2px',
  },
  dot: {
    width: '12px',
    height: '12px',
    background: '#1e293b',
    borderRadius: '50%',
    transition: 'opacity 0.1s ease',
  },
  sumDisplay: {
    marginTop: '12px',
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e40af',
  },
  sumDisplayHidden: {
    marginTop: '12px',
    fontSize: '24px',
    fontWeight: '700',
    color: 'transparent',
  },
  rollButton: {
    display: 'block',
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto 24px',
    padding: '14px 32px',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
  },
  rollButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  bettingArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  betSection: {
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '16px',
    background: '#fff',
  },
  sectionTitle: {
    margin: '0 0 12px 0',
    fontSize: '16px',
    fontWeight: '700',
    color: '#1e293b',
  },
  betGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
    gap: '8px',
  },
  betItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 8px',
    borderRadius: '8px',
    border: '2px solid #e2e8f0',
    background: '#f8fafc',
    transition: 'all 0.3s ease',
  },
  betItemWin: {
    borderColor: '#22c55e',
    background: '#dcfce7',
    boxShadow: '0 0 16px rgba(34, 197, 94, 0.5)',
    transform: 'scale(1.05)',
  },
  betName: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#1e293b',
  },
  betDesc: {
    fontSize: '11px',
    color: '#64748b',
    marginTop: '2px',
  },
  betPayout: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#8b5cf6',
    marginTop: '4px',
  },
};
