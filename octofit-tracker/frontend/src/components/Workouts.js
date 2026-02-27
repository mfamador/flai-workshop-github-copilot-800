import React, { useState, useEffect } from 'react';

const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${API_BASE}/workouts/`;
    console.log('Workouts: fetching from', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <div className="row">
        {workouts.map(workout => (
          <div key={workout.id} className="col-md-6 mb-3">
            <div className="card h-100">
              <div className="card-header bg-dark text-white">
                <h6 className="mb-0">{workout.name}</h6>
              </div>
              <div className="card-body">
                <p className="card-text">{workout.description}</p>
                <span className="badge bg-secondary">Duration: {workout.duration} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
