import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function Home() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold">Octofit Tracker</h1>
          <p className="lead text-muted">
            A modern multi-tier app for tracking workouts, managing teams, and competing on a live leaderboard.
          </p>
          <div className="d-flex gap-3 mt-4">
            <Link className="btn btn-primary btn-lg" to="/">Get started</Link>
            <a className="btn btn-outline-secondary btn-lg" href="http://localhost:8000/api/health" target="_blank" rel="noreferrer">
              Check API
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h4">What’s included</h2>
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
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Octofit</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
