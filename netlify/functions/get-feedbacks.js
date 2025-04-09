// netlify/functions/get-feedbacks.js
const { readFileSync, existsSync } = require('fs');
const path = require('path');

// Define the data file location
const DATA_DIR = path.join(__dirname, '..', '.data');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.json');

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Check if the feedback file exists
    if (!existsSync(FEEDBACK_FILE)) {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    // Read and return the feedback data
    const data = JSON.parse(readFileSync(FEEDBACK_FILE));
    
    // Sort by timestamp, newest first
    data.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};