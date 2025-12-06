// frontend/src/components/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import { API } from '../services/api';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send register request to backend
            await API.post('/auth/register', { email, password });
            
            alert('Registration Successful! Please login.');
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error("Registration failed:", error);
            // Handle error response safely
            const errMsg = error.response?.data?.error || "Registration failed";
            alert(errMsg);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
            <form onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center' }}>Create Account</h2>
                
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                />
                
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (min 6 chars)"
                    required
                    minLength="6"
                />
                
                <button type="submit" className="btn-primary">Register</button>
                
                {/* Link to Login */}
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;