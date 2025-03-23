const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json({ status: 200, message: "Books fetched", body: books });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Server error", body: {} });
    }
};

exports.createBook = async (req, res) => {
    try {
        const { title, author, category, year, description, coverImage } = req.body;
        const book = new Book({ title, author, category, year, description, coverImage });

        await book.save();
        res.status(201).json({ status: 201, message: "Book created", body: book });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Server error", body: {} });
    }
};
