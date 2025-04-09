const { getStore, connectLambda } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  connectLambda(event);

  try {
    const store = getStore('feedbacks');
    const list = await store.list();

    const feedbacks = await Promise.all(
      list.blobs.map(async (blob) => {
        const response = await store.get(blob.key); 
        const result = JSON.parse(response);       

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
