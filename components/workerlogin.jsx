import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './workerLogin.css';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('user-token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server error" };
  }
};

const WorkerLoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      if (email && password) {
        // Attempt to login the user
        const response = await loginUser(email, password);
        console.log('Login successful', response);
        navigate('/abcd'); // Redirect to dashboard or other route after successful login
      } else {
        setError('Please enter both email and password');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    }
  };

  const onRegisterClick = () => {
    navigate('/worker-login'); // Corrected to a registration route
  };

  return (
    <div className="registration-container">
      <div className="header">
        <h1>Worker Login</h1>
        <button onClick={onRegisterClick} className="login-button">
          New user? Register
        </button>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <button type="submit" className="submit-button">
              Login
            </button>
          </div>
          <div className="forgot-password">
            <a 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                // Implement forgot password logic
                console.log('Forgot password clicked'); 
              }}
            >
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkerLoginForm;
