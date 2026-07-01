import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

function Home() {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <div className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold">Octofit Tracker</h1>
          <p className="lead text-muted">
            A modern multi-tier app for tracking workouts, managing teams, and competing on a live leaderboard.
          </p>
          <div className="d-flex flex-wrap gap-3 mt-4">
            <Link className="btn btn-primary btn-lg" to="/activities">Explore data</Link>
            <a className="btn btn-outline-secondary btn-lg" href={`${apiBaseUrl}/api/health`} target="_blank" rel="noreferrer">
              Check API
            </a>
          </div>
          <div className="alert alert-info mt-4" role="alert">
            Define VITE_CODESPACE_NAME in .env.local when running in GitHub Codespaces, for example
            {' '}
            <code>VITE_CODESPACE_NAME=your-codespace-name</code>.
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h4">What&apos;s included</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item">React 19 + Vite frontend</li>
                <li className="list-group-item">Express + TypeScript API</li>
                <li className="list-group-item">MongoDB-ready Mongoose setup</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-semibold" to="/">Octofit</Link>
          <div className="navbar-nav ms-auto">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/activities">
              Activities
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/teams">
              Teams
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/users">
              Users
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </>
  );
}

export default App;
