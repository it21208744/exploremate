import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/v1/auth', {
        email,
        password,
      })

      localStorage.setItem('token', response.data.data)
      setIsLoggedIn(true)

      const userRole = response?.data?.user?.role

      if (userRole === 'traveller') {
        navigate('/travelerDashBoard')
      } else if (userRole === 'hotel') {
        navigate('/HotelOwnerDashBoardLayout')
      } else if (userRole === 'taxi') {
        navigate('/TaxiownerDashBoard')

      } else {

        navigate('/travelerDashBoard')
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrorMessage('Invalid email or password')
    }
  }
  const cardstyle = {
    overflow: 'hidden',
    boxShadow: '0 2px 20px ',
    borderRadius: '10px',
    transition: 'transform 200ms ease-in',
    padding: '30px',
    backdropFilter: 'blur(5px)',
    background:
      'linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))',
    width: '500px',
    marginLeft: '360px',
    marginBottom: '30px',
  }
  const inputStyle = {
    display: 'block',
    width: '100%',
    height: '36px',
    borderWidth: '0 0 2px 0',
    borderColor: '#86b9b0',
    fontSize: '14px',
    fontWeight: '300',
    LineHeight: '26px',
    borderRadius: '10px',
  }
  const buttonStyle = {
    display: 'inline-block',
    backgroundImage: 'linear-gradient(125deg,#042630,#4c7273)',
    //backgroundColor: "#c46804",
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '16px',
    width: '200px',
    height: '36px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }

  return (
    <div
      style={{
        backgroundImage:
          'url("https://t3.ftcdn.net/jpg/03/99/24/82/360_F_399248286_Ogm0T8CFeauN4Hdn42FqWfsCE02dJBbX.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // backgroundsize: "contain",
        width: '100vw',
        height: '100vh',
      }}
    >
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="loginContainer" style={cardstyle}>
        <h2>Login</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {isLoggedIn && <p style={{ color: 'green' }}>Login successful!</p>}{' '}
        {/* Success message */}
        <form onSubmit={handleLogin}>
          <div>
            <label>
              <b>Email</b>
            </label>
            <input
              style={inputStyle}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <b>Password</b>
            </label>
            <input
              type="password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br></br>
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
