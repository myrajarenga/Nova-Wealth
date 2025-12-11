import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async (uri) => {
  // 1. If we already have a ready connection, return immediately
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // 2. If we are currently connecting, wait for it (optional, but good for concurrency)
  if (mongoose.connection.readyState === 2) {
    console.log('Using existing connection attempt...');
    return mongoose.connection.asPromise();
  }

  try {
    // 3. Create a new connection with aggressive timeouts for Serverless/Edge
    const conn = await mongoose.connect(uri, {
      autoIndex: false,             // Don't build indexes in production
      maxPoolSize: 1,               // Strict limit for serverless
      serverSelectionTimeoutMS: 5000, // Fail if DB is unreachable (5s)
      connectTimeoutMS: 10000,      // Allow 10s for initial connection
      socketTimeoutMS: 30000,       // Close idle sockets
      bufferCommands: false,        // Don't buffer commands if disconnected
    });
    
    isConnected = true;
    console.log('MongoDB Connected via Mongoose');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Important: Throwing here ensures the Worker fails fast rather than hanging
    throw new Error(`Database connection failed: ${error.message}`);
  }
};
