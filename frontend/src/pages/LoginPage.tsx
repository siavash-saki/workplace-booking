import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const login = useAppStore((s) => s.login);
  const user = useAppStore((s) => s.user);
  const loading = useAppStore((s) => s.loading);
  const error = useAppStore((s) => s.error);
  const clearError = useAppStore((s) => s.clearError);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (user) {
      const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(username || 'Guest');
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
      <p className="mt-2 text-sm text-gray-600">Enter any name to start booking.</p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="text-sm text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 w-full rounded-md border px-3 py-2 focus:border-primary focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Jane Doe"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="btn w-full bg-primary text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
