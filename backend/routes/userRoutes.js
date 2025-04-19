const express = require('express');
const { getAllUsers, getUserProfile, updateProfileById, createUser, updateUser,deleteUserById} = require('../controllers/userController');
const { verifyToken, authorizeAdmin } = require("../middleware/authMiddleware"); // Import the middleware

const router = express.Router();

// Get all users (admin only)
router.get('/', verifyToken, authorizeAdmin, getAllUsers);
router.post('/', verifyToken, authorizeAdmin, createUser);  
router.put('/:userId', verifyToken, authorizeAdmin, updateUser);  
router.delete('/:userId', verifyToken, authorizeAdmin, deleteUserById);

// Get a user's profile 
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile/:userId', verifyToken, updateProfileById);

module.exports = router;
