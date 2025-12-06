// frontend/src/components/EditProduct.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../services/api';

function EditProduct() {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [currentImage, setCurrentImage] = useState(''); // To show preview
    const [newImage, setNewImage] = useState(null); // To store new file

    // Fetch product details when page loads
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await API.get(`/products/${id}`);
                setName(data.name);
                setPrice(data.price);
                setCurrentImage(data.image);
            } catch (error) {
                console.error("Failed to fetch product", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        if (newImage) {
            formData.append('image', newImage);
        }

        try {
            await API.put(`/products/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Product updated successfully!');
            navigate('/');
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update product");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Product</h2>
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
            
            {/* Show current image if exists */}
            {currentImage && (
                <div style={{ marginBottom: '10px' }}>
                    <p>Current Image:</p>
                    <img src={currentImage} alt="Current" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                </div>
            )}

            <label>Change Image:</label>
            <input 
                type="file" 
                onChange={(e) => setNewImage(e.target.files[0])} 
            />
            
            <button type="submit">Update Product</button>
        </form>
    );
}

export default EditProduct;