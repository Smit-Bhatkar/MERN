// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth(); // Get user and logout function
    const navigate = useNavigate();

    const handleLogout = () => {
        // 1. Call the logout function from context
        // (If your context doesn't have logout, we can manually clear token here)
        if (logout) {
            logout();
        } else {
            localStorage.removeItem('token');
            window.location.reload();
        }
        
        // 2. Redirect to login page
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            {/* Logo / Brand */}
            <Link to="/" style={styles.brand}>
                MyStore
            </Link>

            {/* Navigation Links */}
            <div style={styles.links}>
                {user ? (
                    // Show these ONLY if user is logged in
                    <>
                        <Link to="/" style={styles.link}>Home</Link>
                        <Link to="/add" style={styles.link}>Add Product</Link>
                        
                        <button 
                            onClick={handleLogout} 
                            style={styles.logoutBtn}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    // Show these ONLY if user is logged out
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.link}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

// Simple internal styles to match your new look
const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
    },
    brand: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#4f46e5',
        textDecoration: 'none'
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    link: {
        textDecoration: 'none',
        color: '#374151',
        fontWeight: '500',
        fontSize: '1rem'
    },
    logoutBtn: {
        padding: '0.5rem 1rem',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600'
    }
};

export default Navbar;