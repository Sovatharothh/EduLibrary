const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { verifyToken, authorizeAdmin } = require("../middleware/authMiddleware"); // Import the middleware
const { getAllBooks, getBookById, createBook, deleteBookById, deleteBookByTitle, updateBookById } = require("../controllers/bookController");

// Routes for books
router.get("/", getAllBooks); // Anyone can view all books

// Routes that only admins can access
router.get("/:id", verifyToken, authorizeAdmin, getBookById);  //only admin can view by ID
router.post("/", verifyToken, authorizeAdmin, upload.single("coverImage"), createBook); // Only admins can create
router.put("/:id", verifyToken, authorizeAdmin, upload.single("coverImage"), updateBookById); // Only admins can update
router.delete("/:id", verifyToken, authorizeAdmin, deleteBookById); // Only admins can delete by ID
router.delete("/title/:title", verifyToken, authorizeAdmin, deleteBookByTitle); // Only admins can delete by title

module.exports = router;
