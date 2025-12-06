// frontend/src/App.js (Add Auth Routes and Protection)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import ProductDetail from './components/ProductDetail'; 
import Navbar from './components/Navbar'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import Login from './components/Login'; 
import Register from './components/Register'; // Assuming you create a Register component

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> 

                {/* Protected Routes (Require Login) */}
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <ProductList /> 
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/add" 
                    element={
                        <ProtectedRoute>
                            <AddProduct />
                        </ProtectedRoute>
                    } 
                />
                {/* Product Detail might be accessible publicly or privately depending on requirements */}
                <Route path="/product/:id" element={<ProductDetail />} /> 
            </Routes>
        </Router>
    );
}

export default App;