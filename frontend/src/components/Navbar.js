import React from 'react';
// Assuming React Router Link component would be used here
import { Link } from 'react-router-dom'; 

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link> | 
            <Link to="/add">Add Product</Link>
        </nav>
    );
}

export default Navbar;