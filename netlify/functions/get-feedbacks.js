const { getStore, connectBlob } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  connectBlob();

  try {
    const store = getStore('feedbacks');
    const list = await store.list();

    const feedbacks = await Promise.all(
      list.blobs.map(async (blob) => {
        const result = await store.getJSON(blob.key); 

        return {
          name: result.name,
          email: result.email,
          message: result.message,
          timestamp: result.timestamp,
        };
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(feedbacks),
    };
  } catch (error) {
    console.error('❌ Error retrieving feedback:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', detail: error.message }),
    };
  }
};
