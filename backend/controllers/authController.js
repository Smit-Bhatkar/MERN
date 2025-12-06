// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT token (Helper function)
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

// Register new user
exports.register = async (req, res) => { 
    const { email, password } = req.body;

    try {
        // 1. Manually Hash the Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Create the User with the Hashed Password
        const user = await User.create({
            email,
            password: hashedPassword // Save the HASHED password
        }); 

        const token = generateToken(user._id); 
        res.status(201).json({ token }); 
    } catch (err) { 
        res.status(400).json({ error: err.message }); 
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = generateToken(user._id);
        res.json({ token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};