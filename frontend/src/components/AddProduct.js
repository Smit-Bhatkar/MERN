// frontend/src/components/AddProduct.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate instead of callback
import { API } from '../services/api'; // Use the named API import

function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null); // State for file
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Use FormData for file uploads
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        if (image) {
            formData.append('image', image); // 'image' matches the backend upload.single('image')
        }

        try {
            // Post directly to API (we usually don't need Redux for the create action unless we want to)
            await API.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Required for files
                },
            });
            alert('Product added successfully!');
            navigate('/'); // Redirect to Home/Product List
        } catch (error) {
            console.error("Create failed:", error);
            alert("Failed to create product");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                required
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
            />
            {/* File Input for Image */}
            <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])} 
            />
            <button type="submit">Add Product</button>
        </form>
    );
}

export default AddProduct;