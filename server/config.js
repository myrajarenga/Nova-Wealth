const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
  logFormat: process.env.LOG_FORMAT || 'combined',  // better for production logs
  frontendUrl: process.env.FRONTEND_URL || "https://nova-wealth-sigma.vercel.app",
  mongoUri: process.env.MONGO_URI,
};