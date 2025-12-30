import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenAuth }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">🌍 EcoWatch</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#map-section">Map</a></li>
        <li><a href="#qa-section">Ask AI</a></li>
        <li><a href="#petition-section">Petitions</a></li>
        <li>
          {user ? (
            <div className="user-display">
              <span className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span style={{ fontWeight: 'bold', color: 'white' }}>
                {user.name}
              </span>
              <button 
                onClick={logout} 
                className="nav-btn" 
                style={{ fontSize: '0.8em', padding: '4px 10px' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => onOpenAuth('login')} 
                className="nav-btn"
              >
                Login
              </button>
              <button 
                onClick={() => onOpenAuth('signup')} 
                className="nav-btn outline-btn"
              >
                Sign Up
              </button>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
