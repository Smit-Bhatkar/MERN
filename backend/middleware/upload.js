// backend/middleware/upload.js
const multer = require('multer'); // [cite: 385]
const cloudinary = require('cloudinary').v2; // [cite: 386, 387]
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // [cite: 388]

// Configure Cloudinary using .env variables
cloudinary.config({ // [cite: 389]
    cloud_name: process.env.CLOUD_NAME, // [cite: 390]
    api_key: process.env.CLOUD_API_KEY, // [cite: 391]
    api_secret: process.env.CLOUD_API_SECRET // [cite: 392]
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({ // [cite: 394]
    cloudinary: cloudinary, // [cite: 395]
    params: { folder: 'products' } // [cite: 396]
});

// Create Multer instance using the configured storage
const upload = multer({ storage }); // [cite: 398]

module.exports = upload; // [cite: 399]