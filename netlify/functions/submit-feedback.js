// netlify/functions/submit-feedback.js
const { createClient } = require('@netlify/functions');

// Create a handler for your function
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Content-Type': 'application/json' }
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
        headers: { 'Content-Type': 'application/json' }
      };
    }

    // Use the Netlify KV Store client
    const { netlifyGraphAuth } = context;
    
    // Create a new feedback entry with timestamp
    const newFeedback = {
      name: feedback.name,
      email: feedback.email,
      message: feedback.message,
      timestamp: feedback.timestamp || new Date().toISOString(),
      id: Date.now().toString() // Use timestamp as unique ID
    };

    // Store in context cache temporarily
    if (!context.feedbackItems) {
      context.feedbackItems = [];
    }
    context.feedbackItems.push(newFeedback);

    return {
      statusCode: 201,
      body: JSON.stringify({ 
        message: 'Feedback submitted successfully',
        feedback: newFeedback
      }),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    console.error('Error submitting feedback:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};