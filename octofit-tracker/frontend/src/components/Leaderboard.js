import React, { useState, useEffect } from 'react';

const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;

function RankBadge({ rank }) {
  const cls = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';
  return <span className={`rank-badge ${cls}`}>{rank}</span>;
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/leaderboard/`)
      .then(r => r.json())
      .then(d => { setEntries(Array.isArray(d) ? d : d.results || []); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="apple-spinner" />
      <p style={{ color: 'var(--apple-secondary)', fontSize: '0.9rem' }}>Loading leaderboard…</p>
    </div>
  );

  if (error) return (<div className="container mt-4"><div className="apple-alert">{error}</div></div>);

  const sorted = [...entries].sort((a, b) => b.score - a.score);
  const maxScore = sorted[0]?.score || 1;

  return (
    <div className="container mt-4">
      <h2 className="page-heading">Leaderboard</h2>
      <p className="page-subheading">{sorted.length} athlete{sorted.length !== 1 ? 's' : ''} ranked</p>
      <div className="apple-table-wrap">
        <table className="table mb-0">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Rank</th>
              <th>Athlete</th>
              <th>Team</th>
              <th>Score</th>
              <th style={{ minWidth: '140px' }}>Progress</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((entry, index) => {
              const rank = index + 1;
              const name = entry.user?.name || `User #${entry.user}`;
              const team = entry.user?.current_team?.name;
              const pct = Math.round((entry.score / maxScore) * 100);
              return (
                <tr key={entry.id}>
                  <td><RankBadge rank={rank} /></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--apple-secondary)' }}>{entry.user?.email}</div>
                  </td>
                  <td>
                    {team
                      ? <span className="apple-pill apple-pill-blue">{team}</span>
                      : <span style={{ color: 'var(--apple-tertiary)' }}>—</span>}
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--apple-black)', fontSize: '1rem' }}>{entry.score}</span>
                    <span style={{ color: 'var(--apple-secondary)', fontSize: '0.8rem' }}> pts</span>
                  </td>
                  <td>
                    <div className="apple-progress">
                      <div className="apple-progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;


