// frontend/src/context/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import API from '../services/api'; // Assuming your API instance is imported correctly

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token')); 

    // Check token on app load
    useEffect(() => {
        if (token) {
            // Decodes the token to get user info (id, etc.)
            const decoded = jwtDecode(token); 
            setUser(decoded);
        }
    }, [token]);

    // Login function
    const login = async (email, password) => {
        try {
            const res = await API.post('/auth/login', { email, password }); 
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            
            // Set user data from the newly received token
            setUser(jwtDecode(res.data.token)); 
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);