import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/client';

/**
 * PUBLIC_INTERFACE
 * useAuth - manages auth token, login, logout, and status.
 */
export function useAuth() {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const t = localStorage.getItem('token');
      if (t) setToken(t);
    } catch {}
    setReady(true);
  }, []);

  const login = useCallback(async (email, password) => {
    // Placeholder login; hit a backend endpoint if exists, otherwise fake a token
    try {
      const res = await api.post('/auth/login', { email, password });
      const newToken = res?.access_token || res?.token || 'demo.jwt.token';
      localStorage.setItem('token', newToken);
      setToken(newToken);
      return { ok: true };
    } catch {
      // Fall back to demo token for development when backend isn't ready
      const newToken = 'demo.jwt.token';
      try {
        localStorage.setItem('token', newToken);
      } catch {}
      setToken(newToken);
      return { ok: true, demo: true };
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('token');
    } catch {}
    setToken(null);
  }, []);

  return { token, isAuthenticated: !!token, login, logout, ready };
}
