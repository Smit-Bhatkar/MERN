// frontend/src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../features/productsSlice'; // Import actions
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ProductList() {
    const [page, setPage] = useState(1);
    const limit = 6; // Set limit to 6 per page as per your request
    const dispatch = useDispatch();
    const { items, status, paginationMeta } = useSelector(state => state.products);
    const navigate = useNavigate(); // Initialize hook

    useEffect(() => {
        dispatch(fetchProducts({ page, limit }));
    }, [dispatch, page]);

    // Handle Delete Click
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error loading products.</div>;

    return (
        <div className="container">
            {/* Header with Page Count */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Our Collection</h2>
                <span style={{color: '#6b7280'}}>
                    Page {paginationMeta.currentPage} of {paginationMeta.totalPages}
                </span>
            </div>
            
            {/* Product Grid */}
            <div className="product-grid">
                {items.map(product => (
                    <div key={product._id} className="product-card">
                        {/* Image Section */}
                        {product.image ? (
                            <img src={product.image} alt={product.name} className="product-image" />
                        ) : (
                            <div className="product-image" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af'}}>
                                No Image
                            </div>
                        )}
                        
                        {/* Details Section */}
                        <div className="product-details">
                            {/* Product Name & Price (Restored these so they show up!) */}
                            <h3 style={{margin: '0 0 0.5rem 0', fontSize: '1.1rem'}}>{product.name}</h3>
                            <div className="product-price">${product.price}</div>
                            
                            {/* Action Buttons Container */}
                            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                                {/* Edit Button */}
                                <button 
                                    className="btn-primary" 
                                    style={{ width: 'auto', flex: 1 }}
                                    onClick={() => navigate(`/edit/${product._id}`)}
                                >
                                    Edit
                                </button>

                                {/* Delete Button */}
                                <button 
                                    className="btn-delete"
                                    style={{ marginTop: 0, width: 'auto', flex: 1 }}
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button 
                    onClick={() => setPage(page - 1)} 
                    disabled={page <= 1}
                >
                    &larr; Previous
                </button>
                
                <span style={{fontWeight: 600}}>Page {page}</span>

                <button 
                    onClick={() => setPage(page + 1)} 
                    disabled={page >= paginationMeta.totalPages}
                >
                    Next &rarr;
                </button>
            </div>
        </div>
    );
}

export default ProductList;