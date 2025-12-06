// frontend/src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    
    // If user is authenticated, render the children; otherwise, redirect to /login
    return user ? children : <Navigate to="/login" replace />; 
};

export default ProtectedRoute;