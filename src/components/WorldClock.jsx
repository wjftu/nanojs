import React, { useState, useEffect, useMemo } from 'react';

const regionMap = {
  'Africa': 'Africa',
  'America': 'America',
  'Antarctica': 'Antarctica',
  'Arctic': 'Arctic',
  'Asia': 'Asia',
  'Atlantic': 'Atlantic',
  'Australia': 'Australia',
  'Europe': 'Europe',
  'Indian': 'Indian',
  'Pacific': 'Pacific',
};

const countryMultiTimezoneMap = {
  'China': ['Asia/Shanghai', 'Asia/Hong_Kong', 'Asia/Macau', 'Asia/Urumqi'],
  'USA': ['America/New_York', 'America/Chicago', 'America/Los_Angeles', 'America/Denver', 'America/Phoenix', 'America/Anchorage', 'Pacific/Honolulu'],
  'US': ['America/New_York', 'America/Chicago', 'America/Los_Angeles', 'America/Denver', 'America/Phoenix', 'America/Anchorage', 'Pacific/Honolulu'],
  'Australia': ['Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane', 'Australia/Perth', 'Australia/Adelaide'],
  'UK': ['Europe/London'],
  'United Kingdom': ['Europe/London'],
};

const countryTimezoneMap = {
  'New York': 'America/New_York',
  'Los Angeles': 'America/Los_Angeles',
  'Chicago': 'America/Chicago',
  'London': 'Europe/London',
  'Paris': 'Europe/Paris',
  'Berlin': 'Europe/Berlin',
  'Tokyo': 'Asia/Tokyo',
  'Shanghai': 'Asia/Shanghai',
  'Beijing': 'Asia/Shanghai',
  'Hong Kong': 'Asia/Hong_Kong',
  'Hong_Kong': 'Asia/Hong_Kong',
  'Singapore': 'Asia/Singapore',
  'Sydney': 'Australia/Sydney',
  'Melbourne': 'Australia/Melbourne',
  'Dubai': 'Asia/Dubai',
  'Mumbai': 'Asia/Kolkata',
  'Delhi': 'Asia/Kolkata',
  'Seoul': 'Asia/Seoul',
  'Moscow': 'Europe/Moscow',
  'Cairo': 'Africa/Cairo',
  'Johannesburg': 'Africa/Johannesburg',
  'Sao Paulo': 'America/Sao_Paulo',
  'Toronto': 'America/Toronto',
  'Vancouver': 'America/Vancouver',
  'Bangkok': 'Asia/Bangkok',
  'Jakarta': 'Asia/Jakarta',
  'Manila': 'Asia/Manila',
  'Kuala Lumpur': 'Asia/Kuala_Lumpur',
  'Taipei': 'Asia/Taipei',
  'Istanbul': 'Europe/Istanbul',
  'Rome': 'Europe/Rome',
  'Madrid': 'Europe/Madrid',
  'Amsterdam': 'Europe/Amsterdam',
  'Vienna': 'Europe/Vienna',
  'Stockholm': 'Europe/Stockholm',
  'Warsaw': 'Europe/Warsaw',
  'Athens': 'Europe/Athens',
  'Lisbon': 'Europe/Lisbon',
  'Dublin': 'Europe/Dublin',
  'Zurich': 'Europe/Zurich',
  'Brussels': 'Europe/Brussels',
  'Copenhagen': 'Europe/Copenhagen',
  'Helsinki': 'Europe/Helsinki',
  'Oslo': 'Europe/Oslo',
  'Reykjavik': 'Atlantic/Reykjavik',
  'Auckland': 'Pacific/Auckland',
  'Fiji': 'Pacific/Fiji',
  'Honolulu': 'Pacific/Honolulu',
  'Guam': 'Pacific/Guam',
  'Abu Dhabi': 'Asia/Dubai',
  'Riyadh': 'Asia/Riyadh',
  'Tel Aviv': 'Asia/Jerusalem',
  'Macau': 'Asia/Macau',
  'Urumqi': 'Asia/Urumqi',
  'Chongqing': 'Asia/Chongqing',
};

