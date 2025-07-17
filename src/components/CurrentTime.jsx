import React, { useState, useEffect } from 'react';

export default function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const timeString = time.toLocaleTimeString(undefined, {
    hour12: false,
    timeZoneName: 'short',
  });

  return (
    <div style={styles.container}>
      <div style={styles.clockBox}>
        <span style={styles.time}>{timeString}</span>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  clockBox: {
    backgroundColor: '#007BFF', // Bootstrap blue
    padding: '0.5rem 1.5rem',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    color: '#fff',
    fontFamily: 'Courier New, monospace',
  },
  time: {
    fontSize: '3rem',
    fontWeight: 'bold',
  },
};
