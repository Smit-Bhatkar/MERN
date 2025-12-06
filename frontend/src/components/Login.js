// frontend/src/components/Login.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Getting login from Context, NOT Redux
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            alert("Button Clicked!");// Context's login function is async but doesn't usually return a "payload" object
            await login(email, password); 
            
            // If we get here, login succeeded
            alert('Login Successful!'); 
            navigate('/'); 
        } catch (error) {
            // If login fails, the error is caught here
            alert('Login failed. Check your credentials.');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}


export default Login;