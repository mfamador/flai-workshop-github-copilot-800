import React, { useState, useEffect } from 'react';

const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;

const durationPill = d => d <= 30 ? 'apple-pill-green' : d <= 60 ? 'apple-pill-orange' : 'apple-pill-red';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/workouts/`)
      .then(r => r.json())
      .then(d => { setWorkouts(Array.isArray(d) ? d : d.results || []); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="apple-spinner" />
      <p style={{ color: 'var(--apple-secondary)', fontSize: '0.9rem' }}>Loading workouts…</p>
    </div>
  );

  if (error) return (<div className="container mt-4"><div className="apple-alert">{error}</div></div>);

  return (
    <div className="container mt-4">
      <h2 className="page-heading">Workouts</h2>
      <p className="page-subheading">{workouts.length} workout plan{workouts.length !== 1 ? 's' : ''} available</p>
      <div className="row g-3">
        {workouts.map(workout => (
          <div key={workout.id} className="col-md-6 col-xl-4">
            <div className="apple-card h-100">
              <div className="apple-card-header">
                <h6>{workout.name}</h6>
                <span className={`apple-pill ${durationPill(workout.duration)}`}>{workout.duration} min</span>
              </div>
              <div className="apple-card-body">
                <p style={{ color: 'var(--apple-secondary)', fontSize: '0.875rem', lineHeight: 1.55, margin: 0 }}>{workout.description}</p>
              </div>
              <div style={{ padding: '0.85rem 1.4rem 1rem', borderTop: '1px solid var(--apple-separator)' }}>
                <div className="apple-progress">
                  <div className="apple-progress-fill" style={{ width: `${Math.min((workout.duration / 120) * 100, 100)}%` }} />
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


