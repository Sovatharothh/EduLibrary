const express = require("express");
const router = express.Router();
const { getAllBooks, createBook, deleteBookById, deleteBookByTitle, updateBookById } = require("../controllers/bookController");

// Routes for books
router.get("/", getAllBooks);
router.post("/", createBook);
router.delete("/:id", deleteBookById);
router.delete("/title/:title", deleteBookByTitle); 
router.put("/:id", updateBookById);

module.exports = router;
