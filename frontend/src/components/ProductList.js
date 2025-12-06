// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../services/api'; //

function ProductList() { //
    const [products, setProducts] = useState([]); //
    const [loading, setLoading] = useState(true); // Corrected syntax

    useEffect(() => { // Corrected arrow function syntax
        const loadData = async () => { // Corrected arrow function syntax
            try { //
                const { data } = await fetchProducts(); // Corrected destructuring syntax
                setProducts(data); //
            } catch (error) { //
                console.error("Failed to fetch products:", error); //
            } finally { //
                setLoading(false); //
            }
        }; //
        loadData(); //
    }, []); //

    const handleDelete = async (id) => { //
        await deleteProduct(id); //
        // Corrected filtering syntax
        setProducts(products.filter(product => product._id !== id)); 
    }; //

    if (loading) return <div>Loading...</div>; //

    return ( //
        <div> //
            <h2>Products</h2> //
            {products.map(product => ( //
                <div key={product._id}> //
                    {product.name} ${product.price} //
                    <button onClick={() => handleDelete(product._id)}>Delete</button> // Corrected to use product._id
                </div> //
            ))} //
        </div> //
    ); //
} //

export default ProductList;