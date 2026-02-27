import React, { useState, useEffect } from 'react';

const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;

function EditUserModal({ user, teams, onSave, onClose }) {
  const [form, setForm] = useState({
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    age: user.age || '',
    team_id: user.current_team ? user.current_team.id : '',
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    try {
      // Update user fields
      const res = await fetch(`${API_BASE}/users/${user.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          age: parseInt(form.age, 10),
        }),
      });
      if (!res.ok) throw new Error(`Failed to update user (${res.status})`);
      // Update team assignment
      await fetch(`${API_BASE}/users/${user.id}/assign_team/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team_id: form.team_id || null }),
      });
      const updated = await res.json();
      onSave({ ...updated, current_team: teams.find(t => String(t.id) === String(form.team_id)) || null });
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {saveError && <div className="alert alert-danger py-2">{saveError}</div>}
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <div className="input-group">
                  <span className="input-group-text">@</span>
                  <input className="form-control" name="username" value={form.username} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Age</label>
                <input className="form-control" type="number" name="age" value={form.age} onChange={handleChange} required min="1" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Team</label>
                <select className="form-select" name="team_id" value={form.team_id} onChange={handleChange}>
                  <option value="">— No team —</option>
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
              <button type="submit" className="btn btn-danger" disabled={saving}>
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = () =>
    fetch(`${API_BASE}/users/`)
      .then(res => res.json())
      .then(data => Array.isArray(data) ? data : data.results || []);

  const fetchTeams = () =>
    fetch(`${API_BASE}/teams/`)
      .then(res => res.json())
      .then(data => Array.isArray(data) ? data : data.results || []);

  useEffect(() => {
    Promise.all([fetchUsers(), fetchTeams()])
      .then(([u, t]) => { setUsers(u); setTeams(t); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  const handleSave = updatedUser => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? { ...u, ...updatedUser } : u));
    setEditingUser(null);
  };

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2 text-muted">Loading users...</p>
    </div>
  );

  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <strong>Error loading users:</strong>&nbsp;{error}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      {editingUser && (
        <EditUserModal
          user={editingUser}
          teams={teams}
          onSave={handleSave}
          onClose={() => setEditingUser(null)}
        />
      )}
      <h2 className="page-heading">Users</h2>
      <p className="text-muted mb-3">{users.length} registered superhero{users.length !== 1 ? 'es' : ''}</p>
      <div className="octofit-table">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Age</th>
              <th>Team</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td><span className="badge bg-secondary">{index + 1}</span></td>
                <td><strong>{user.name}</strong></td>
                <td><span className="text-muted">@{user.username}</span></td>
                <td><a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></td>
                <td><span className="badge bg-light text-dark border">{user.age} yrs</span></td>
                <td>
                  {user.current_team
                    ? <span className="badge bg-danger">{user.current_team.name}</span>
                    : <span className="text-muted small">—</span>}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setEditingUser(user)}
                    title="Edit user"
                  >
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;

