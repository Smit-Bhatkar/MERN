// frontend/src/app/store.js
import { configureStore } from '@reduxjs/toolkit'; // [cite: 447]
import productsReducer from '../features/productsSlice'; // [cite: 448]

export default configureStore({ // [cite: 449]
    reducer: { // [cite: 450]
        products: productsReducer, // [cite: 451]
    }
});