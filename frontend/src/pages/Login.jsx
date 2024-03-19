// const Login = () => {
//   return <h4>login</h4>
// }
import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            setLoginSuccess(true);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to login. Please check your email and password.');
        }
    };

    return (
        <div>
            {loginSuccess ? (
                <div>
                    <h2>Login Successful!</h2>
                    <p>You have successfully logged in.</p>
                </div>
            ) : (
                <div>
                    {error && <p>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;


