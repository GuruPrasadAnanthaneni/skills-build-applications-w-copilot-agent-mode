import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { API_BASE, codespace } from './lib/api';

function App() {
  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="lead">Modern fitness tracking for teams, workouts, and leaderboards.</p>
        {codespace ? (
          <div className="alert alert-info">
            Using API endpoint <strong>{API_BASE}</strong> for codespace <strong>{codespace}</strong>.
          </div>
        ) : (
          <div className="alert alert-warning">
            VITE_CODESPACE_NAME is not set. Falling back to <code>{API_BASE}</code>.
            Define it in <code>frontend/.env.local</code> or <code>.env.local</code>.
          </div>
        )}
      </header>

      <nav className="mb-4">
        <ul className="nav nav-pills flex-wrap gap-2">
          <li className="nav-item">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/users" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/teams" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Teams
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/activities" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Activities
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/workouts" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Workouts
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Leaderboard
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <section>
              <h2>Welcome</h2>
              <p>Browse the sections above to view tracker data from the backend API.</p>
            </section>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route
          path="*"
          element={
            <section>
              <h2>Not Found</h2>
              <p>Page not found. Use the navigation above to access tracker views.</p>
            </section>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
