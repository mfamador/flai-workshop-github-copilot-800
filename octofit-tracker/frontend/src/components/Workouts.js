import React, { useState, useEffect } from 'react';

const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;

const durationColor = (duration) => {
  if (duration <= 30) return 'success';
  if (duration <= 60) return 'warning';
  return 'danger';
};

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

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2 text-muted">Loading workouts...</p>
    </div>
  );

  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <strong>Error loading workouts:</strong>&nbsp;{error}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="page-heading">Workouts</h2>
      <p className="text-muted mb-3">{workouts.length} workout plan{workouts.length !== 1 ? 's' : ''} available</p>
      <div className="row g-3">
        {workouts.map(workout => (
          <div key={workout.id} className="col-md-6 col-xl-4">
            <div className="card octofit-card h-100">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h6 className="mb-0">{workout.name}</h6>
                <span className={`badge bg-${durationColor(workout.duration)}`}>
                  {workout.duration} min
                </span>
              </div>
              <div className="card-body">
                <p className="card-text text-muted">{workout.description}</p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <div className="progress" style={{height: '6px'}}>
                  <div
                    className={`progress-bar bg-${durationColor(workout.duration)}`}
                    role="progressbar"
                    style={{width: `${Math.min((workout.duration / 120) * 100, 100)}%`}}
                    aria-valuenow={workout.duration}
                    aria-valuemin="0"
                    aria-valuemax="120"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;

