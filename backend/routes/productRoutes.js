// backend/routes/productRoutes.js
const router = require('express').Router();
const productController = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct').validateProduct;
const { protect } = require('../middleware/auth'); // NEW: Import the protect middleware

// POST /api/products - Create a new product (NOW PROTECTED)
router.post('/', protect, validateProduct, productController.createProduct); // Apply protect middleware

// The rest of the routes (GET, PUT, DELETE) remain the same...
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', validateProduct, productController.updateProduct); 
router.delete('/:id', productController.deleteProduct);

module.exports = router;