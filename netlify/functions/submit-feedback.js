// netlify/functions/submit-feedback.js
const { writeFileSync, readFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');

// Define a data storage location
const DATA_DIR = path.join(__dirname, '..', '.data');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.json');

// Ensure the data directory exists
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize feedback file if it doesn't exist
if (!existsSync(FEEDBACK_FILE)) {
  writeFileSync(FEEDBACK_FILE, JSON.stringify([]));
}

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the incoming request body
    const feedback = JSON.parse(event.body);
    
    // Validate required fields
    if (!feedback.name || !feedback.email || !feedback.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    // Read existing feedback data
    const data = JSON.parse(readFileSync(FEEDBACK_FILE));
    
    // Add the new feedback
    data.push({
      name: feedback.name,
      email: feedback.email,
      message: feedback.message,
      timestamp: feedback.timestamp || new Date().toISOString(),
    });
    
    // Write back to the file
    writeFileSync(FEEDBACK_FILE, JSON.stringify(data, null, 2));
    
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Feedback submitted successfully' }),
    };
  } catch (error) {
    console.error('Error submitting feedback:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};