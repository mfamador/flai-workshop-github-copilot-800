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

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {teams.map(team => (
        <div key={team.id} className="card mb-3">
          <div className="card-header bg-dark text-white">
            <h5 className="mb-0">{team.name}</h5>
          </div>
          <div className="card-body">
            <table className="table table-sm mb-0">
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
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Teams;
