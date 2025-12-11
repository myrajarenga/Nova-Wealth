// import { connectDB } from './utils/db';

export const onRequest = async (context) => {
  const { request, env, next } = context;
  const origin = request.headers.get("Origin") || "*";

  // Handle CORS
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  try {
    // Debugging: Ensure next is available
    if (typeof next !== 'function') {
      console.error('Middleware Error: next is not a function. Context keys:', Object.keys(context));
      throw new Error('Internal Server Error: Middleware configuration issue');
    }

    const response = await next();
    
    // Add CORS headers to response
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    
    return response;
  } catch (err) {
    console.error("Middleware Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": "true"
      }
    });
  }
};
