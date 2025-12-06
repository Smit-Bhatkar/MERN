// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corrected import syntax
import ProductList from './components/ProductList'; //
import AddProduct from './components/AddProduct'; //
import ProductDetail from './components/ProductDetail'; // Corrected import path
import Navbar from './components/Navbar'; // Added missing Navbar import

function App() { //
    return ( //
        <Router> //
            <Navbar /> //
            <Routes> //
                <Route path="/" element={<ProductList />} /> //
                <Route path="/add" element={<AddProduct />} /> //
                <Route path="/product/:id" element={<ProductDetail />} /> //
            </Routes> //
        </Router> //
    ); //
} //

export default App;