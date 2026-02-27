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
    const url = `${API_BASE}/leaderboard/`;
    console.log('Leaderboard: fetching from', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard: fetched data', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2 text-muted">Loading leaderboard...</p>
    </div>
  );

  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <strong>Error loading leaderboard:</strong>&nbsp;{error}
      </div>
    </div>
  );

  const sorted = [...entries].sort((a, b) => b.score - a.score);

  return (
    <div className="container mt-4">
      <h2 className="page-heading">Leaderboard</h2>
      <p className="text-muted mb-3">{sorted.length} athlete{sorted.length !== 1 ? 's' : ''} ranked</p>
      <div className="octofit-table">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th style={{width: '60px'}}>Rank</th>
              <th>Athlete</th>
              <th>Email</th>
              <th>Score</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((entry, index) => {
              const rank = index + 1;
              const name = entry.user && entry.user.name ? entry.user.name : `User #${entry.user}`;
              const email = entry.user && entry.user.email ? entry.user.email : '';
              const maxScore = sorted[0]?.score || 1;
              const pct = Math.round((entry.score / maxScore) * 100);
              return (
                <tr key={entry.id}>
                  <td><RankBadge rank={rank} /></td>
                  <td><strong>{name}</strong></td>
                  <td><small className="text-muted">{email}</small></td>
                  <td>
                    <span className="fw-bold text-danger">{entry.score}</span>
                    <small className="text-muted"> pts</small>
                  </td>
                  <td style={{minWidth: '120px'}}>
                    <div className="progress" style={{height: '8px'}}>
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{width: `${pct}%`}}
                        aria-valuenow={pct}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
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

