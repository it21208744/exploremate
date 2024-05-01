import React, { useState } from 'react'
import axios from 'axios'
import { Form, useNavigate, redirect } from 'react-router-dom'
import Wrapper from '../assets/wrappers/travelersWrappers/register'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  console.log(data)

  try {
    const res = await axios.post('/api/v1/users/', data)
    console.log(res)
    return redirect('/login')

    //  return res;
  } catch (error) {
    console.log(error)
    return error
  }
}

const Register = () => {
  const [role, setRole] = useState('user')

  const handleRoleChange = (e) => {
    setRole(e.target.value)
  }

  return (
    <Wrapper>
      <h2>Register</h2>
      <div className="RegisterContainer">
        <Form method="post">
          <div>
            <label>First Name:</label>
            <input type="text" name="firstName" required />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" name="lastName" required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit">Register</button>
          <div style={{ marginBottom: '10px' }}>
            <label>Role:</label>
            <select
              name="role"
              value={role}
              onChange={handleRoleChange}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
    </Wrapper>
  )
}

export default Register
