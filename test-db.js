/**
 * Database Connection Test
 * 
 * Simple script to test if we can connect to MongoDB and perform write operations.
 * This is the most basic test - just checks if the database is accessible.
 * 
 * Run with: node test-db.js
 */

const mongoose = require('mongoose');

// MongoDB connection string
// NOTE: This has hardcoded credentials - in production, use environment variables!
const MONGO_URI = 'mongodb+srv://shaan:shaan123@cluster0.9t84pxl.mongodb.net/noticeboard?appName=Cluster0';

console.log('Attempting to connect to:', MONGO_URI);

/**
 * Connect to MongoDB and test write operation
 */
mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
        console.log('MongoDB Connected Successfully!');

        try {
            // Create a simple test schema/model
            const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));

            // Try to write a test document
            await Test.create({ name: 'Connection Check' });

            console.log('Write operation successful!');
            process.exit(0); // Exit with success code

        } catch (err) {
            // Write operation failed
            console.error('Write failed:', err);
            process.exit(1); // Exit with error code
        }
    })
    .catch(err => {
        // Connection failed
        console.error('Connection failed:', err);
        process.exit(1); // Exit with error code
    });
