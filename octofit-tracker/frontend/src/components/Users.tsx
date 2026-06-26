import { useEffect, useState } from 'react';

type User = {
  name?: string;
  email?: string;
  role?: string;
  joinedAt?: string;
  team?: { name?: string };
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const codespace = import.meta.env.VITE_CODESPACE_NAME;
    const API_BASE = codespace
      ? `https://${codespace}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';

    fetch(`${API_BASE}/users/`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : data.items || data.data || data.users || [];
        setUsers(items);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
      {users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Team</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={`${user.email ?? 'user'}-${idx}`}>
                  <td>{user.name ?? 'Unknown'}</td>
                  <td>{user.email ?? 'Unknown'}</td>
                  <td>{user.role ?? 'N/A'}</td>
                  <td>{user.team?.name ?? 'No team'}</td>
                  <td>{user.joinedAt ? new Date(user.joinedAt).toLocaleString() : 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
