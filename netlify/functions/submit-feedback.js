const { getStore, connectLambda } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  connectLambda(event);

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
    const key = `feedback-${Date.now()}`;

    await store.setJSON(key, {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Feedback submitted successfully!' }),
    };
  } catch (error) {
    console.error('❌ Error submitting feedback:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', detail: error.message }),
    };
  }
};
