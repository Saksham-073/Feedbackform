const { NetlifyKV } = require('@netlify/functions');

const FEEDBACK_KEY = 'all_feedback';

const handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { netlifyKv } = context;
    
    let data = [];
    try {
      const existingData = await netlifyKv.get(FEEDBACK_KEY);
      if (existingData) {
        data = JSON.parse(existingData);
      }
    } catch (err) {
      console.log('No existing data found, returning empty array');
    }
    
    data.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.toString() }),
    };
  }
};

exports.handler = NetlifyKV(handler);