export default function WorldClock() {
  const [time, setTime] = useState(new Date());
  const [search, setSearch] = useState('');
  const [hour12, setHour12] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const timeZones = useMemo(() => Intl.supportedValuesOf('timeZone'), []);

  const filteredTimeZones = useMemo(() => {
    if (!search) {
      return timeZones.map(tz => {
        const timeString = time.toLocaleTimeString('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12,
        });
        const dateString = time.toLocaleDateString('en-US', {
          timeZone: tz,
          month: 'short',
          day: 'numeric',
          weekday: 'short',
        });
        const offset = time.toLocaleTimeString('en-US', {
          timeZone: tz,
          timeZoneName: 'short',
        }).split(' ').pop();
        return { name: tz, time: timeString, date: dateString, offset };
      });
    }

    const searchLower = search.toLowerCase();

    const multiTimezones = Object.entries(countryMultiTimezoneMap).find(
      ([key]) => key.toLowerCase() === searchLower
    )?.[1];

    const singleTimezone = Object.entries(countryTimezoneMap).find(
      ([key]) => key.toLowerCase() === searchLower
    )?.[1];

    const filtered = timeZones.filter(tz => {
      const searchRegion = regionMap[searchLower];
      if (searchRegion) {
        return tz.startsWith(searchRegion + '/');
      }

      if (multiTimezones) {
        return multiTimezones.includes(tz);
      }

      if (singleTimezone) {
        return tz === singleTimezone;
      }

      return tz.toLowerCase().includes(searchLower);
    });

    return filtered
      .map(tz => {
        const timeString = time.toLocaleTimeString('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12,
        });
        const dateString = time.toLocaleDateString('en-US', {
          timeZone: tz,
          month: 'short',
          day: 'numeric',
          weekday: 'short',
        });
        const offset = time.toLocaleTimeString('en-US', {
          timeZone: tz,
          timeZoneName: 'short',
        }).split(' ').pop();
        return { name: tz, time: timeString, date: dateString, offset };
      });
  }, [timeZones, search, time, hour12]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>World Clock</h2>
        <p style={styles.subtitle}>Current time in all timezones around the world</p>
        <div style={styles.controls}>
          <div style={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search timezone, country or city (e.g., Asia, China, London)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.search}
            />
            {search && (
              <button style={styles.clearBtn} onClick={() => setSearch('')}>X</button>
            )}
          </div>
          <div style={styles.toggleContainer}>
            <span style={{ ...styles.toggleLabel, color: !hour12 ? '#1e3a5f' : '#64748b' }}>12h</span>
            <div style={styles.toggleSwitch} onClick={() => setHour12(!hour12)}>
              <div style={{
                ...styles.toggleSlider,
                transform: hour12 ? 'translateX(0)' : 'translateX(26px)',
              }} />
            </div>
            <span style={{ ...styles.toggleLabel, color: hour12 ? '#1e3a5f' : '#64748b' }}>24h</span>
          </div>
        </div>
      </div>
      <div style={styles.stats}>
        Showing <strong>{filteredTimeZones.length}</strong> of <strong>{timeZones.length}</strong> timezones
      </div>
      <div style={styles.grid}>
        {filteredTimeZones.length === 0 ? (
          <div style={styles.noResult}>
            <p>No timezones found for "{search}"</p>
          </div>
        ) : (
          filteredTimeZones.map((tz) => (
            <div key={tz.name} style={styles.card}>
              <div style={styles.timezone}>{tz.name}</div>
              <div style={styles.time}>{tz.time}</div>
              <div style={styles.cardFooter}>
                <span style={styles.date}>{tz.date}</span>
                <span style={styles.offset}>{tz.offset}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    background: 'linear-gradient(135deg, #e0f2fe 0%, #f3e8ff 100%)',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '20px',
    textAlign: 'center',
    border: '1px solid #e0e7ff',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e40af',
    margin: '0 0 8px 0',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '15px',
    margin: '0 0 24px 0',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  searchWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
  },
  search: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '2px solid #cbd5e1',
    fontSize: '15px',
    outline: 'none',
    background: '#fff',
    color: '#333',
    boxSizing: 'border-box',
  },
  clearBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: '#cbd5e1',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
  },
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#fff',
    padding: '6px 16px',
    borderRadius: '30px',
    border: '1px solid #cbd5e1',
  },
  toggleLabel: {
    fontSize: '14px',
    fontWeight: '600',
    transition: 'color 0.2s ease',
  },
  toggleSwitch: {
    width: '56px',
    height: '28px',
    background: '#cbd5e1',
    borderRadius: '14px',
    padding: '2px',
    cursor: 'pointer',
    position: 'relative',
  },
  toggleSlider: {
    width: '24px',
    height: '24px',
    background: '#64748b',
    borderRadius: '50%',
    transition: 'transform 0.2s ease',
  },
  stats: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '14px',
    color: '#64748b',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '16px',
    maxHeight: '600px',
    overflowY: 'auto',
    padding: '5px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '18px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  timezone: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: '8px',
  },
  time: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Mono", monospace',
    letterSpacing: '-0.5px',
    marginBottom: '8px',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: '12px',
    color: '#64748b',
  },
  offset: {
    fontSize: '11px',
    color: '#475569',
    background: '#f1f5f9',
    padding: '3px 8px',
    borderRadius: '6px',
    fontWeight: '600',
  },
  noResult: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '60px 20px',
    color: '#94a3b8',
  },
};
