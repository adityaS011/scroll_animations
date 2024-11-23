import axios from 'axios';

export async function handler(event: any) {
  const { code, timeline } = event.queryStringParameters || {};

  if (!code || !timeline) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing required query parameters: code or timeline',
      }),
    };
  }

  try {
    // Fetch data from the actual API
    const response = await axios.get(
      'https://actual-api-domain.com/api/currency-converter/forex',
      {
        params: { code, timeline }, // Send the required query parameters
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data), // Return the fetched data
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow CORS for all domains
      },
    };
  } catch (error) {
    console.error('Error fetching forex data:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal Server Error',
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow CORS for all domains
      },
    };
  }
}
