const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Initialize the store
    const store = getStore('feedbackList');

    // Retrieve the feedback list from the store
    const feedbackList = await store.get('feedbackList.json') || [];

    // Sort feedback by timestamp in descending order
    feedbackList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return {
      statusCode: 200,
      body: JSON.stringify(feedbackList),
    };
  } catch (error) {
    console.error('Error retrieving feedback:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.toString() }),
    };
  }
};
