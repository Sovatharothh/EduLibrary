const Book = require("../models/Book");
const { uploadFileToS3 } = require("../utils/s3Uploader");

// Helper to check user role
const isServiceUser = (role) => role === "service_user";

// Get all books (accessible to all roles)
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ status: 200, message: "Books fetched", body: books });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error", body: {} });
  }
};

// Create a new book (restricted for service_user)
exports.createBook = async (req, res) => {
  if (isServiceUser(req.user.role)) {
    return res.status(403).json({
      status: 403,
      message: "Access denied. Service users cannot create books.",
    });
  }

  const { title, author, category, year, description } = req.body;
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

// Delete a book by ID (restricted for service_user)
exports.deleteBookById = async (req, res) => {
  if (isServiceUser(req.user.role)) {
    return res.status(403).json({
      status: 403,
      message: "Access denied. Service users cannot delete books.",
    });
  }

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

// Delete a book by title (restricted for service_user)
exports.deleteBookByTitle = async (req, res) => {
  if (isServiceUser(req.user.role)) {
    return res.status(403).json({
      status: 403,
      message: "Access denied. Service users cannot delete books.",
    });
  }

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

// Update a book by ID (restricted for service_user)
exports.updateBookById = async (req, res) => {
  if (isServiceUser(req.user.role)) {
    return res.status(403).json({
      status: 403,
      message: "Access denied. Service users cannot update books.",
    });
  }

  const { id } = req.params;
  const { title, author, category, year, description } = req.body;
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
      coverImage = uploadResult.fileUrl;
    }

    const book = await Book.findByIdAndUpdate(
        id,
        {
          title,
          author,
          category,
          year,
          description,
          ...(coverImage && { coverImage }), // Only update coverImage if a new one is provided
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

// Get a book by ID (accessible to all roles)
exports.getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
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