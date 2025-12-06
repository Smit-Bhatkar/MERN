// frontend/src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// NEW: Import deleteProduct
import { fetchProducts, deleteProduct } from '../features/productsSlice';

function ProductList() {
    const [page, setPage] = useState(1);
    const limit = 10;
    const dispatch = useDispatch();
    const { items, status, paginationMeta } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ page, limit }));
    }, [dispatch, page]);

    // NEW: Handle Delete Click
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error loading products.</div>;

    return (
        <div>
            <h2>Products (Page {paginationMeta.currentPage} of {paginationMeta.totalPages})</h2>
            
            {/* Product List */}
            {items.map(product => (
                <div key={product._id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                    
                    {/* Show Image if it exists */}
                    {product.image && (
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                        />
                    )}
                    
                    {/* NEW: Delete Button */}
                    <button 
                        onClick={() => handleDelete(product._id)}
                        style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                    >
                        Delete
                    </button>
                </div>
            ))}

            {/* Pagination Controls */}
            <div style={{ marginTop: '20px' }}>
                <button 
                    onClick={() => setPage(page - 1)} 
                    disabled={page <= 1}
                >Previous</button>
                
                <span style={{ margin: '0 10px' }}>Page {page}</span>

                <button 
                    onClick={() => setPage(page + 1)} 
                    disabled={page >= paginationMeta.totalPages}
                >Next</button>
            </div>
        </div>
    );
}

export default ProductList;