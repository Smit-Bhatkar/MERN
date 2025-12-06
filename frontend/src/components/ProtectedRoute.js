// frontend/src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom'; //
import { useAuth } from '../context/AuthContext'; //

const ProtectedRoute = ({ children }) => { //
    const { user } = useAuth(); // Corrected syntax
    
    // Corrected ternary syntax: if user exists, show children, otherwise redirect to /login
    return user ? children : <Navigate to="/login" replace />; 
}; //

export default ProtectedRoute;