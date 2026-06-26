import { useEffect, useState } from 'react';

type Activity = {
  type?: string;
  durationMinutes?: number;
  calories?: number;
  completedAt?: string;
  user?: { name?: string; email?: string };
};

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const codespace = import.meta.env.VITE_CODESPACE_NAME;
    const API_BASE = codespace
      ? `https://${codespace}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';

    fetch(`${API_BASE}/activities/`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : data.items || data.data || data.activities || [];
        setActivities(items);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && activities.length === 0 && <p>No activities found.</p>}
      {activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>User</th>
                <th>Calories</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={`${activity.type ?? 'activity'}-${idx}`}>
                  <td>{activity.type ?? 'Unknown'}</td>
                  <td>{activity.durationMinutes != null ? `${activity.durationMinutes} min` : 'N/A'}</td>
                  <td>{activity.user?.name ?? activity.user?.email ?? 'Unknown'}</td>
                  <td>{activity.calories != null ? `${activity.calories} cal` : '—'}</td>
                  <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleString() : 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
