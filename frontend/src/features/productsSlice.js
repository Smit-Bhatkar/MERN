// frontend/src/features/productsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../services/api';

// Existing fetch action...
export const fetchProducts = createAsyncThunk('products/fetch', async (pagination) => {
    const { page, limit } = pagination;
    const response = await API.get(`/products?page=${page}&limit=${limit}`);
    return response.data;
});

// NEW: Add Delete Action
export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
    await API.delete(`/products/${id}`);
    return id; // Return the ID so we know which one to remove from the state
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        paginationMeta: { currentPage: 1, totalPages: 1, totalItems: 0 }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Existing Fetch cases...
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data;
                state.paginationMeta = action.payload.pagination;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // NEW: Handle Delete Success
            .addCase(deleteProduct.fulfilled, (state, action) => {
                // Remove the deleted item from the Redux store immediately
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export default productsSlice.reducer;