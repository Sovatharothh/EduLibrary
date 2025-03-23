const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Ensure MONGO_URI is defined in the .env file
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is not defined in the .env file");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed!", err);
    process.exit(1);
  }
};

module.exports = connectDB;
