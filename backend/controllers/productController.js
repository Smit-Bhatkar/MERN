const Product = require('../models/Product');

// 1. Create (POST)
exports.createProduct = async (req, res) => {
    try {
        // NOTE: Authentication and hashing were moved to authController.js and routes/productRoutes.js
        
        const productData = req.body; 
        
        // Check if a file was uploaded by Multer
        if (req.file) { 
            productData.image = req.file.path; // Stores Cloudinary URL [cite: 407]
        }
        
        const product = await Product.create(productData); // [cite: 408]
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message }); // [cite: 411]
    }
};

// 2. Read All (GET /)
exports.getAllProducts = async (req, res) => {
    try {
        // 1. Get query parameters or use defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit; // Calculate how many documents to skip

        // 2. Fetch products and total count concurrently
        const [products, total] = await Promise.all([
            // Fetch products with skip/limit
            Product.find().skip(skip).limit(limit), 
            // Get total count of documents
            Product.countDocuments()
        ]); 
        
        // 3. Return products and pagination metadata
        res.json({
            data: products,
            pagination: {
                currentPage: page,
                // Corrected calculation for totalPages
                totalPages: Math.ceil(total / limit), 
                totalItems: total
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// --- CRUD Functions to Add ---

// 3. Read By ID (GET /:id)
exports.getProductById = async (req, res) => {
    try {
        // Mongoose method to find a single document by its ID
        const product = await Product.findById(req.params.id); // Product.findById() [cite: 112]
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' }); // 404 Not Found [cite: 120]
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// 4. Update (PUT /:id)
exports.updateProduct = async (req, res) => {
    try {
        // Find by ID and update, returning the new document
        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // {new: true} returns the updated doc.
        ); // Product.findByIdAndUpdate() [cite: 113]
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        // Use 400 for validation errors that might occur during the update
        res.status(400).json({ error: err.message });
    }
};

// 5. Delete (DELETE /:id)
exports.deleteProduct = async (req, res) => {
    try {
        // Mongoose method to find and delete a single document by its ID
        const product = await Product.findByIdAndDelete(req.params.id); // Product.findByIdAndDelete() [cite: 114]
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // Send 204 No Content for a successful deletion
        res.status(204).send(); // Send appropriate HTTP status codes (204 or 404) [cite: 120]
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};