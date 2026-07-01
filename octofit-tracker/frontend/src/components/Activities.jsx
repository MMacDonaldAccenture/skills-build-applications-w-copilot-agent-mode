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

    if (Array.isArray(payload.docs)) {
      return payload.docs;
    }
  }

  return [];
};

export default function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadActivities = async () => {
      try {
        const response = await fetch(buildApiUrl('activities'));
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
          setError(err.message || 'Unable to load activities');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadActivities();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1">Activities</h2>
          <p className="text-muted mb-0">Recent activity from the Octofit community.</p>
        </div>
        <span className="badge bg-primary">API</span>
      </div>

      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : null}

      {loading ? (
        <div className="text-muted">Loading activities…</div>
      ) : items.length === 0 ? (
        <div className="alert alert-secondary">No activities were returned by the API.</div>
      ) : (
        <div className="row g-3">
          {items.map((item, index) => (
            <div className="col-md-6 col-xl-4" key={`${item.userName}-${index}`}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3 className="h6 mb-0">{item.userName}</h3>
                    <span className="badge bg-info text-dark">{item.type}</span>
                  </div>
                  <p className="mb-2"><strong>Duration:</strong> {item.durationMinutes} min</p>
                  <p className="mb-2"><strong>Calories:</strong> {item.caloriesBurned}</p>
                  <p className="mb-0 text-muted small">
                    {item.completedAt ? new Date(item.completedAt).toLocaleString() : 'Completed recently'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
