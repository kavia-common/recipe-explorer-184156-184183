import React from 'react';
import './theme.css';
import Navbar from './components/Navbar';
import AppRoutes from './routes';
import { useAuth } from './hooks/useAuth';

/**
 * PUBLIC_INTERFACE
 * App - root layout with navbar and routed content.
 */
function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
      <main role="main">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
