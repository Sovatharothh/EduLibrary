const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); 
const { getAllBooks, getBookById, createBook, deleteBookById, deleteBookByTitle, updateBookById } = require("../controllers/bookController");

// Routes for books
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", upload.single("coverImage"), createBook); 
router.put("/:id", upload.single("coverImage"), updateBookById); 
router.delete("/:id", deleteBookById);
router.delete("/title/:title", deleteBookByTitle);

module.exports = router;
