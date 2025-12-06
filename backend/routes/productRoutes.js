// routes/productRoutes.js
const router = require('express').Router();
const productController = require('../controllers/productController');
const { validateProduct } = require('../middleware/validateProduct');

// POST /api/products - Create a new product
router.post('/', validateProduct, productController.createProduct);

// GET /api/products - Get all products
router.get('/', productController.getAllProducts);

// --- Routes to Add ---

// GET /api/products/:id - Get a single product by ID
router.get('/:id', productController.getProductById); // Add GET/:id [cite: 90]

// PUT /api/products/:id - Update a product by ID (Needs validation too)
router.put('/:id', validateProduct, productController.updateProduct); // Add PUT/:id [cite: 90]

// DELETE /api/products/:id - Delete a product by ID
router.delete('/:id', productController.deleteProduct); // Add DELETE/:id [cite: 90]

module.exports = router;