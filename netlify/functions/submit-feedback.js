const { getStore } = require('@netlify/blobs');

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

    const newFeedback = {
      name: feedback.name,
      email: feedback.email,
      message: feedback.message,
      timestamp: feedback.timestamp || new Date().toISOString(),
      id: Date.now().toString(),
    };

    // Initialize the store
    const store = getStore('feedbackList');

    // Retrieve the current feedback list
    let feedbackList = await store.get('feedbackList.json') || [];

    // Add the new feedback
    feedbackList.push(newFeedback);

    // Save the updated feedback list back to the store
    await store.set('feedbackList.json', feedbackList);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Feedback submitted successfully' }),
    };
  } catch (error) {
    console.error('Error submitting feedback:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.toString() }),
    };
  }
};
