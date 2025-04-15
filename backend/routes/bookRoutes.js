const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { getAllBooks, getBookById, createBook, deleteBookById, deleteBookByTitle, updateBookById } = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware"); // Import your authentication middleware
const checkRole = require("../middleware/checkRole");       // Import the checkRole middleware

// Public routes (accessible to all authenticated users)
router.get("/", authMiddleware, checkRole(['admin', 'service_user']), getAllBooks);
router.get("/:id", authMiddleware, checkRole(['admin', 'service_user']), getBookById);

// Protected routes (admin only)
router.post("/", authMiddleware, checkRole(['admin']), upload.single("coverImage"), createBook);
router.put("/:id", authMiddleware, checkRole(['admin']), upload.single("coverImage"), updateBookById);
router.delete("/:id", authMiddleware, checkRole(['admin']), deleteBookById);
router.delete("/title/:title", authMiddleware, checkRole(['admin']), deleteBookByTitle);

module.exports = router;