import React, { useState, useRef, useEffect } from 'react';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [records, setRecords] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleStartStop = () => setIsRunning(prev => !prev);
  const recordTime = () => {
    if (isRunning) setRecords(prev => [...prev, formatTime(elapsedTime)]);
  };
  const clearTime = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setRecords([]);
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(ms % 1000).padStart(3, '0').substring(0, 2);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '40px auto',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      textAlign: 'center',
      fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
      fontSize: '32px',
      marginBottom: '20px',
      color: '#2c3e50',
    },
    time: {
      fontSize: '40px',
      fontFamily: 'monospace',
      color: '#333',
      marginBottom: '20px',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      flexWrap: 'wrap',
      marginBottom: '20px',
    },
    buttonBase: {
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '9999px',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background 0.2s ease',
    },
    start: {
      backgroundColor: '#28a745',
    },
    stop: {
      backgroundColor: '#dc3545',
    },
    record: {
      backgroundColor: '#007bff',
    },
    clear: {
      backgroundColor: '#6c757d',
    },
    records: {
      textAlign: 'center',
      maxHeight: '400px',
      overflowY: 'auto',
      borderTop: '1px solid #ddd',
      paddingTop: '10px',
    },
    recordTitle: {
      fontSize: '20px',
      marginBottom: '8px',
      color: '#444',
    },
    list: {
      paddingLeft: '40px',
    },
    listItem: {
      fontSize: '18px',
      marginBottom: '8px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⏱️ Stopwatch</h1>
      <div style={styles.time}>{formatTime(elapsedTime)}</div>

      <div style={styles.buttonGroup}>
        <button
          onClick={toggleStartStop}
          style={{
            ...styles.buttonBase,
            ...(isRunning ? styles.stop : styles.start),
          }}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={recordTime} style={{ ...styles.buttonBase, ...styles.record }}>
          Record
        </button>
        <button onClick={clearTime} style={{ ...styles.buttonBase, ...styles.clear }}>
          Clear
        </button>
      </div>

      {records.length > 0 && (
        <div style={styles.records}>
          <h2 style={styles.recordTitle}>📋 Records</h2>
          <ol style={styles.list}>
            {records.map((time, idx) => (
              <li key={idx} style={styles.listItem}>{time}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}