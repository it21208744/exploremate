import Wrapper from '../../assets/wrappers/travelersWrappers/profile';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('/api/v1/userss/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfile(response.data.data);
        setFormData(response.data.data); 
        setError(null);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.put('/api/v1/userss/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProfile(response.data.data); 
      setError(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    
    window.location.href = '/login';
  };

  return (
    <Wrapper>
      <div className="profileContainer">
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div>
            <h2 style={{ color: '#2c3e50' }}>User Profile</h2>
            {profile && (
              <div style={{ backgroundColor: '#ecf0f1', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
                <p><strong>First Name:</strong> {profile.firstName}</p>
                <p><strong>Last Name:</strong> {profile.lastName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
              </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                <span style={{ color: '#2c3e50', marginRight: '10px' }}>First Name:</span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                <span style={{ color: '#2c3e50', marginRight: '10px' }}>Last Name:</span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                <span style={{ color: '#2c3e50', marginRight: '10px' }}>Email:</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }}
                  required
                />
              </label>
              <button type="submit" style={{ backgroundColor: '#3498db', color: 'white', padding: '8px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Update Profile</button>
              <button type="button" onClick={handleLogout} style={{ backgroundColor: '#e74c3c', color: 'white', padding: '8px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>Logout</button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserProfile;
