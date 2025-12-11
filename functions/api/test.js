import { connectDB } from '../utils/db';
import mongoose from 'mongoose';

export const onRequest = async (context) => {
  const { env } = context;
  
  const results = {
    db: 'pending',
    email: 'pending',
    env: {}
  };

  try {
    // Test DB
    if (env.MONGO_URI) {
      // Mask the URI for security in output
      const maskedUri = env.MONGO_URI.replace(/:([^@]+)@/, ':****@');
      results.db_config = maskedUri;
      
      await connectDB(env.MONGO_URI);
      results.db = `Connected. State: ${mongoose.connection.readyState}`;
    } else {
      results.db = 'Missing MONGO_URI';
    }

    // Test Email Config
    if (env.RESEND_API_KEY) {
      results.email = 'RESEND_API_KEY is present';
    } else {
      results.email = 'Missing RESEND_API_KEY';
    }
    
    // Check other vars
    results.env = {
      GOOGLE_CLIENT_ID: !!env.GOOGLE_CLIENT_ID,
      FRONTEND_URL: env.FRONTEND_URL
    };

    return new Response(JSON.stringify(results, null, 2), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message, stack: error.stack }, null, 2), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
