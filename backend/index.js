const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("./config/db");

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/books", require("./routes/bookRoutes")); 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
