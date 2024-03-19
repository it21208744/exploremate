import React, { useState } from 'react';
import axios from 'axios';
import {Form} from 'react-router-dom'


export const action = async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    console.log(data)
    try {
      const res = await axios.post('/api/v1/users/', data)
      console.log(res)
      return null
    } catch (error) {
    //   toast.error('Wrong city name')
      return error
    }
  }

const register = () => {
    // const [formData, setFormData] = useState({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     password: ''
    // });
    // const [successMessage, setSuccessMessage] = useState('');

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/users', formData);
    //         console.log(response.data.message); 
    //         setSuccessMessage('User registered successfully!');
            
    //         setFormData({
    //             firstName: '',
    //             lastName: '',
    //             email: '',
    //             password: ''
    //         });
    //     } catch (error) {
    //         console.error('Error registering user:', error);
    //     }
    // };

    return (
        <div>
            <h2>Register</h2>
            {/* {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} */}
            <Form  method='post'>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName"   required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName"   required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email"   required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password"   required />
                </div>
                <button type="submit">Register</button>
            </Form>
        </div>
    );
};

export default register;
