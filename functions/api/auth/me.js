import jwt from 'jsonwebtoken';
import { connectDB } from '../../utils/db.js';
import User from '../../models/User.js';

export const onRequestGet = async (context) => {
  const { request, env } = context;

  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ message: 'Not authorized' }), { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET || 'change_me_dev_secret');
    
    // Connect to DB
    if (env.MONGO_URI) {
      const dbPromise = connectDB(env.MONGO_URI);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timed out')), 15000)
      );
      await Promise.race([dbPromise, timeoutPromise]);
    } else {
       throw new Error("MONGO_URI is missing");
    }

    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Auth Me Error:", error);
    return new Response(JSON.stringify({ message: 'Not authorized, token failed' }), { status: 401 });
  }
};
