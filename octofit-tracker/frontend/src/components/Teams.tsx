import { useEffect, useState } from 'react';

type Team = {
  name?: string;
  createdAt?: string;
  memberIds?: Array<{ name?: string; email?: string }>;
};

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const codespace = import.meta.env.VITE_CODESPACE_NAME;
    const API_BASE = codespace
      ? `https://${codespace}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';

    fetch(`${API_BASE}/teams`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : data.items || data.data || data.teams || [];
        setTeams(items);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && teams.length === 0 && <p>No teams found.</p>}
      {teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Team</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={`${team.name ?? 'team'}-${idx}`}>
                  <td>{team.name ?? 'Unnamed team'}</td>
                  <td>{team.memberIds?.length ?? 0}</td>
                  <td>{team.createdAt ? new Date(team.createdAt).toLocaleString() : 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
