import React, { useState, useEffect } from 'react';

const API_BASE = 'https://opulent-capybara-6467x4q965hxq57-8000.app.github.dev/api';

const activityStyle = {
  Running:         'apple-pill-green',
  Cycling:         'apple-pill-blue',
  Yoga:            'apple-pill-teal',
  Weightlifting:   'apple-pill-orange',
  Swimming:        'apple-pill-blue',
  'Martial Arts':  'apple-pill-red',
  Flying:          'apple-pill-purple',
  'Combat Training':'apple-pill-red',
  'Ring Training': 'apple-pill-green',
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/activities/`)
      .then(r => r.json())
      .then(d => { setActivities(Array.isArray(d) ? d : d.results || []); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="apple-spinner" />
      <p style={{ color: 'var(--apple-secondary)', fontSize: '0.9rem' }}>Loading activities…</p>
    </div>
  );

  if (error) return (<div className="container mt-4"><div className="apple-alert">{error}</div></div>);

  return (
    <div className="container mt-4">
      <h2 className="page-heading">Activities</h2>
      <p className="page-subheading">{activities.length} activit{activities.length !== 1 ? 'ies' : 'y'} recorded</p>
      <div className="apple-table-wrap">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Athlete</th>
              <th>Activity</th>
              <th>Duration</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={activity.id}>
                <td><span className="apple-pill apple-pill-gray">{index + 1}</span></td>
                <td><strong>{activity.user?.name || `User #${activity.user}`}</strong></td>
                <td><span className={`apple-pill ${activityStyle[activity.activity_type] || 'apple-pill-gray'}`}>{activity.activity_type}</span></td>
                <td style={{ color: 'var(--apple-secondary)' }}>{activity.duration} min</td>
                <td style={{ color: 'var(--apple-secondary)', fontSize: '0.875rem' }}>{activity.date ? activity.date.split('-').reverse().join('/') : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;


