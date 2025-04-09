const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const apiToken = process.env.NETLIFY_API_TOKEN;
  
  if (!apiToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'API token not configured. Please set NETLIFY_API_TOKEN environment variable.' 
      }),
    };
  }

  try {
    const siteId = process.env.SITE_IV;
    
    if (!siteId) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          message: 'Site ID not configured. Please set SITE_ID environment variable.' 
        }),
      };
    }

    const response = await axios.get(
      `https://api.netlify.com/api/v1/sites/${siteId}/forms/feedback/submissions`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );

    const formattedData = response.data.map(submission => ({
      name: submission.data.name,
      email: submission.data.email,
      message: submission.data.message,
      timestamp: submission.created_at
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(formattedData),
    };
  } catch (error) {
    console.error('Error fetching form submissions:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error fetching form submissions',
        error: error.message
      }),
    };
  }
};