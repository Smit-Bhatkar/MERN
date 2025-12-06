// src/components/AddProduct.js
import React, { useState } from 'react'; //
import { createProduct } from '../services/api'; //

function AddProduct({ onProductAdded }) { //
    const [formData, setFormData] = useState({ name: '', price: '' }); // Corrected initialization syntax

    const handleChange = (e) => { // Corrected arrow function syntax
        setFormData({
            ...formData, // Added spread operator for existing state
            [e.target.name]: e.target.value 
        }); //
    }; //

    const handleSubmit = async (e) => { //
        e.preventDefault(); //
        try { //
            // Corrected destructuring for newProduct
            const { data: newProduct } = await createProduct(formData); 
            onProductAdded(newProduct); // Update parent state //
            setFormData({ name: '', price: '' }); // Reset form //
        } catch (error) { //
            console.error("Create failed:", error); //
        } //
    }; //

    return ( //
        <form onSubmit={handleSubmit}> //
            <input //
                name="name" //
                value={formData.name} //
                onChange={handleChange} //
                placeholder="Product name" //
                required //
            /> //
            <input //
                name="price" //
                type="number" //
                value={formData.price} //
                onChange={handleChange} //
                placeholder="Price" //
                min="0" //
                required //
            /> //
            <button type="submit">Add Product</button> //
        </form> //
    ); //
}

export default AddProduct;