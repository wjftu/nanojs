import React, { useState } from 'react';

export default function SicBoBetting() {
  const [initialBalance, setInitialBalance] = useState(1000);
  const [balance, setBalance] = useState(1000);
  const [bets, setBets] = useState({});
  const [chipValue, setChipValue] = useState(10);
  const [results, setResults] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [rollingValues, setRollingValues] = useState([1, 1, 1]);
  const [winningBets, setWinningBets] = useState([]);
  const [gameMessage, setGameMessage] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  const chipDenominations = [10, 50, 100, 500];

  const betTypes = {
    small: { name: 'Small', payout: 1 },
    big: { name: 'Big', payout: 1 },
    anyTriple: { name: 'Any Triple', payout: 30 },
    sum4: { name: '4', payout: 60 },
    sum5: { name: '5', payout: 30 },
    sum6: { name: '6', payout: 17 },
    sum7: { name: '7', payout: 12 },
    sum8: { name: '8', payout: 8 },
    sum9: { name: '9', payout: 6 },
    sum10: { name: '10', payout: 6 },
    sum11: { name: '11', payout: 6 },
    sum12: { name: '12', payout: 6 },
    sum13: { name: '13', payout: 8 },
    sum14: { name: '14', payout: 12 },
    sum15: { name: '15', payout: 17 },
    sum16: { name: '16', payout: 30 },
    sum17: { name: '17', payout: 60 },
  };

  const singleDiceOptions = [1, 2, 3, 4, 5, 6].map(n => ({
    id: `single${n}`,
    name: `${n}`,
    payout: [0, 1, 2, 3][n]
  }));

  const doubleOptions = [1, 2, 3, 4, 5, 6].map(n => ({
    id: `double${n}`,
    name: `D${n}`,
    payout: 10
  }));

  const tripleOptions = [1, 2, 3, 4, 5, 6].map(n => ({
    id: `triple${n}`,
    name: `T${n}`,
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
    payout: 5
  }));

  const handleSetInitialBalance = (value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      setInitialBalance(num);
      setBalance(num);
      setBets({});
      setHistory([]);
      setResults(null);
      setWinningBets([]);
      setGameMessage('');
    }
  };

  const placeBet = (betId) => {
    if (isRolling) return;
    
    const currentBet = bets[betId] || 0;
    
    if (currentBet > 0) {
      const newBetAmount = currentBet - chipValue;
      if (newBetAmount <= 0) {
        const newBets = { ...bets };
        delete newBets[betId];
        setBets(newBets);
      } else {
        setBets(prev => ({
          ...prev,
          [betId]: newBetAmount
        }));
      }
      setBalance(prev => prev + chipValue);
    } else {
      if (balance < chipValue) {
        setGameMessage('Insufficient balance!');
        return;
      }
      setBets(prev => ({
        ...prev,
        [betId]: (prev[betId] || 0) + chipValue
      }));
      setBalance(prev => prev - chipValue);
    }
    setGameMessage('');
    setResultMessage('');
  };

  const clearBets = () => {
    if (isRolling) return;
    const totalBets = Object.values(bets).reduce((a, b) => a + b, 0);
    setBalance(prev => prev + totalBets);
    setBets({});
    setResults(null);
    setWinningBets([]);
    setGameMessage('');
    setResultMessage('');
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const resetGame = () => {
    setBalance(initialBalance);
    setBets({});
    setHistory([]);
    setResults(null);
    setWinningBets([]);
    setGameMessage('');
    setResultMessage('');
  };

  const getTotalBet = () => Object.values(bets).reduce((a, b) => a + b, 0);

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

  const rollDice = () => {
    if (isRolling) return;
    if (getTotalBet() === 0) {
      setGameMessage('Please place a bet first!');
      return;
    }

    setIsRolling(true);
    setResults(null);
    setWinningBets([]);
    setGameMessage('');
    setResultMessage('');

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

    if (sum >= 4 && sum <= 10 && !allSame) wins.push('small');
    if (sum >= 11 && sum <= 17 && !allSame) wins.push('big');
    if (allSame) wins.push('anyTriple');
    if (triple) wins.push(`triple${dice[0]}`);
    if (unique.length === 2) wins.push(`double${sorted[1]}`);
    if (!allSame) wins.push(`sum${sum}`);

    dice.forEach(d => wins.push(`single${d}`));

    comboOptions.forEach(opt => {
      const [a, b] = opt.id.replace('combo', '').split('').map(Number);
      if (dice.includes(a) && dice.includes(b)) wins.push(opt.id);
    });

    setWinningBets(wins);

    const totalBet = getTotalBet();
    let totalPayout = 0;
    const winDetails = [];

    wins.forEach(betId => {
      const betAmount = bets[betId] || 0;
      if (betAmount > 0) {
        const payout = getBetPayout(betId);
        const winAmount = betAmount * (payout + 1);
        totalPayout += winAmount;
        winDetails.push({ betId, betAmount, payout, winAmount });
      }
    });

    const netProfit = totalPayout - totalBet;
    setBalance(prev => prev + totalPayout);

    const record = {
      id: Date.now(),
      dice: [...dice],
      sum: sum,
      bets: { ...bets },
      wins: winDetails,
      totalBet: totalBet,
      totalPayout: totalPayout,
      netProfit: netProfit,
      balanceAfter: balance + totalPayout
    };

    setHistory(prev => [record, ...prev]);

    if (netProfit > 0) {
      setResultMessage(`🎉 Congratulations! You win $${netProfit}!`);
    } else if (netProfit < 0) {
      setResultMessage(`😢 Sorry, you lose $${Math.abs(netProfit)}`);
    } else {
      setResultMessage(`🤝 Push! No win, no loss.`);
    }
  };

  const getNetProfit = () => {
    const totalBet = getTotalBet();
    const totalPayout = winningBets.reduce((total, betId) => {
      const betAmount = bets[betId] || 0;
      const payout = getBetPayout(betId);
      return total + (betAmount * payout);
    }, 0);
    return totalPayout - totalBet;
  };

  const renderDice = (value, index) => {
    const dotPatterns = {
      1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8],
    };
    const positions = dotPatterns[value] || [4];

    return (
      <div key={index} style={styles.diceCard}>
        <div style={styles.diceFace}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((pos) => (
            <div key={pos} style={{ ...styles.dot, opacity: positions.includes(pos) ? 1 : 0 }} />
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
          <button
            key={opt.id}
            style={{
              ...styles.betButton,
              ...(bets[opt.id] > 0 && !results ? styles.betButtonActive : {}),
              ...(isBetWin(opt.id) ? styles.betButtonWin : {}),
            }}
            onClick={() => placeBet(opt.id)}
            disabled={isRolling}
          >
            <span style={styles.betName}>{opt.name}</span>
            <span style={styles.betPayout}>{opt.payout}:1</span>
            {bets[opt.id] > 0 && (
              <span style={styles.betAmount}>${bets[opt.id]}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const totalBet = getTotalBet();
  const netProfit = getNetProfit();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Sic Bo</h2>
        <p style={styles.subtitle}>Place your bets and roll to win</p>
      </div>

      <div style={styles.settingsRow}>
        <button style={styles.settingsButton} onClick={() => setShowSettings(!showSettings)}>
          ⚙️ Settings
        </button>
      </div>

      {showSettings && (
        <div style={styles.settingsPanel}>
          <div style={styles.settingItem}>
            <span style={styles.settingLabel}>Initial Balance:</span>
            <input
              type="number"
              value={initialBalance}
              onChange={(e) => setInitialBalance(parseInt(e.target.value, 10) || 0)}
              style={styles.settingInput}
              min="1"
            />
            <button style={styles.settingButton} onClick={() => handleSetInitialBalance(initialBalance)}>
              Apply & Reset
            </button>
          </div>
          <button style={styles.resetButton} onClick={resetGame}>
            Reset to Initial Balance
          </button>
        </div>
      )}

      <div style={styles.balanceBar}>
        <div style={styles.balanceItem}>
          <span style={styles.balanceLabel}>Balance</span>
          <span style={styles.balanceValue}>${balance || 0}</span>
        </div>
        <div style={styles.balanceItem}>
          <span style={styles.balanceLabel}>Total Bet</span>
          <span style={styles.betValue}>${totalBet || 0}</span>
        </div>
        <div style={styles.balanceItem}>
          <span style={styles.balanceLabel}>Result</span>
          <span style={results ? { ...styles.profitValue, color: (netProfit || 0) >= 0 ? '#16a34a' : '#dc2626' } : styles.profitValue}>
            {results ? ((netProfit || 0) >= 0 ? '+' : '') + (netProfit || 0) : '-'}
          </span>
        </div>
      </div>

      {gameMessage && (
        <div style={styles.message}>{gameMessage}</div>
      )}

      <div style={styles.diceSection}>
        <div style={styles.diceRow}>
          {rollingValues.map((value, index) => renderDice(value, index))}
        </div>
        <div style={results ? styles.sumDisplay : styles.sumDisplayHidden}>
          Sum: {results ? (results[0] + results[1] + results[2]) : 0}
        </div>
      </div>

      <div style={resultMessage ? styles.resultMessage : styles.resultPlaceholder}>
        {resultMessage || 'Rolling...'}
      </div>

      <div style={styles.chipSection}>
        <span style={styles.chipLabel}>Chip:</span>
        <div style={styles.chipRow}>
          {chipDenominations.map(val => (
            <button
              key={val}
              style={{
                ...styles.chipButton,
                ...(chipValue === val ? styles.chipButtonActive : {}),
              }}
              onClick={() => setChipValue(val)}
            >
              ${val}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.actionRow}>
        <button style={styles.clearButton} onClick={clearBets} disabled={isRolling}>
          Clear Bets
        </button>
        <button
          style={{
            ...styles.rollButton,
            ...(isRolling || totalBet === 0 ? styles.rollButtonDisabled : {}),
          }}
          onClick={rollDice}
          disabled={isRolling || totalBet === 0}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>

      <div style={styles.bettingArea}>
        {renderBetSection('Big / Small', [
          { id: 'small', name: 'Small', payout: 1 },
          { id: 'big', name: 'Big', payout: 1 },
        ])}

        {renderBetSection('Triples', [
          { id: 'anyTriple', name: 'Any', payout: 30 },
          ...tripleOptions,
        ])}

        {renderBetSection('Doubles', doubleOptions)}

        {renderBetSection('Combos', comboOptions)}

        {renderBetSection('Single', singleDiceOptions)}

        {renderBetSection('Sums', Object.entries(betTypes).map(([id, data]) => ({ id, ...data })))}
      </div>

      <div style={styles.historySection}>
        <div style={styles.historyHeader}>
          <h3 style={styles.historyTitle}>History ({history.length})</h3>
          {history.length > 0 && (
            <button style={styles.clearHistoryButton} onClick={clearHistory}>
              Clear History
            </button>
          )}
        </div>
        {history.length === 0 ? (
          <div style={styles.noHistory}>No history yet</div>
        ) : (
          <div style={styles.historyList}>
            {history.map((record) => (
              <div key={record.id} style={styles.historyItem}>
                <div style={styles.historyDice}>
                  [{record.dice.join(', ')}] = {record.sum}
                </div>
                <div style={styles.historyBets}>
                  {Object.entries(record.bets || {}).map(([betId, amount]) => (
                    <span key={betId} style={styles.historyBetTag}>
                      {betId}: ${amount}
                    </span>
                  ))}
                </div>
                <div style={styles.historyDetail}>
                  <span>Bet: ${record.totalBet || 0}</span>
                  <span>Payout: ${record.totalPayout || 0}</span>
                  <span style={{ color: (record.netProfit || 0) >= 0 ? '#16a34a' : '#dc2626' }}>
                    {(record.netProfit || 0) >= 0 ? '+' : ''}{record.netProfit || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: { textAlign: 'center', marginBottom: '12px' },
  title: { fontSize: '28px', fontWeight: '700', color: '#1e40af', margin: '0 0 4px 0' },
  subtitle: { color: '#64748b', fontSize: '14px', margin: 0 },
  settingsRow: { textAlign: 'center', marginBottom: '12px' },
  settingsButton: {
    padding: '6px 14px', borderRadius: '6px', border: '1px solid #cbd5e1',
    background: '#fff', color: '#475569', fontSize: '13px', cursor: 'pointer',
  },
  settingsPanel: {
    padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '12px',
  },
  settingItem: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' },
  settingLabel: { fontSize: '13px', fontWeight: '600', color: '#475569' },
  settingInput: {
    padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1',
    fontSize: '14px', width: '100px',
  },
  settingButton: {
    padding: '6px 12px', borderRadius: '6px', border: 'none',
    background: '#3b82f6', color: '#fff', fontSize: '12px', cursor: 'pointer',
  },
  resetButton: {
    padding: '6px 12px', borderRadius: '6px', border: 'none',
    background: '#f59e0b', color: '#fff', fontSize: '12px', cursor: 'pointer',
  },
  balanceBar: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '12px',
    background: '#f8fafc',
    borderRadius: '10px',
    marginBottom: '12px',
  },
  balanceItem: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  balanceLabel: { fontSize: '12px', color: '#64748b', fontWeight: '600' },
  balanceValue: { fontSize: '20px', fontWeight: '700', color: '#1e293b' },
  betValue: { fontSize: '20px', fontWeight: '700', color: '#f59e0b' },
  profitValue: { fontSize: '20px', fontWeight: '700' },
  message: { textAlign: 'center', padding: '8px', color: '#dc2626', fontWeight: '600', marginBottom: '8px' },
  resultMessage: { 
    textAlign: 'center', 
    padding: '12px', 
    fontSize: '18px', 
    fontWeight: '700', 
    marginBottom: '12px',
    borderRadius: '8px',
  },
  resultPlaceholder: { 
    textAlign: 'center', 
    padding: '12px', 
    fontSize: '18px', 
    fontWeight: '700', 
    marginBottom: '12px',
    borderRadius: '8px',
    color: 'transparent',
  },
  diceSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' },
  diceRow: { display: 'flex', gap: '12px', justifyContent: 'center' },
  diceCard: {
    width: '60px', height: '60px', background: '#fff', borderRadius: '12px',
    border: '2px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  diceFace: {
    width: '44px', height: '44px', display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: '2px',
  },
  dot: { width: '10px', height: '10px', background: '#1e293b', borderRadius: '50%' },
  sumDisplay: { marginTop: '10px', fontSize: '22px', fontWeight: '700', color: '#1e40af', height: '30px', lineHeight: '30px' },
  sumDisplayHidden: { marginTop: '10px', fontSize: '22px', fontWeight: '700', color: 'transparent', height: '30px', lineHeight: '30px' },
  chipSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginBottom: '12px' },
  chipLabel: { fontSize: '13px', fontWeight: '600', color: '#475569' },
  chipRow: { display: 'flex', gap: '6px' },
  chipButton: {
    padding: '6px 14px', borderRadius: '6px', border: '2px solid #cbd5e1',
    background: '#fff', color: '#475569', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
  },
  chipButtonActive: { borderColor: '#3b82f6', background: '#eff6ff', color: '#3b82f6' },
  actionRow: { display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '16px' },
  clearButton: {
    padding: '10px 20px', borderRadius: '8px', border: 'none',
    background: '#f1f5f9', color: '#475569', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
  },
  rollButton: {
    padding: '10px 28px', borderRadius: '8px', border: 'none',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
  },
  rollButtonDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  bettingArea: { display: 'flex', flexDirection: 'column', gap: '12px' },
  betSection: { border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', background: '#fff' },
  sectionTitle: { margin: '0 0 10px 0', fontSize: '14px', fontWeight: '700', color: '#1e293b' },
  betGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '6px' },
  betButton: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 4px',
    borderRadius: '6px', border: '2px solid #e2e8f0', background: '#f8fafc',
    cursor: 'pointer', position: 'relative', transition: 'all 0.2s ease',
  },
  betButtonActive: { border: '2px solid #3b82f6', background: '#eff6ff' },
  betButtonWin: { border: '2px solid #22c55e', background: '#dcfce7', boxShadow: '0 0 10px rgba(34,197,94,0.4)' },
  betName: { fontSize: '12px', fontWeight: '700', color: '#1e293b' },
  betPayout: { fontSize: '10px', fontWeight: '600', color: '#8b5cf6', marginTop: '2px' },
  betAmount: {
    position: 'absolute', top: '-6px', right: '-6px', background: '#3b82f6',
    color: '#fff', fontSize: '9px', fontWeight: '700', padding: '2px 5px', borderRadius: '8px',
  },
  historySection: {
    marginTop: '20px', border: '1px solid #e2e8f0', borderRadius: '10px',
    padding: '12px', background: '#fff',
  },
  historyHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px',
  },
  historyTitle: { margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' },
  clearHistoryButton: {
    padding: '4px 10px', borderRadius: '4px', border: 'none',
    background: '#ef4444', color: '#fff', fontSize: '11px', cursor: 'pointer',
  },
  noHistory: { textAlign: 'center', color: '#94a3b8', fontSize: '13px', padding: '20px' },
  historyList: { display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' },
  historyItem: {
    padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0',
  },
  historyDice: { fontSize: '14px', fontWeight: '700', color: '#1e40af', marginBottom: '4px' },
  historyBets: { display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' },
  historyBetTag: { fontSize: '10px', padding: '2px 6px', background: '#e0e7ff', borderRadius: '4px', color: '#3730a3' },
  historyDetail: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' },
};
