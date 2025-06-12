import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../assets/logo2.png'; // Using the same logo

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold login error messages

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset error on each attempt

    // --- Check for specific username and password ---
    if (username === 'admin' && password === 'demo123') {
      onLogin(); // This function from App.jsx logs the user in
    } else {
      // If credentials don't match, set an error message
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Dashboard Login</h2>

        {/* --- Display the error message if it exists --- */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
