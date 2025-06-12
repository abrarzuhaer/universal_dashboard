import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import DashboardApp from './DashboardApp';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Conditionally add the 'dashboard-active' class to the main container
  return (
    <div className={isAuthenticated ? 'dashboard-active' : ''}>
      {isAuthenticated ? (
        <DashboardApp onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
