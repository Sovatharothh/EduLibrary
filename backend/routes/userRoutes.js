const express = require('express');
const { getAllUsers, getUserProfile, updateUserProfile, deleteUserByName } = require('../controllers/userController');
const { verifyToken, authorizeAdmin } = require("../middleware/authMiddleware"); // Import the middleware

const router = express.Router();

// Get all users (admin only)
router.get('/', verifyToken, authorizeAdmin, getAllUsers);
// delete user by name (only admin)
router.delete('/profile/:fullname', verifyToken, authorizeAdmin, deleteUserByName);


// Get a user's profile (user only)
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);

module.exports = router;
