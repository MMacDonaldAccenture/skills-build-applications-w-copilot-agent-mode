import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const buildApiUrl = (resourcePath) => `${getApiBaseUrl()}${resourcePath}`;

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

export default function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadUsers = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/users/'));
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
          setError(err.message || 'Unable to load users');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="container py-4">
      <h2 className="h3 mb-3">Users</h2>
      <p className="text-muted">Community members and their fitness goals.</p>

      {error ? <div className="alert alert-danger">{error}</div> : null}

      {loading ? (
        <div className="text-muted">Loading users…</div>
      ) : items.length === 0 ? (
        <div className="alert alert-secondary">No users were returned.</div>
      ) : (
        <div className="row g-3">
          {items.map((item, index) => (
            <div className="col-md-6 col-xl-4" key={`${item.email}-${index}`}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="h5 mb-2">{item.name}</h3>
                  <p className="mb-2"><strong>Email:</strong> {item.email}</p>
                  <p className="mb-2"><strong>Age:</strong> {item.age}</p>
                  <p className="mb-2"><strong>Goal:</strong> {item.fitnessGoal}</p>
                  <p className="mb-0 text-muted">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
