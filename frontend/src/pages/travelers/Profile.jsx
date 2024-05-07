import Wrapper from '../../assets/wrappers/travelersWrappers/profile'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SupplierHeader from "./SupplierHeader";

const UserProfile = () => {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {

        const token = localStorage.getItem('token');
        
          

        if (!token) {
          throw new Error('Token not found')
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
        console.error('Error fetching profile:', error)
        setError(error.response?.data?.message || 'Failed to fetch profile')
      }
    }

    fetchUserProfile()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await axios.put('/api/v1/userss/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setProfile(response.data.data)
      setError(null)
    } catch (error) {
      console.error('Error updating profile:', error)
      setError(error.response?.data?.message || 'Failed to update profile')
    }
  }


  // const handleLogout = () => {
  //   localStorage.removeItem('token'); 
    
  //   window.location.href = '/login';
  // };
  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
  
    if (confirmed) {
      localStorage.removeItem('token');
      window.location.href = '/login'
    }
  };

  const inputStyle = {
    display: "block",
            width:"100%",
            height:"36px",
            borderWidth: "0 0 2px 0",
            borderColor: "#86b9b0",
            fontSize: "14px",
            fontWeight: "300",
            LineHeight: '26px',
            borderRadius: "10px",
            marginBottom:"10px"
            
            
  };
  
  const buttonStyle = {
    display: "inline-block",
    backgroundImage: "linear-gradient(125deg,#042630,#4c7273)",
    // backgroundColor: "#c46804",
    color:"#fff",
    textTransform:"uppercase",
    letterSpacing:"2px",
    fontSize: "16px",
      width:"200px",
      height:"36px",
      border:"none",
      borderRadius: "5px",
      cursor: "pointer",
      marginLeft:"30px"
      
  };
  // const backgroundImage = {
  //   backgroundImage: url('path/to/your/image.jpg'),
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
    
  // };
  const lableStyle = { 
    color:"#4c7273" ,  
    fontWeight: "600",    
    fontSize: "18px",   
  };
  //heading
  const lableStyle1 = { 
    color:"#042630" ,
    //fontWeight: "300",  
    fontSize: "20px", 
   // marginBottom: "1000px"
  };
  
  const cardstyle ={
    overflow : "hidden",
    boxShadow:"0 2px 20px ",
    borderRadius: "10px",
    transition: "transform 200ms ease-in",
    padding:"20px",
    backdropFilter: "blur(5px)",
    background: "linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))",
    width: "500px",
    marginLeft:"500px",
    marginBottom: "50px"
  }
  const cardstyle1 ={
    backgroundImage: 'url("https://png.pngtree.com/thumb_back/fh260/background/20240124/pngtree-this-is-a-profile-of-a-user-with-shadow-on-a-image_2957804.png")',
    overflow : "hidden",
    boxShadow:"0 2px 20px ",
    borderRadius: "10px",
    transition: "transform 200ms ease-in",
    padding:"40px",
    backdropFilter: "blur(5px)",
    // background: "linear-gradient(rgba(255, 255, 255, 0.7),rgba(4, 114, 77, 0.3))",
    background: "linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))",
    width: "250px",
    marginLeft:"60px",
    // marginBottom: "100px"
  }
  

 
  return (
    // <Wrapper>
    <>
    
    <div></div>
    <br></br>
    
      <div style={{
      
        backgroundImage: 'url("https://img.freepik.com/free-vector/realistic-neon-lights-background_23-2148907367.jpg")', 
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        width: '100vw',
        height: '120vh'
          
    }}
      >
        <SupplierHeader/>
          
        <div>
          <div style={cardstyle}>
            <h2>User Profile</h2>
            {profile && (
              <div style={cardstyle1}
              
              
              >
                
                <p>
                  
                  <strong >First Name :</strong> {profile.firstName}
                </p>
                <p>
                  <strong>Last Name :</strong> {profile.lastName}
                </p>
                <p>
                  <strong>Email :</strong> {profile.email}
                </p>
              </div>
            )}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div style={{align:"center"}}>
                <br></br>
              <label>
                <span>
                  <b>First Name</b>
                </span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  
                  required style={inputStyle}
                />
              </label>
              <label>
                <span>
                  <b>Last Name</b>
                </span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                 
                  required style={inputStyle}
                />
              </label>
              <label >
                <span >
                  <b>Email</b>
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  
                  required style={inputStyle}
                />
              </label>
              </div>
              <button
                type="submit" style={{ marginRight: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }}
                
              >
                Update Profile
              </button>
              <button
                type="button"  style={{ backgroundColor: '#c00a1c', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }}
                onClick={handleLogout} 
                
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
      </>
    
  )
}


export default UserProfile
