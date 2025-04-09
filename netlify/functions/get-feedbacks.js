// netlify/functions/get-feedbacks.js
const { createClient } = require('@netlify/functions');

// Sample data to use when no entries exist yet
const sampleData = [
  {
    name: "John Doe",
    email: "john@example.com",
    message: "This is a great application! I love the interface and how easy it is to use.",
    timestamp: "2025-04-05T10:30:00Z",
    id: "1"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    message: "I found the feedback form very intuitive. The dark mode is also a nice touch!",
    timestamp: "2025-04-06T14:15:00Z",
    id: "2"
  }
];

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  try {
    // For simplicity in this demo, we'll return sample data
    // In a production app, you would use a database or Netlify's KV store
    
    // Check if we have feedbackItems in context
    const feedbackItems = context.feedbackItems || [];
    
    // Combine with sample data if needed
    const allFeedback = [...sampleData, ...feedbackItems];
    
    // Sort by timestamp, newest first
    allFeedback.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(allFeedback),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};