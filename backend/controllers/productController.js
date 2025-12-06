// backend/controllers/productController.js
const Product = require('../models/Product');

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const productData = req.body;
        // Check if file exists in request
        if (req.file) {
            productData.image = req.file.path;
        }
        const product = await Product.create(productData);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Products (Pagination)
exports.getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [products, total] = await Promise.all([
            Product.find().skip(skip).limit(limit),
            Product.countDocuments()
        ]);

        res.json({
            data: products,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Single Product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const productData = req.body;

        // Check if a new file was uploaded during update
        if (req.file) {
            productData.image = req.file.path; 
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            productData, 
            { new: true, runValidators: true }
        );

        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};