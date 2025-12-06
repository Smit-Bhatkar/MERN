// middleware/validateProduct.js
const { body, validationResult } = require('express-validator');

exports.validateProduct = [
    // Ensure 'name' is not empty after trimming whitespace
    body('name').trim().notEmpty().withMessage('Name is required'),
    
    // Ensure 'price' is a float greater than 0
    body('price').isFloat({gt: 0}).withMessage('Price must be > 0'), 
    
    // Middleware to handle the validation results
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If validation fails, return a 400 Bad Request status with error details [cite: 81]
            return res.status(400).json({ errors: errors.array() });
        }
        // If validation passes, move to the next function (the controller) [cite: 82]
        next();
    }
];