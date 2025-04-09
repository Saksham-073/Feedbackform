
const { NetlifyKV } = require('@netlify/functions');

const FEEDBACK_KEY = 'all_feedback';

const handler = async (event, context) => {
  
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const feedback = JSON.parse(event.body);
    
    if (!feedback.name || !feedback.email || !feedback.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    const { netlifyKv } = context;
    
    let data = [];
    try {
      const existingData = await netlifyKv.get(FEEDBACK_KEY);
      if (existingData) {
        data = JSON.parse(existingData);
      }
    } catch (err) {
      console.log('No existing data found, creating new array');
    }
    
    data.push({
      id: Date.now().toString(), 
      name: feedback.name,
      email: feedback.email,
      message: feedback.message,
      timestamp: feedback.timestamp || new Date().toISOString(),
    });
    
    await netlifyKv.set(FEEDBACK_KEY, JSON.stringify(data));
    
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Feedback submitted successfully' }),
    };
  } catch (error) {
    console.error('Error submitting feedback:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.toString() }),
    };
  }
};

exports.handler = NetlifyKV(handler);