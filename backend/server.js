require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Import Product Routes
const productRoutes = require('./routes/productRoutes');

// Import Auth Routes
const authRoutes = require('./routes/authRoutes');

// Use Auth Routes
app.use('/api/auth', authRoutes);

// Use Product Routes
app.use('/api/products', productRoutes);

// Use Product Routes - All endpoints will start with /api/products
app.use('/api/products', productRoutes);

// 13. Error Handling Middleware (add after routes) [cite: 92]
app.use((err, req, res, next) => {
    console.error(err.stack); //
    res.status(500).json({ error: 'Internal server error' }); //
});

// 4. Start the server
app.listen(3000, () => console.log('Server running on port 3000')); // Corrected arrow function syntax

