import { useEffect, useState } from 'react';

type Workout = {
  title?: string;
  durationMinutes?: number;
  level?: string;
  focus?: string;
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const codespace = import.meta.env.VITE_CODESPACE_NAME;
    const API_BASE = codespace
      ? `https://${codespace}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';

    fetch(`${API_BASE}/workouts/`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : data.items || data.data || data.workouts || [];
        setWorkouts(items);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && workouts.length === 0 && <p>No workouts found.</p>}
      {workouts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Level</th>
                <th>Focus</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={`${workout.title ?? 'workout'}-${idx}`}>
                  <td>{workout.title ?? 'Unnamed'}</td>
                  <td>{workout.durationMinutes != null ? `${workout.durationMinutes} min` : 'N/A'}</td>
                  <td>{workout.level ?? 'N/A'}</td>
                  <td>{workout.focus ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
