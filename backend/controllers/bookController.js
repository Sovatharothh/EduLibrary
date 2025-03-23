const Book = require("../models/Book");

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json({ status: 200, message: "Books fetched", body: books });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Server error", body: {} });
    }
};

// Create a new book
exports.createBook = async (req, res) => {
    const { title, author, category, year, description, coverImage } = req.body;

    // Basic validation
    if (!title || !author || !category || !year || !description || !coverImage) {
        return res.status(400).json({ status: 400, message: "All fields are required" });
    }

    try {
        const book = new Book({ title, author, category, year, description, coverImage });
        await book.save();
        res.status(201).json({ status: 201, message: "Book created", body: book });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Server error", body: {} });
    }
};

// Delete a book by ID
exports.deleteBookById = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ status: 404, message: "Book not found", body: {} });
        }
        res.json({ status: 200, message: "Book deleted", body: book });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Server error", body: {} });
    }
};

// Delete a book by title
exports.deleteBookByTitle = async (req, res) => {
    const { title } = req.params;

    try {
        const book = await Book.findOneAndDelete({ title: title });
        if (!book) {
            return res.status(404).json({ status: 404, message: "Book not found", body: {} });
        }
        res.json({ status: 200, message: "Book deleted", body: book });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Server error", body: {} });
    }
};

// Update a book by ID
exports.updateBookById = async (req, res) => {
    const { id } = req.params;
    const { title, author, category, year, description, coverImage } = req.body;

    // Basic validation
    if (!title || !author || !category || !year || !description || !coverImage) {
        return res.status(400).json({ status: 400, message: "All fields are required" });
    }

    try {
        const book = await Book.findByIdAndUpdate(
            id,
            { title, author, category, year, description, coverImage },
            { new: true } // Return the updated document
        );

        if (!book) {
            return res.status(404).json({ status: 404, message: "Book not found", body: {} });
        }

        res.json({ status: 200, message: "Book updated", body: book });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Server error", body: {} });
    }
};
