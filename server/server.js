require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { config } = require('./config');
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');

const app = express();

// ---------------------
// Security & Performance
// ---------------------
app.use(helmet());
app.use(compression()); // gzip compression

// CORS handling
app.use(
  cors({
    origin: [
      "https://nova-wealth-sigma.vercel.app",
      "http://localhost:5173",
      process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true
  })
);

// JSON parsing
app.use(express.json());

// Smart logging (less noisy in production)
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : config.logFormat)
);

// ---------------------
// Health Check
// ---------------------
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    env: config.env,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Home route
app.get('/', (req, res) => {
  res.send('Nova Wealth API is running.');
});

// ---------------------
// Routes
// ---------------------
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// ---------------------
// Start Server
// ---------------------
const port = process.env.PORT || config.port || 5000;

async function start() {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ Missing MONGO_URI. Cannot start server.');
      process.exit(1);
    }

    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: false, // faster for production
    });

    console.log('✅ MongoDB connected.');

    // --- Export for Cloudflare Worker ---
    module.exports = app;

  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

start();