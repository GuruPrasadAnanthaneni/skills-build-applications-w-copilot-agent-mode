import { useEffect, useState } from 'react';
import { fetchApi } from '../lib/api';

type Workout = {
  name?: string;
  durationMinutes?: number;
  difficulty?: string;
  description?: string;
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<Workout>('workouts')
      .then(setWorkouts)
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
                <th>Name</th>
                <th>Duration</th>
                <th>Difficulty</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={`${workout.name ?? 'workout'}-${idx}`}>
                  <td>{workout.name ?? 'Unnamed'}</td>
                  <td>{workout.durationMinutes != null ? `${workout.durationMinutes} min` : 'N/A'}</td>
                  <td>{workout.difficulty ?? 'N/A'}</td>
                  <td>{workout.description ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
