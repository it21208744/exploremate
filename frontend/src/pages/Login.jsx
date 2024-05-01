import React, { useState } from 'react'
import axios from 'axios'
import Wrapper from '../assets/wrappers/travelersWrappers/Login'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false) // New state for tracking login status

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/v1/auth', {
        email,
        password,
      })
      console.log(response?.data?.data)
      localStorage.setItem('token', response.data.data)
      setIsLoggedIn(true) // Set login status to true
    } catch (error) {
      console.error('Login error:', error)
      setErrorMessage('Invalid email or password')
    }
  }

  return (
    <Wrapper>
      <div className="loginContainer">
        <h2>Login</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {isLoggedIn && <p style={{ color: 'green' }}>Login successful!</p>}{' '}
        {/* Success message */}
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </Wrapper>
  )
}

export default Login
