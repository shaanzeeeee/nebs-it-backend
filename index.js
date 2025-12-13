/**
 * Express Server - Main Entry Point
 * 
 * This is the main server file that sets up the Express application,
 * connects to MongoDB, and starts listening for requests.
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const noticeRoutes = require('./routes/noticeRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Middleware Setup
 * These run on every request before hitting the routes
 */

// CORS - allows frontend to make requests from a different origin
// Configured for both local development and production deployment
const allowedOrigins = [
    'http://localhost:5173',                                      // Local development
    'http://localhost:3000',                                      // Alternative local port
    'https://nebs-it-frontend-shaanzeeeee-v2.vercel.app',        // Production frontend
    process.env.FRONTEND_URL,                                     // Additional frontend URL from env
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes(undefined)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// JSON parser - converts request body to JSON
app.use(express.json());

/**
 * Request Logger Middleware
 * Logs every incoming request with timestamp, method, and URL
 * Helpful for debugging and monitoring
 */
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

/**
 * Routes Setup
 * All notice-related endpoints are handled by noticeRoutes
 * Base path: /api/notices
 */
app.use('/api/notices', noticeRoutes);

/**
 * MongoDB Connection String
 * Uses environment variable if available, otherwise falls back to local MongoDB
 */
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/noticeboard';

/**
 * Start Server Function
 * 
 * Important: We connect to MongoDB FIRST, then start the Express server.
 * This ensures the database is ready before accepting requests.
 */
async function startServer() {
    try {
        // Step 1: Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');

        // Step 2: Start Express server (only after DB is connected)
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        // If MongoDB connection fails, log error and exit
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit with error code
    }
}

// Actually start the server
startServer();
