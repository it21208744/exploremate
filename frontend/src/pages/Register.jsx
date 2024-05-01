
import React, { useState } from 'react';
import axios from 'axios';
import { Form,useNavigate , redirect} from 'react-router-dom';



export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  
  console.log(data);

  try {
    const res = await axios.post('/api/v1/users/', data);
    console.log(res);
    return redirect('/login');

    //  return res;
  } catch (error) {
    console.log(error)
    return error;
  }

};

const Register = () => {
  const [role, setRole] = useState('user');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',position: 'relative', left: '40vw' }}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
        <Form method="post" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '10px' }}>
            <label>First Name:</label>
            <input type="text" name="firstName" required style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Last Name:</label>
            <input type="text" name="lastName" required style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Email:</label>
            <input type="email" name="email" required style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Password:</label>
            <input type="password" name="password" required style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Role:</label>
            <select name="role" value={role} onChange={handleRoleChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Register</button>
        </Form>
      </div>
    </div>
  );
};


export default Register;
