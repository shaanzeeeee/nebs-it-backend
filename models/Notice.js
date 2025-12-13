/**
 * Notice Model (Mongoose Schema)
 * 
 * Defines the structure of a notice document in MongoDB.
 * This is the database schema for all notices in the system.
 */

const mongoose = require('mongoose');

// Define the schema for a notice document
const noticeSchema = new mongoose.Schema({
  // Notice title - required field
  title: {
    type: String,
    required: true,
  },

  // Notice types - can have multiple types (array)
  // Examples: "Warning / Disciplinary", "Performance Improvement", etc.
  type: {
    type: [String],
    required: true,
  },

  // Target departments or individuals - array to support multiple selections
  // Examples: "All Department", "Sales Team", "HR", "Individual", etc.
  department: {
    type: [String],
    required: true,
  },

  // Employee information - who the notice is about
  employeeId: {
    type: String,
  },
  employeeName: {
    type: String,
  },
  position: {
    type: String,
  },

  // When the notice should be published
  publishDate: {
    type: Date,
  },

  // Notice status - controls visibility and workflow
  // Published: visible to everyone
  // Draft: work in progress, not visible
  // Unpublished: was published but now hidden
  status: {
    type: String,
    enum: ['Published', 'Draft', 'Unpublished'],
    default: 'Draft',
  },

  // File attachments - stores file names as strings
  attachments: {
    type: [String],
    default: [],
  },

  // Main content/body of the notice
  content: {
    type: String,
  },

  // Timestamp - automatically set when notice is created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model so it can be used in routes
module.exports = mongoose.model('Notice', noticeSchema);
