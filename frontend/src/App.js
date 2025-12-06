// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Auth Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Public Components
import Login from './components/Login';
import Register from './components/Register';
import ProductDetail from './components/ProductDetail';

// Protected Components (require login)
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

function App() {
    return (
        <Router>
            {/* 1. Navbar: Appears once at the top */}
            <Navbar />
            
            {/* 2. Routes: Define all your pages here */}
            <Routes>
                {/* --- Public Routes --- */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductDetail />} />

                {/* --- Protected Routes (Require Login) --- */}
                
                {/* Home Page (Product List) */}
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <ProductList />
                        </ProtectedRoute>
                    } 
                />
                
                {/* Add Product Page */}
                <Route 
                    path="/add" 
                    element={
                        <ProtectedRoute>
                            <AddProduct />
                        </ProtectedRoute>
                    } 
                />

                {/* Edit Product Page */}
                <Route 
                    path="/edit/:id" 
                    element={
                        <ProtectedRoute>
                            <EditProduct />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;