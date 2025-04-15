const express = require("express");
const router = express.Router();
const { submitForm, getAllMessages } = require("../controllers/contactController");
const authMiddleware = require("../middleware/authMiddleware"); // Import  authentication middleware
const checkRole = require("../middleware/checkRole");       // Import the checkRole middleware

// Route for submitting the contact form (accessible to all authenticated users)
router.post("/", authMiddleware, submitForm);

// Route for getting all contact messages (accessible to admin only)
router.get("/", authMiddleware, checkRole(['admin']), getAllMessages);

module.exports = router;