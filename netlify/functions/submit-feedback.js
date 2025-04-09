const { writeFileSync, readFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '.data');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.json');

if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

if (!existsSync(FEEDBACK_FILE)) {
  writeFileSync(FEEDBACK_FILE, JSON.stringify([]));
}

exports.handler = async (event, context) => {
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

    const data = JSON.parse(readFileSync(FEEDBACK_FILE));
    
    data.push({
      name: feedback.name,
      email: feedback.email,
      message: feedback.message,
      timestamp: feedback.timestamp || new Date().toISOString(),
    });
    
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