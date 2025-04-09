const { getStore, connectBlob } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  connectBlob(); 

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required' }),
      };
    }

    const store = getStore('feedbacks');
    const timestamp = new Date().toISOString();
    const key = `feedback-${Date.now()}`; 

    await store.setJSON(key, {
      name,
      email,
      message,
      timestamp,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Feedback submitted successfully!' }),
    };
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
