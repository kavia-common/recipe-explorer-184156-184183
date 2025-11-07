import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * Navbar - top navigation with branding and auth controls.
 */
export default function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
    } catch {}
    if (onLogout) onLogout();
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link className="brand" to="/" aria-label="Recipe Explorer Home">
          <span style={{ fontSize: 22 }}>🧭</span>
          <span>Recipe Explorer</span>
        </Link>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <NavLink to="/" className="btn" end>Home</NavLink>
          {isAuthenticated ? (
            <>
              <button className="btn" onClick={() => navigate('/')}>My Recipes</button>
              <button className="btn" onClick={() => navigate('/auth?mode=profile')}>Profile</button>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate('/auth')}>Login</button>
          )}
        </div>
      </div>
    </nav>
  );
}
