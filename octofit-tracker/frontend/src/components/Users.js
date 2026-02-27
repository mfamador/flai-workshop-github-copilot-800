import React, { useState, useEffect } from 'react';

const API_BASE = 'https://opulent-capybara-6467x4q965hxq57-8000.app.github.dev/api';

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

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`${API_BASE}/users/${user.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, username: form.username, email: form.email, age: parseInt(form.age, 10) }),
      });
      if (!res.ok) throw new Error(`Failed to update user (${res.status})`);
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
    <div className="apple-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="apple-modal">
        <div className="apple-modal-header">
          <h5>Edit Profile</h5>
          <button className="apple-close-btn" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="apple-modal-body">
            {saveError && <div className="apple-alert mb-3">{saveError}</div>}
            <div className="mb-3">
              <label className="apple-label">Full Name</label>
              <input className="apple-input" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="apple-label">Username</label>
              <div className="apple-input-group">
                <span className="apple-input-prefix">@</span>
                <input name="username" value={form.username} onChange={handleChange} required />
              </div>
            </div>
            <div className="mb-3">
              <label className="apple-label">Email</label>
              <input className="apple-input" type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="apple-label">Age</label>
              <input className="apple-input" type="number" name="age" value={form.age} onChange={handleChange} required min="1" />
            </div>
            <div>
              <label className="apple-label">Team</label>
              <select className="apple-input" name="team_id" value={form.team_id} onChange={handleChange}>
                <option value="">— No team —</option>
                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
          </div>
          <div className="apple-modal-footer">
            <button type="button" className="btn-apple-subtle" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="submit" className="btn-apple" disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
          </div>
        </form>
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

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/users/`).then(r => r.json()).then(d => Array.isArray(d) ? d : d.results || []),
      fetch(`${API_BASE}/teams/`).then(r => r.json()).then(d => Array.isArray(d) ? d : d.results || []),
    ])
      .then(([u, t]) => { setUsers(u); setTeams(t); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  const handleSave = updated => {
    setUsers(prev => prev.map(u => u.id === updated.id ? { ...u, ...updated } : u));
    setEditingUser(null);
  };

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="apple-spinner" />
      <p style={{ color: 'var(--apple-secondary)', fontSize: '0.9rem' }}>Loading users…</p>
    </div>
  );

  if (error) return (
    <div className="container mt-4"><div className="apple-alert">{error}</div></div>
  );

  return (
    <div className="container mt-4">
      {editingUser && <EditUserModal user={editingUser} teams={teams} onSave={handleSave} onClose={() => setEditingUser(null)} />}
      <h2 className="page-heading">Users</h2>
      <p className="page-subheading">{users.length} registered athlete{users.length !== 1 ? 's' : ''}</p>
      <div className="apple-table-wrap">
        <table className="table mb-0">
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
                <td><span className="apple-pill apple-pill-gray">{index + 1}</span></td>
                <td><strong>{user.name}</strong></td>
                <td><span style={{ color: 'var(--apple-secondary)' }}>@{user.username}</span></td>
                <td><a href={`mailto:${user.email}`} style={{ color: 'var(--apple-blue)', textDecoration: 'none' }}>{user.email}</a></td>
                <td><span className="apple-pill apple-pill-gray">{user.age} yrs</span></td>
                <td>
                  {user.current_team
                    ? <span className="apple-pill apple-pill-blue">{user.current_team.name}</span>
                    : <span style={{ color: 'var(--apple-tertiary)' }}>—</span>}
                </td>
                <td>
                  <button className="btn-apple-subtle" style={{ padding: '0.3rem 0.85rem', fontSize: '0.8rem' }} onClick={() => setEditingUser(user)}>Edit</button>
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
