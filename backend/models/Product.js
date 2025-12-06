// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0
    },
    inStock: { 
        type: Boolean, 
        default: true 
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt [cite: 109]

module.exports = mongoose.model('Product', productSchema); // [cite: 51]