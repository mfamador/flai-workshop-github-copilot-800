import React, { useState, useEffect } from 'react';

const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/teams/`)
      .then(r => r.json())
      .then(d => { setTeams(Array.isArray(d) ? d : d.results || []); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="apple-spinner" />
      <p style={{ color: 'var(--apple-secondary)', fontSize: '0.9rem' }}>Loading teams…</p>
    </div>
  );

  if (error) return (<div className="container mt-4"><div className="apple-alert">{error}</div></div>);

  return (
    <div className="container mt-4">
      <h2 className="page-heading">Teams</h2>
      <p className="page-subheading">{teams.length} team{teams.length !== 1 ? 's' : ''} competing</p>
      <div className="row g-4">
        {teams.map(team => (
          <div key={team.id} className="col-lg-6">
            <div className="apple-card h-100">
              <div className="apple-card-header">
                <h5>{team.name}</h5>
                <span className="apple-pill apple-pill-blue">{team.members?.length || 0} members</span>
              </div>
              <div className="apple-table-wrap" style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}>
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.members && team.members.map(member => (
                      <tr key={member.id}>
                        <td><strong>{member.name}</strong></td>
                        <td><span style={{ color: 'var(--apple-secondary)' }}>@{member.username}</span></td>
                        <td><span className="apple-pill apple-pill-gray">{member.age} yrs</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;


