import React, { useState } from 'react'
import axios from 'axios'
import { Form, useNavigate, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  console.log(data)

  try {
    const res = await axios.post('/api/v1/users/', data)
    console.log(res)
    toast.success('Registered successfully')
    return redirect('/login')

    //  return res;
  } catch (error) {
    console.log(error)
    return error
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

const Register = () => {
  const [role, setRole] = useState('user')

  const handleRoleChange = (e) => {
    setRole(e.target.value)
  }

  return (
    <div
      style={{
        backgroundImage:
          'url("https://t3.ftcdn.net/jpg/03/99/24/82/360_F_399248286_Ogm0T8CFeauN4Hdn42FqWfsCE02dJBbX.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

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
      <div style={cardstyle}>
        <h2>SignUP</h2>
        <div className="RegisterContainer">
          <Form method="post">
            <div>
              <label>First Name</label>
              <input type="text" name="firstName" required style={inputStyle} />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" name="lastName" required style={inputStyle} />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" required style={inputStyle} />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label>Role</label>
              <select
                name="role"
                value={role}
                onChange={handleRoleChange}
                style={inputStyle}
              >
                <option value="traveller">Traveller</option>
                <option value="hotel">Hotel</option>
                <option value="taxi">Taxi</option>
              </select>
            </div>
            <div>
              <button type="submit" style={buttonStyle}>
                Register
              </button>
            </div>

            {/* <div>
            <label>Role1:</label>
            <select name="role" value={role} onChange={handleRoleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register
