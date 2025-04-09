const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const store = getStore('feedbacks');

  try {
    const list = await store.list();
    const feedbacks = [];

    for (const key of list.blobs) {
      const feedback = await store.getJSON(key);
      feedbacks.push({ key, ...feedback });
    }

    return {
      statusCode: 200,
      body: JSON.stringify(feedbacks),
    };
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch feedbacks' }),
    };
  }
};
