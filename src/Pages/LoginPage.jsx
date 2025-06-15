import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleLogin = (e) => {
    e.preventDefault();

    const savedData = localStorage.getItem('signupData');
    if (!savedData) {
      setErrorMessage('No user found. Please sign up first.');
      return;
    }

    const { email: savedEmail, password: savedPassword } = JSON.parse(savedData);

    if (email === savedEmail && password === savedPassword) {
      setErrorMessage('');
      navigate('/dashboard');
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h1 className="brand-logo">When I Work</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email Address*</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password*</label>
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle" onClick={togglePassword}>
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>

        {errorMessage && (
          <div className="alert-box">
            {errorMessage}
          </div>
        )}

        <button type="submit" className="login-button">Log In</button>

        <div className="or-divider">OR</div>

        <div className="social-buttons">
          <button className="google-btn" type="button">Log in with Google</button>
          <button className="apple-btn" type="button">Sign in with Apple</button>
        </div>

        <div className="bottom-links">
          <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          <Link to="/signup" className="signup-button">Sign Up</Link>
        </div>
      </form>

      <div className="footer">Third-Party Connect</div>
    </div>
  );
};

export default LoginPage;
