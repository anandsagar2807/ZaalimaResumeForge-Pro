const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
// CORS: allow the deployed frontend (Vercel) plus local dev origins.
// CLIENT_URL can be a single URL or a comma-separated list (e.g.
// "https://carrer-forge-pro2.vercel.app,https://carrer-forge-pro2-git-main.vercel.app").
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:3000')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const corsOriginCheck = (origin, callback) => {
  // Allow requests with no origin (curl, Postman, server-to-server, health checks)
  if (!origin) return callback(null, true);
  // Allow any Vercel preview/production domain for this project
  if (origin.endsWith('.vercel.app')) return callback(null, true);
  if (allowedOrigins.includes(origin)) return callback(null, true);
  callback(new Error(`Origin ${origin} not allowed by CORS`));
};

app.use(cors({
  origin: corsOriginCheck,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Simple rate limiting (in-memory, use redis in production)
const rateLimiter = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 30; // requests per window

const rateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!rateLimiter[ip]) {
    rateLimiter[ip] = [];
  }

  // Clean old entries
  rateLimiter[ip] = rateLimiter[ip].filter(time => now - time < RATE_LIMIT_WINDOW);

  if (rateLimiter[ip].length >= RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  rateLimiter[ip].push(now);
  next();
};

// Apply rate limiting to AI routes
app.use('/api/ai', rateLimit);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/ai/advanced', require('./routes/advancedAIRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));