import React, { useState, useEffect } from 'react';

const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${API_BASE}/teams/`;
    console.log('Teams: fetching from', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2 text-muted">Loading teams...</p>
    </div>
  );

  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <strong>Error loading teams:</strong>&nbsp;{error}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="page-heading">Teams</h2>
      <p className="text-muted mb-3">{teams.length} team{teams.length !== 1 ? 's' : ''} competing</p>
      <div className="row g-4">
        {teams.map(team => (
          <div key={team.id} className="col-lg-6">
            <div className="card octofit-card h-100">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">{team.name}</h5>
                <span className="badge bg-danger rounded-pill">
                  {team.members ? team.members.length : 0} members
                </span>
              </div>
              <div className="card-body p-0">
                <div className="octofit-table">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team.members && team.members.map(member => (
                        <tr key={member.id}>
                          <td><strong>{member.name}</strong></td>
                          <td><small className="text-muted">{member.email}</small></td>
                          <td><span className="badge bg-light text-dark border">{member.age}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;

