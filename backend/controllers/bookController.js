const Book = require("../models/Book");
const { uploadFileToS3 } = require("../utils/s3Uploader");

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(); // This will include 'seeMore'
    res.json({ status: 200, message: "Books fetched", body: books });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error", body: {} });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, category, year, description, seeMore } = req.body; // Added seeMore
  const file = req.file;

  if (!title || !author || !category || !year || !description || !file) {
    return res.status(400).json({
      status: 400,
      message: "All fields including image are required",
    });
  }

  try {
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(400).json({
        status: 400,
        message: "Book with this title already exists",
      });
    }

    const uploadResult = await uploadFileToS3(file);
    const coverImage = uploadResult.fileUrl;

    const book = new Book({
      title,
      author,
      category,
      year,
      description,
      coverImage,
      seeMore, // Include seeMore when creating the book
    });

    await book.save();

    res.status(201).json({
      status: 201,
      message: "Book created",
      body: book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Server error", body: {} });
  }
};

// Delete a book by ID
exports.deleteBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res
        .status(404)
        .json({ status: 404, message: "Book not found", body: {} });
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
    const book = await Book.findOneAndDelete({ title });
    if (!book) {
      return res
        .status(404)
        .json({ status: 404, message: "Book not found", body: {} });
    }
    res.json({ status: 200, message: "Book deleted", body: book });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error", body: {} });
  }
};

// Update a book by ID
exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { title, author, category, year, description, seeMore } = req.body;
  const file = req.file;

  if (!title || !author || !category || !year || !description) {
    return res
      .status(400)
      .json({ status: 400, message: "All fields are required" });
  }

  try {
    const existingBook = await Book.findOne({ title, _id: { $ne: id } });
    if (existingBook) {
      return res.status(400).json({
        status: 400,
        message: "Book with this title already exists",
      });
    }

    let coverImage;

    if (file) {
      const uploadResult = await uploadFileToS3(file);
      coverImage = uploadResult.fileUrl; // ✅ Use public S3 URL
    }

    const book = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        category,
        year,
        description,
        seeMore, // Include seeMore when updating the book
        ...(coverImage && { coverImage }), // only update coverImage if new one is provided
      },
      { new: true }
    );

    if (!book) {
      return res
        .status(404)
        .json({ status: 404, message: "Book not found", body: {} });
    }

    res.json({ status: 200, message: "Book updated", body: book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Server error", body: {} });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id); // This will include 'seeMore'
    if (!book) {
      return res
        .status(404)
        .json({ status: 404, message: "Book not found", body: {} });
    }
    res.json({ status: 200, message: "Book fetched", body: book });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error", body: {} });
  }
};