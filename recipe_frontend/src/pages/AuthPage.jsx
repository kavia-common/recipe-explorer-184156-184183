import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * AuthPage - simple auth form that sets a JWT on success.
 */
export default function AuthPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const res = await login(email, password);
    setBusy(false);
    if (res?.ok) {
      navigate('/');
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0', display: 'grid', placeItems: 'center' }}>
      <form onSubmit={onSubmit} className="card" style={{ width: '100%', maxWidth: 420, padding: '1rem' }}>
        <h1 style={{ marginTop: 0, marginBottom: 8 }}>Welcome back</h1>
        <p style={{ marginTop: 0, color: 'rgba(17,24,39,0.7)' }}>Sign in to continue.</p>
        <div style={{ display: 'grid', gap: 12 }}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="pwd">Password</label>
            <input id="pwd" className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary" type="submit" disabled={busy} aria-busy={busy}>
            {busy ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
}
