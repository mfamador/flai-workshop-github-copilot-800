import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  return (
    <div className="container mt-4">
      <div className="hero-section mb-4">
        <h1>Your fitness,<br /><span className="hero-accent">reimagined.</span></h1>
        <p className="lead mt-3">Track activities, compete with your team, and reach your goals — all in one place.</p>
        <div className="mt-4 d-flex gap-2 justify-content-center flex-wrap">
          <NavLink to="/activities" className="btn-apple-primary">Get Started</NavLink>
          <NavLink to="/leaderboard" className="btn-apple-ghost">View Leaderboard</NavLink>
        </div>
      </div>
      <div className="row g-3">
        {[
          { to: '/users',       icon: '👤', label: 'Users' },
          { to: '/teams',       icon: '🏆', label: 'Teams' },
          { to: '/activities',  icon: '🏃', label: 'Activities' },
          { to: '/workouts',    icon: '💪', label: 'Workouts' },
        ].map(({ to, icon, label }) => (
          <div key={to} className="col-6 col-lg-3">
            <NavLink to={to} className="text-decoration-none">
              <div className="stat-card">
                <span className="stat-icon">{icon}</span>
                <div className="stat-label">{label}</div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg octofit-navbar sticky-top">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
              {[['/', 'Home'], ['/users', 'Users'], ['/teams', 'Teams'],
                ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/workouts', 'Workouts']
              ].map(([path, label]) => (
                <li className="nav-item" key={path}>
                  <NavLink
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                    to={path}
                    end={path === '/'}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;


function Home() {
  return (
    <div className="container mt-4">
      <div className="hero-section text-center mb-4">
        <h1>Welcome to <span className="hero-accent">OctoFit</span> Tracker</h1>
        <p className="lead mt-3">Track your fitness activities, compete with your team, and stay motivated!</p>
        <div className="mt-4">
          <NavLink to="/activities" className="btn btn-danger btn-lg me-2">Get Started</NavLink>
          <NavLink to="/leaderboard" className="btn btn-outline-light btn-lg">View Leaderboard</NavLink>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-sm-6 col-lg-3">
          <NavLink to="/users" className="text-decoration-none">
            <div className="stat-card">
              <div className="stat-icon">👤</div>
              <div className="stat-label">Users</div>
            </div>
          </NavLink>
        </div>
        <div className="col-sm-6 col-lg-3">
          <NavLink to="/teams" className="text-decoration-none">
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-label">Teams</div>
            </div>
          </NavLink>
        </div>
        <div className="col-sm-6 col-lg-3">
          <NavLink to="/activities" className="text-decoration-none">
            <div className="stat-card">
              <div className="stat-icon">🏃</div>
              <div className="stat-label">Activities</div>
            </div>
          </NavLink>
        </div>
        <div className="col-sm-6 col-lg-3">
          <NavLink to="/workouts" className="text-decoration-none">
            <div className="stat-card">
              <div className="stat-icon">💪</div>
              <div className="stat-label">Workouts</div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {[['/', 'Home'], ['/users', 'Users'], ['/teams', 'Teams'],
                ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/workouts', 'Workouts']
              ].map(([path, label]) => (
                <li className="nav-item" key={path}>
                  <NavLink
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                    to={path}
                    end={path === '/'}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
