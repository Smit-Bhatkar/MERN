// backend/routes/productRoutes.js
const router = require('express').Router();
const productController = require('../controllers/productController');
const { validateProduct } = require('../middleware/validateProduct');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload'); // Import upload middleware

// POST /api/products - Create product (Protected + Image Upload)
router.post('/', protect, upload.single('image'), validateProduct, productController.createProduct);

// GET /api/products - Get all products (Pagination support)
router.get('/', productController.getAllProducts);

// GET /api/products/:id - Get single product
router.get('/:id', productController.getProductById);

// PUT /api/products/:id - Update product (Protected + Image Upload)
// FIX: Added upload.single('image') here so it can read the FormData
router.put('/:id', protect, upload.single('image'), validateProduct, productController.updateProduct);

// DELETE /api/products/:id - Delete product (Protected)
router.delete('/:id', protect, productController.deleteProduct);

module.exports = router;