/**
 * MongoDB Diagnostic Tool
 * 
 * This script tests the MongoDB connection and performs basic CRUD operations
 * to ensure everything is working correctly. Useful for troubleshooting.
 * 
 * Run with: node diagnose.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

console.log('--- DIAGNOSTIC START ---');
// Show partial URI for security (don't expose full connection string)
console.log('Using Mongo URI:', MONGO_URI ? MONGO_URI.substring(0, 20) + '...' : 'UNDEFINED');

/**
 * Main diagnostic function
 * Runs a series of tests to verify MongoDB functionality
 */
async function runDiagnosis() {
    try {
        // Test 1: Connection
        console.log('1. Attempting MongoDB Connection...');
        await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('   [SUCCESS] MongoDB Connected.');

        // Test 2: Model Access
        console.log('2. Testing Schema/Model access...');
        const Notice = require('./models/Notice');

        // Test 3: Read Operation
        console.log('3. Attempting FIND operation...');
        const startFind = Date.now();
        const notices = await Notice.find({}).limit(1);
        console.log(`   [SUCCESS] Find operation took ${Date.now() - startFind}ms. Found ${notices.length} documents.`);

        // Test 4: Create Operation
        console.log('4. Attempting CREATE operation...');
        const newNotice = new Notice({
            title: 'Diagnostic Test',
            type: 'General',
            department: 'IT',
            content: 'Test content',
            publishDate: new Date(),
            status: 'Draft'
        });
        const startSave = Date.now();
        const saved = await newNotice.save();
        console.log(`   [SUCCESS] Save operation took ${Date.now() - startSave}ms. Saved ID: ${saved._id}`);

        // Test 5: Cleanup
        console.log('5. Cleaning up test document...');
        await Notice.findByIdAndDelete(saved._id);
        console.log('   [SUCCESS] Cleanup done.');

        // All tests passed!
        console.log('--- DIAGNOSIS PASSED ---');
        process.exit(0);

    } catch (err) {
        // Something went wrong - show detailed error info
        console.error('\\n!!! DIAGNOSIS FAILED !!!');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);
        if (err.cause) console.error('Cause:', err.cause);
        process.exit(1);
    }
}

// Run the diagnostic
runDiagnosis();
