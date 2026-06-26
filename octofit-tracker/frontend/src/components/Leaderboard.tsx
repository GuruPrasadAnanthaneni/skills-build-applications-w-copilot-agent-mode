import { useEffect, useState } from 'react';

type LeaderboardEntry = {
  rank?: number;
  score?: number;
  user?: { name?: string; role?: string };
};

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const codespace = import.meta.env.VITE_CODESPACE_NAME;
    const API_BASE = codespace
      ? `https://${codespace}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';

    fetch(`${API_BASE}/leaderboard/`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : data.items || data.data || data.leaderboard || [];
        setEntries(items);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && entries.length === 0 && <p>No leaderboard entries found.</p>}
      {entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, idx) => (
                <tr key={`${entry.rank ?? idx}-${idx}`}>
                  <td>{entry.rank ?? idx + 1}</td>
                  <td>{entry.user?.name ?? 'Unknown'}</td>
                  <td>{entry.score ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
