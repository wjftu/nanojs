import React, { useState } from 'react';

export default function SimpleSicBo() {
  const [winRate, setWinRate] = useState(80);
  const [balance, setBalance] = useState(1000);
  const [bets, setBets] = useState({ small: 0, big: 0 });
  const [results, setResults] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [rollingValues, setRollingValues] = useState([1, 1, 1]);
  const [resultMessage, setResultMessage] = useState('');
  const [history, setHistory] = useState([]);

  const chipValue = 100;

  const handleSetWinRate = () => {
    const rate = Math.max(0, Math.min(100, winRate));
    setWinRate(rate);
  };

  const placeBet = (betType) => {
    if (isRolling) return;
    setResults(null);
    
    // If betting on one option, remove bet from other option
    const otherType = betType === 'small' ? 'big' : 'small';
    const otherBetAmount = bets[otherType] || 0;
    
    let newBets = { small: 0, big: 0 };
    let balanceChange = 0;
    
    if (otherBetAmount > 0) {
      balanceChange += otherBetAmount;
    }
    
    if (balance < chipValue + balanceChange) {
      setResultMessage('Insufficient balance!');
      return;
    }
    
    if (otherBetAmount > 0) {
      setBalance(prev => prev + otherBetAmount);
    }
    
    newBets[betType] = chipValue;
    setBets(newBets);
    setBalance(prev => prev - chipValue);
    setResultMessage('');
  };

  const removeBet = (betType) => {
    if (isRolling) return;
    setResults(null);
    if (bets[betType] > 0) {
      setBets(prev => ({
        ...prev,
        [betType]: Math.max(0, prev[betType] - chipValue)
      }));
      setBalance(prev => prev + chipValue);
      if (bets[betType] <= chipValue) {
        setBets(prev => ({ ...prev, [betType]: 0 }));
      }
    }
  };

  const clearBets = () => {
    if (isRolling) return;
    const totalBets = bets.small + bets.big;
    setBalance(prev => prev + totalBets);
    setBets({ small: 0, big: 0 });
    setResults(null);
    setResultMessage('');
  };

  const resetGame = () => {
    setBalance(1000);
    setBets({ small: 0, big: 0 });
    setHistory([]);
    setResults(null);
    setResultMessage('');
  };

  const getTotalBet = () => bets.small + bets.big;

  const rollDice = () => {
    if (isRolling) return;
    if (getTotalBet() === 0) {
      setResultMessage('Please place a bet first!');
      return;
    }

    setIsRolling(true);
    setResults(null);
    setResultMessage('Rolling...');

    const rollInterval = setInterval(() => {
      setRollingValues([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
    }, 80);

    setTimeout(() => {
      clearInterval(rollInterval);
      
      const shouldWin = Math.random() * 100 < winRate;
      let finalDice;
      
      const userBetType = bets.big > 0 ? 'big' : 'small';
      const userBetAmount = bets[userBetType];

      if (shouldWin) {
        if (userBetType === 'small') {
          finalDice = generateSmall(true);
        } else {
          finalDice = generateBig(true);
        }
      } else {
        if (userBetType === 'small') {
          finalDice = generateBig(false);
        } else {
          finalDice = generateSmall(false);
        }
      }

      setRollingValues(finalDice);
      
      const sum = finalDice[0] + finalDice[1] + finalDice[2];
      setResults({ dice: finalDice, sum });

      calculateResult(finalDice, sum, userBetType, userBetAmount);
      setIsRolling(false);
    }, 1000);
  };

  const generateSmall = (wantWin) => {
    const minSum = 3;
    const maxSum = 10;
    let sum;
    
    if (wantWin) {
      sum = Math.floor(Math.random() * (maxSum - minSum + 1)) + minSum;
    } else {
      const wrongSums = [3, 4, 5, 6, 7, 8, 9, 10];
      sum = wrongSums[Math.floor(Math.random() * wrongSums.length)];
    }
    
    return generateDiceWithSum(sum);
  };

  const generateBig = (wantWin) => {
    const minSum = 11;
    const maxSum = 18;
    let sum;
    
    if (wantWin) {
      sum = Math.floor(Math.random() * (maxSum - minSum + 1)) + minSum;
    } else {
      const wrongSums = [11, 12, 13, 14, 15, 16, 17, 18];
      sum = wrongSums[Math.floor(Math.random() * wrongSums.length)];
    }
    
    return generateDiceWithSum(sum);
  };

  const generateDiceWithSum = (targetSum) => {
    let attempts = 0;
    while (attempts < 1000) {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const d3 = targetSum - d1 - d2;
      
      if (d3 >= 1 && d3 <= 6) {
        return [d1, d2, d3];
      }
      attempts++;
    }
    
    for (let d1 = 1; d1 <= 6; d1++) {
      for (let d2 = 1; d2 <= 6; d2++) {
        const d3 = targetSum - d1 - d2;
        if (d3 >= 1 && d3 <= 6) {
          return [d1, d2, d3];
        }
      }
    }
    
    return [1, 1, targetSum - 2];
  };

  const calculateResult = (dice, sum, userBetType, userBetAmount) => {
    const totalBet = getTotalBet();
    const unique = [...new Set(dice)];
    const isTriple = unique.length === 1;
    
    let smallWin = !isTriple && sum >= 3 && sum <= 10;
    let bigWin = !isTriple && sum >= 11 && sum <= 18;
    
    let netProfit = 0;
    let winType = '';
    
    if (bets.small > 0) {
      if (smallWin) {
        netProfit += bets.small;
        winType = 'Small';
      } else {
        netProfit -= bets.small;
      }
    }
    
    if (bets.big > 0) {
      if (bigWin) {
        netProfit += bets.big;
        winType = winType ? 'Both' : 'Big';
      } else {
        netProfit -= bets.big;
      }
    }
    
    setBalance(prev => prev + totalBet + netProfit);
    
    if (netProfit > 0) {
      setResultMessage(`🎉 You Win! +$${netProfit}`);
    } else if (netProfit < 0) {
      setResultMessage(`😢 You Lose -$${Math.abs(netProfit)}`);
    } else {
      setResultMessage(`🤝 Push!`);
    }

    const record = {
      id: Date.now(),
      dice: [...dice],
      sum: sum,
      betType: userBetType,
      betAmount: userBetAmount,
      netProfit: netProfit,
      balanceAfter: balance + netProfit
    };
    
    setHistory(prev => [record, ...prev]);
    setBets({ small: 0, big: 0 });
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

  const totalBet = getTotalBet();
  const canRoll = totalBet > 0 && !isRolling;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Simple Sic Bo</h2>
      <p style={styles.subtitle}>Set your win rate and beat the house!</p>

      <div style={styles.controlBar}>
        <div style={styles.winRateGroup}>
          <span style={styles.label}>Win Rate:</span>
          <input
            type="number"
            value={winRate}
            onChange={(e) => setWinRate(parseInt(e.target.value, 10) || 0)}
            style={styles.winRateInput}
            min="0"
            max="100"
          />
          <span style={styles.label}>%</span>
          <button style={styles.setButton} onClick={handleSetWinRate}>
            Set
          </button>
        </div>
        <div style={styles.balanceDisplay}>
          Balance: ${balance}
        </div>
      </div>

      <div style={styles.diceSection}>
        <div style={styles.diceRow}>
          {rollingValues.map((value, index) => renderDice(value, index))}
        </div>
        <div style={results ? styles.sumDisplay : styles.sumDisplayHidden}>
          Sum: {results ? results.sum : 0}
        </div>
      </div>

      <div style={styles.betSection}>
        <button
          style={{
            ...styles.betButton,
            ...(bets.small > 0 ? styles.betButtonActive : {}),
          }}
          onClick={() => placeBet('small')}
          disabled={isRolling}
        >
          <span style={styles.betName}>Small</span>
          <span style={styles.betOdds}>1:1</span>
          {bets.small > 0 && <span style={styles.betAmount}>${bets.small}</span>}
        </button>

        <button
          style={{
            ...styles.betButton,
            ...(bets.big > 0 ? styles.betButtonActive : {}),
          }}
          onClick={() => placeBet('big')}
          disabled={isRolling}
        >
          <span style={styles.betName}>Big</span>
          <span style={styles.betOdds}>1:1</span>
          {bets.big > 0 && <span style={styles.betAmount}>${bets.big}</span>}
        </button>
      </div>

      <div style={styles.actionRow}>
        <button
          style={{
            ...styles.rollButton,
            ...(!canRoll ? styles.rollButtonDisabled : {}),
          }}
          onClick={rollDice}
          disabled={!canRoll}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>

      <div style={resultMessage ? styles.resultMessage : styles.resultPlaceholder}>
        {resultMessage || 'Rolling...'}
      </div>

      <div style={styles.historySection}>
        <div style={styles.historyHeader}>
          <span style={styles.historyTitle}>History ({history.length})</span>
          <button style={styles.resetButton} onClick={resetGame}>
            Reset Game
          </button>
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
                <div style={styles.historyDetail}>
                  <span>{record.betType} ${record.betAmount}</span>
                  <span style={{ color: record.netProfit >= 0 ? '#16a34a' : '#dc2626' }}>
                    {record.netProfit >= 0 ? '+' : ''}${record.netProfit}
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
    maxWidth: '500px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  title: { fontSize: '24px', fontWeight: '700', color: '#1e40af', margin: '0 0 4px 0', textAlign: 'center' },
  subtitle: { fontSize: '14px', color: '#64748b', margin: '0 0 16px 0', textAlign: 'center' },
  controlBar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px', background: '#f8fafc', borderRadius: '10px', marginBottom: '16px',
  },
  winRateGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#475569' },
  winRateInput: {
    width: '60px', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1',
    fontSize: '14px', textAlign: 'center',
  },
  setButton: {
    padding: '6px 12px', borderRadius: '6px', border: 'none',
    background: '#3b82f6', color: '#fff', fontSize: '12px', cursor: 'pointer',
  },
  balanceDisplay: { fontSize: '18px', fontWeight: '700', color: '#1e293b' },
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
  betSection: { display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '16px' },
  betButton: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px',
    borderRadius: '12px', border: '2px solid #e2e8f0', background: '#f8fafc',
    cursor: 'pointer', position: 'relative', transition: 'all 0.2s ease',
    maxWidth: '150px',
  },
  betButtonActive: { border: '2px solid #3b82f6', background: '#eff6ff' },
  betName: { fontSize: '18px', fontWeight: '700', color: '#1e293b' },
  betOdds: { fontSize: '14px', fontWeight: '600', color: '#8b5cf6', marginTop: '4px' },
  betAmount: {
    position: 'absolute', top: '-8px', right: '-8px', background: '#3b82f6',
    color: '#fff', fontSize: '12px', fontWeight: '700', padding: '4px 8px', borderRadius: '10px',
  },
  actionRow: { display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '16px' },
  clearButton: {
    padding: '12px 20px', borderRadius: '8px', border: 'none',
    background: '#f1f5f9', color: '#475569', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
  },
  rollButton: {
    padding: '12px 28px', borderRadius: '8px', border: 'none',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
  },
  rollButtonDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  resultMessage: { textAlign: 'center', padding: '12px', fontSize: '18px', fontWeight: '700', marginBottom: '16px', borderRadius: '8px' },
  resultPlaceholder: { textAlign: 'center', padding: '12px', fontSize: '18px', fontWeight: '700', marginBottom: '16px', borderRadius: '8px', color: 'transparent' },
  historySection: {
    border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', background: '#fff',
  },
  historyHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  historyTitle: { fontSize: '14px', fontWeight: '700', color: '#1e293b' },
  resetButton: {
    padding: '4px 10px', borderRadius: '4px', border: 'none',
    background: '#ef4444', color: '#fff', fontSize: '11px', cursor: 'pointer',
  },
  noHistory: { textAlign: 'center', color: '#94a3b8', fontSize: '13px', padding: '20px' },
  historyList: { display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' },
  historyItem: { padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' },
  historyDice: { fontSize: '14px', fontWeight: '700', color: '#1e40af', marginBottom: '4px' },
  historyDetail: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' },
};
