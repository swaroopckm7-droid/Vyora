import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vyorathreads';
    console.log(`Connecting to MongoDB at: ${connStr}`);
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000 // Quick timeout to fallback cleanly if local mongo is offline
    });
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`MongoDB Connection Notice: ${error.message}. Express will run with in-memory fallback dataset.`);
    return false;
  }
};
