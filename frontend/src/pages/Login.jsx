import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v1/auth', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.data);
      setIsLoggedIn(true);

      const userRole = response?.data?.user?.role;

      if (userRole === 'admin') {
        navigate('/register');
      } else if (userRole === 'user') {
        navigate('/travelerDashBoard/profile');
      } else {
        navigate('/register');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {isLoggedIn && <p className="success-message">Login successful!</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
