// backend/routes/productRoutes.js
const router = require('express').Router();
const productController = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct').validateProduct;
const { protect } = require('../middleware/auth'); // NEW: Import the protect middleware
const upload = require('../middleware/upload'); // NEW: Import file upload middleware

// Updated POST route with file upload middleware (assuming 'image' is the field name)
router.post('/', protect, upload.single('image'), validateProduct, productController.createProduct); // Apply protect middleware

// The rest of the routes (GET, PUT, DELETE) remain the same...
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', validateProduct, productController.updateProduct); 
router.delete('/:id', productController.deleteProduct);

module.exports = router;