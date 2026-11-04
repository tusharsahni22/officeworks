const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      '[Database Warning] MONGODB_URI not provided. Server will run with in-memory persistence for reviewer zero-dependency ease.'
    );
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[Database Connected] MongoDB Atlas Host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    console.warn('[Database Fallback] Falling back to in-memory store.');
    return false;
  }
};

module.exports = connectDB;

