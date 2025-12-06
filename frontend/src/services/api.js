// src/services/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api', // Corrected port from 3001 to 3000
});

export const fetchProducts = () => API.get('/products');
export const createProduct = (product) => API.post('/products', product);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product); // Corrected string interpolation syntax
export const deleteProduct = (id) => API.delete(`/products/${id}`); // Corrected string interpolation syntax