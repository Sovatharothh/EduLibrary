// checkMongo.js

require('dotenv').config({ path: '../.env' }); // Load .env from parent directory
const mongoose = require('mongoose');

const checkMongo = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.error("❌ MONGO_URI is undefined. Check your .env file path or variable name.");
      process.exit(1);
    }

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected to: ${conn.connection.name}`);

    const collections = await conn.connection.db.listCollections().toArray();
    console.log("📦 Collections:", collections.map(col => col.name));
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

checkMongo();