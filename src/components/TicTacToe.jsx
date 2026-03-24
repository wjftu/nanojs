import React, { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const winner = winPatterns.some(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  );

  const isDraw = !winner && board.every(cell => cell !== null);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;
    
    const newBoard = board.map((cell, i) => 
      i === index ? (xIsNext ? 'X' : 'O') : cell
    );
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const getStatus = () => {
    if (winner) return `Player ${xIsNext ? 'O' : 'X'} Wins!`;
    if (isDraw) return "It's a Draw!";
    return `Current: Player ${xIsNext ? 'X' : 'O'}`;
  };

  const getStatusStyle = () => {
    if (winner) return { ...styles.status, color: '#16a34a' };
    if (isDraw) return { ...styles.status, color: '#f59e0b' };
    return styles.status;
  };

  const getCellBorders = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    
    return {
      borderTop: row > 0 ? '2px solid #e2e8f0' : 'none',
      borderBottom: row < 2 ? '2px solid #e2e8f0' : 'none',
      borderLeft: col > 0 ? '2px solid #e2e8f0' : 'none',
      borderRight: col < 2 ? '2px solid #e2e8f0' : 'none',
    };
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tic-Tac-Toe</h2>
      
      <div style={getStatusStyle()}>
        {getStatus()}
      </div>

      <div style={styles.board}>
        {board.map((cell, index) => (
          <button
            key={index}
            style={{
              ...styles.cell,
              ...getCellBorders(index),
              ...(cell === 'X' ? styles.cellX : {}),
              ...(cell === 'O' ? styles.cellO : {}),
            }}
            onClick={() => handleClick(index)}
            disabled={!!cell || winner || isDraw}
          >
            {cell}
          </button>
        ))}
      </div>

      {(winner || isDraw) && (
        <button style={styles.newGameButton} onClick={resetGame}>
          New Game
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e40af',
    margin: '0 0 20px 0',
  },
  status: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '20px',
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 80px)',
    gridTemplateRows: 'repeat(3, 80px)',
    gap: '0',
    margin: '0 auto 20px',
  },
  cell: {
    width: '80px',
    height: '80px',
    fontSize: '36px',
    fontWeight: '700',
    borderRadius: '0',
    background: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    padding: '0',
    boxSizing: 'border-box',
  },
  cellX: {
    color: '#3b82f6',
    background: '#eff6ff',
  },
  cellO: {
    color: '#ef4444',
    background: '#fef2f2',
  },
  newGameButton: {
    padding: '12px 32px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#fff',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
  },
};
