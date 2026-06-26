import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../lib/api';

type Activity = {
  type?: string;
  duration?: number;
  notes?: string;
  createdAt?: string;
  user?: { name?: string; email?: string };
};

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}/activities/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed (${response.status}) for ${apiBaseUrl}/activities/`);
        }
        return response.json();
      })
      .then(setActivities)
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
                <th>Notes</th>
                <th>Logged</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={`${activity.type ?? 'activity'}-${idx}`}>
                  <td>{activity.type ?? 'Unknown'}</td>
                  <td>{activity.duration != null ? `${activity.duration} min` : 'N/A'}</td>
                  <td>{activity.user?.name ?? activity.user?.email ?? 'Unknown'}</td>
                  <td>{activity.notes ?? '—'}</td>
                  <td>{activity.createdAt ? new Date(activity.createdAt).toLocaleString() : 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
