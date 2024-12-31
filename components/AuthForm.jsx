import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './AuthForm.css';

export default function AuthForm() {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLoginActive ? '/api/auth/login' : '/api/auth/signup';
      const payload = isLoginActive ? { email, password } : { name, email, password };

      // Log the request details
      console.log('Request URL:', `http://localhost:5000${endpoint}`);
      console.log('Payload:', payload);

      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);

      // Renaming the destructured variables to avoid conflict
      const { token, name: userName, email: userEmail } = response.data;

      if (userName) {
        localStorage.setItem('email', userEmail);
        localStorage.setItem('userName', userName);
        localStorage.setItem('token', token); // Optional, store token for auth
      }

      // Redirect to Aa component
      navigate('/aa');
    } catch (error) {
      console.error('Full error object:', error); // Log the entire error object
      if (error.response) {
        console.error('Error response:', error.response);
        setError(error.response.data?.msg || 'An error occurred. Please try again.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('No response received from server. Please check the server status.');
      } else {
        console.error('Error message:', error.message);
        setError('Error in setting up the request. Please try again.');
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-structor">
        <div className={`signup ${isLoginActive ? 'slide-up' : ''}`}>
          <h2 className="form-title" id="signup" onClick={toggleForm}>
            <span>or</span>Sign up
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-holder">
              <input
                type="text"
                className="input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Sign up</button>
          </form>
        </div>
        <div className={`login ${!isLoginActive ? 'slide-up' : ''}`}>
          <div className="center">
            <h2 className="form-title" id="login" onClick={toggleForm}>
              <span>or</span>Log in
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-holder">
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Log in</button>
            </form>
          </div>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
