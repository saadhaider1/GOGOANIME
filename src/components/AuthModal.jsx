import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { login, register } from '../services/authService';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData);
      }
      onAuthSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="auth-modal animate-fade-in">
        <button className="close-btn" onClick={onClose}><FiX /></button>
        <h2 className="modal-title">{isLogin ? 'Welcome Back' : 'Join GOGO ANIME'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              required 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              required 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                required 
                value={formData.password_confirmation}
                onChange={e => setFormData({...formData, password_confirmation: e.target.value})}
              />
            </div>
          )}

          {error && <p className="error-text">{error}</p>}
          
          <button className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <p className="switch-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
