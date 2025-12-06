// frontend/src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            alert('Login Successful!');
            navigate('/');
        } catch (error) {
            alert('Login failed. Check your credentials.');
            console.error(error);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
            <form onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
                
                {/* 1. Inputs come first */}
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
                    placeholder="Password"
                    required
                />
                
                {/* 2. Then the Login Button (ONLY ONE) */}
                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                    Login
                </button>

                {/* 3. Finally, the Register Link */}
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;