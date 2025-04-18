const express = require('express');
const { getAllUsers, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { verifyToken, authorizeAdmin } = require("../middleware/authMiddleware"); // Import the middleware

const router = express.Router();

// Get all users (admin only)
router.get('/', verifyToken, authorizeAdmin, getAllUsers);

// Get a user's profile (user only)
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);

module.exports = router;
