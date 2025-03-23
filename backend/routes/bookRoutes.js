const express = require("express");
const router = express.Router();
const { getAllBooks, getBookById, createBook, deleteBookById, deleteBookByTitle, updateBookById } = require("../controllers/bookController");

// Routes for books
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.delete("/:id", deleteBookById);
router.delete("/title/:title", deleteBookByTitle); 
router.put("/:id", updateBookById);

module.exports = router;
