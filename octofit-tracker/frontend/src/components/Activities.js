import React, { useState, useEffect } from 'react';

const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;

const activityColors = {
  Running: 'success',
  Cycling: 'primary',
  Yoga: 'info',
  Weightlifting: 'warning',
  Swimming: 'primary',
  'Martial Arts': 'danger',
  Flying: 'secondary',
  'Combat Training': 'danger',
  'Ring Training': 'success',
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${API_BASE}/activities/`;
    console.log('Activities: fetching from', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Activities: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2 text-muted">Loading activities...</p>
    </div>
  );

  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <strong>Error loading activities:</strong>&nbsp;{error}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="page-heading">Activities</h2>
      <p className="text-muted mb-3">{activities.length} activit{activities.length !== 1 ? 'ies' : 'y'} recorded</p>
      <div className="octofit-table">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Activity Type</th>
              <th>Duration</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={activity.id}>
                <td><span className="badge bg-secondary">{index + 1}</span></td>
                <td><strong>{activity.user?.name || `User #${activity.user}`}</strong></td>
                <td>
                  <span className={`badge bg-${activityColors[activity.activity_type] || 'secondary'}`}>
                    {activity.activity_type}
                  </span>
                </td>
                <td>{activity.duration} min</td>
                <td><small className="text-muted">{activity.date ? activity.date.split('-').reverse().join('/') : ''}</small></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;

