import React, { useState } from 'react'
import axios from 'axios'
import { Form } from 'react-router-dom'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)

  try {
    const res = await axios.post('/api/v1/users/', data)
    console.log(res)
    return res
  } catch (error) {
    //   toast.error('Wrong city name')
    return error
  }

  
}

const register = () => {
  

  return (
   
    <div style={{ position: 'relative', left: '30vw' }}>
      <h2>Register</h2>
      
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
      </Form>
    </div>
    
  )
}

export default register
