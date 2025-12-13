/**
 * Notice Routes
 * 
 * API endpoints for managing notices.
 * Handles CRUD operations (Create, Read, Update, Delete) for notices.
 * 
 * Base URL: /api/notices
 */

const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');

/**
 * POST /api/notices
 * Create a new notice
 * 
 * Request body should contain notice data (title, type, department, etc.)
 * Returns the created notice with a 201 status code
 */
router.post('/', async (req, res) => {
    try {
        console.log('POST /api/notices - Received:', req.body);

        // Create a new notice instance from the request body
        const notice = new Notice(req.body);

        console.log('Attempting to save notice...');

        // Save to database
        const savedNotice = await notice.save();

        console.log('Notice saved successfully:', savedNotice._id);

        // Return the saved notice with 201 Created status
        res.status(201).json(savedNotice);
    } catch (error) {
        console.error('Error saving notice:', error.name, error.message);
        res.status(400).json({ message: error.message });
    }
});

/**
 * GET /api/notices
 * Get all notices with optional filtering
 * 
 * Query params:
 * - status: Filter by status (Published, Draft, Unpublished)
 * - search: Search term (not yet implemented)
 * 
 * Returns array of notices sorted by creation date (newest first)
 */
router.get('/', async (req, res) => {
    try {
        console.log('GET /api/notices - Query params:', req.query);

        const { status, search } = req.query;
        let query = {};

        // Filter by status if provided
        if (status) {
            query.status = status;
        }

        // You can add more filters here if needed (like search by title, department, etc.)

        console.log('Attempting to find notices with query:', query);

        // Fetch notices from database, sorted by newest first
        const notices = await Notice.find(query).sort({ createdAt: -1 });

        console.log(`Found ${notices.length} notices`);

        res.json(notices);
    } catch (error) {
        console.error('Error fetching notices:', error.name, error.message);
        res.status(500).json({ message: error.message });
    }
});

/**
 * PUT /api/notices/:id/status
 * Update only the status of a specific notice
 * 
 * This route must come before the general /:id route to avoid conflicts
 * 
 * Request body: { status: "Published" | "Draft" | "Unpublished" }
 * Returns the updated notice
 */
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        // Find and update the notice status
        const notice = await Notice.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true } // Return the updated document
        );

        // Handle case where notice doesn't exist
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        res.json(notice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * PUT /api/notices/:id
 * Update an entire notice
 * 
 * This route must come before the GET /:id route to avoid conflicts
 * 
 * Request body should contain all fields to update
 * Returns the updated notice
 */
router.put('/:id', async (req, res) => {
    try {
        console.log('PUT /api/notices/:id - Updating notice:', req.params.id);

        // Find and update the notice with all provided fields
        const notice = await Notice.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // Return the updated document
                runValidators: true // Run schema validation on update
            }
        );

        // Handle case where notice doesn't exist
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        console.log('Notice updated successfully:', notice._id);

        res.json(notice);
    } catch (error) {
        console.error('Error updating notice:', error.name, error.message);
        res.status(400).json({ message: error.message });
    }
});

/**
 * GET /api/notices/:id
 * Get a single notice by ID
 * 
 * This route must come after more specific routes (like /:id/status)
 * to avoid route conflicts
 * 
 * Returns the notice if found, 404 if not found
 */
router.get('/:id', async (req, res) => {
    try {
        console.log('GET /api/notices/:id - Fetching notice:', req.params.id);

        // Find notice by ID
        const notice = await Notice.findById(req.params.id);

        // Handle case where notice doesn't exist
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        console.log('Notice found:', notice._id);

        res.json(notice);
    } catch (error) {
        console.error('Error fetching notice:', error.name, error.message);
        res.status(500).json({ message: error.message });
    }
});

// Export the router to be used in the main server file
module.exports = router;
