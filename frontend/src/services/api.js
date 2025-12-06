// src/services/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api', // Corrected port from 3001 to 3000
});

export const fetchProducts = () => API.get('/products');
export const createProduct = (product) => API.post('/products', product);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product); // Corrected string interpolation syntax
export const deleteProduct = (id) => API.delete(`/products/${id}`); // Corrected string interpolation syntax
// Add to frontend/src/services/api.js
// ----------------------------------------------------

API.interceptors.request.use(config => { //
    const token = localStorage.getItem('token'); //

    // If a token exists, add it to the request headers under 'x-auth-token'
    if (token) config.headers['x-auth-token'] = token; //

    return config; //
});

API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    // If a token exists, add it to the request headers under 'x-auth-token'
    if (token) config.headers['x-auth-token'] = token;

    return config;
});