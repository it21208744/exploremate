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
      console.log(response?.data?.user?.role);
      localStorage.setItem('token', response.data.data);

      setIsLoggedIn(true);

      const userRole = response?.data?.user?.role;
      //  console.log(response.data.data);
      
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',position: 'relative', left: '30vw'  }}>
      <div style={{ width: '400px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
        {errorMessage && <p style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</p>}
        {isLoggedIn && <p style={{ color: 'green', marginBottom: '10px', textAlign: 'center' }}>Login successful!</p>} 
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} required />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
