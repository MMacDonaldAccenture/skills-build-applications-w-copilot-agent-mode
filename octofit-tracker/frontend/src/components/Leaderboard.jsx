import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const buildApiUrl = (resource) => `${getApiBaseUrl()}/api/${resource}/`;

const extractItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.data)) {
      return payload.data;
    }

    if (Array.isArray(payload.results)) {
      return payload.results;
    }

    if (Array.isArray(payload.items)) {
      return payload.items;
    }
  }

  return [];
};

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadLeaderboard = async () => {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (active) {
          setItems(extractItems(payload));
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load leaderboard');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadLeaderboard();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="container py-4">
      <h2 className="h3 mb-3">Leaderboard</h2>
      <p className="text-muted">Competition standings for top performers.</p>

      {error ? <div className="alert alert-danger">{error}</div> : null}

      {loading ? (
        <div className="text-muted">Loading leaderboard…</div>
      ) : items.length === 0 ? (
        <div className="alert alert-secondary">No leaderboard rows were returned.</div>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="list-group list-group-flush">
            {items.map((item) => (
              <div className="list-group-item d-flex justify-content-between align-items-center" key={item.rank}>
                <div>
                  <div className="fw-semibold">#{item.rank} {item.userName}</div>
                  <div className="small text-muted">Streak: {item.streak}</div>
                </div>
                <span className="badge bg-success">{item.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
