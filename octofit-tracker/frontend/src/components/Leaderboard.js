import React, { useState, useEffect } from 'react';

const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;

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

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries
            .slice()
            .sort((a, b) => b.score - a.score)
            .map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.user && entry.user.name ? entry.user.name : entry.user}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
