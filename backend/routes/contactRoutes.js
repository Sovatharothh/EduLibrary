const express = require("express");
const { submitForm, getAllMessages } = require("../controllers/contactController");
const { verifyToken, authorizeAdmin } = require("../middleware/authMiddleware"); // Import the middleware
const router = express.Router();


router.post("/", submitForm);
router.get("/", verifyToken, authorizeAdmin, getAllMessages); // Only admins can view all messages

module.exports = router;
