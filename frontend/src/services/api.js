// src/services/api.js
import axios from 'axios';

export const API = axios.create({ 
    baseURL: 'http://localhost:3000/api',
});

export const fetchProducts = (path) => API.get(path); // Use API.get
export const createProduct = (product) => API.post('/products', product);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product); // Corrected string interpolation syntax
export const deleteProduct = (id) => API.delete(`/products/${id}`); // Corrected string interpolation syntax
// Add to frontend/src/services/api.js
// ----------------------------------------------------

API.interceptors.request.use(config => { 
    // Get the token from local storage
    const token = localStorage.getItem('token'); 

    // Attach the token to the header if it exists
    if (token) {
        // Set the header that your backend middleware (auth.js) expects
        config.headers['x-auth-token'] = token; 
    }

    return config; 
});

API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    // If a token exists, add it to the request headers under 'x-auth-token'
    if (token) config.headers['x-auth-token'] = token;

    return config;
});