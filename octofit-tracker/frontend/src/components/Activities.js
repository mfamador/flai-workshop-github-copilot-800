import React, { useState, useEffect } from 'react';

const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;

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

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Activity Type</th>
            <th>Duration (min)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity.id}>
              <td>{activity.user}</td>
              <td>{activity.activity_type}</td>
              <td>{activity.duration}</td>
              <td>{activity.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
