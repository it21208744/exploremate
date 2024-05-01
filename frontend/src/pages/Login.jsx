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
    <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',position: 'relative', left: '40vw' }}>
      <div className="login-form" style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        {errorMessage && <p className="error-message" style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{errorMessage}</p>}
        {isLoggedIn && <p className="success-message" style={{ color: 'green', marginBottom: '10px', textAlign: 'center' }}>Login successful!</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '10px' }}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div className="form-group" style={{ marginBottom: '10px' }}>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" className="login-button" style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
