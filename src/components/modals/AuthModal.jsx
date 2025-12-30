import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AuthModal = ({ mode, onClose, onSwitchMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (mode === 'signup' && formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        alert('✅ Login successful! Welcome back.');
      } else {
        await register(formData.name, formData.email, formData.password);
        alert(`✅ Welcome to EcoWatch, ${formData.name}!`);
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
      
      // Parse Firebase error messages
      let errorMessage = error.message;
      if (errorMessage.includes('email-already-in-use')) {
        errorMessage = 'This email is already registered. Please login instead.';
      } else if (errorMessage.includes('invalid-email')) {
        errorMessage = 'Please enter a valid email address.';
      } else if (errorMessage.includes('wrong-password') || errorMessage.includes('user-not-found')) {
        errorMessage = 'Invalid email or password.';
      } else if (errorMessage.includes('too-many-requests')) {
        errorMessage = 'Too many attempts. Please try again later.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span onClick={onClose} className="close-modal">&times;</span>
        <h3>{mode === 'login' ? 'Welcome Back' : 'Join EcoWatch'}</h3>
        
        {error && (
          <div style={{ 
            color: '#b30000', 
            background: '#ffe6e6',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '15px',
            fontSize: '0.9em'
          }}>
            ⚠️ {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <label>Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </>
          )}
          
          <label>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder={mode === 'login' ? 'user@example.com' : 'john@example.com'}
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder={mode === 'login' ? '••••••' : 'Create a password (min 6 chars)'}
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            minLength={6}
          />
          
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? (
              <>⏳ Please wait...</>
            ) : mode === 'login' ? (
              '🔓 Login'
            ) : (
              '🚀 Create Account'
            )}
          </button>
          
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSwitchMode(mode === 'login' ? 'signup' : 'login');
            }}
            className="switch-link"
          >
            {mode === 'login' 
              ? "Don't have an account? Sign Up" 
              : 'Already have an account? Login'}
          </a>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;