const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['Textbooks', 'Science', 'History', 'Biography', 'Adventure', 'Fantasy'],
        required: true 
    },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true }, // Image URL
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
