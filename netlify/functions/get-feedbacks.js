const { readFileSync, existsSync } = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '.data');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.json');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    if (!existsSync(FEEDBACK_FILE)) {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    const data = JSON.parse(readFileSync(FEEDBACK_FILE));
    
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