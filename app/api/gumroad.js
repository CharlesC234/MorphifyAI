'use client';
// pages/api/gumroad/route.ts

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Get the data from the request body
      const data = req.body;

      // Print the data to the console
      console.log('Received POST request data: ', data);

      // Respond with a 200 status code
      res.status(200).json({ message: 'Request received successfully' });
    } catch (error) {
      console.error('Error processing POST request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Respond with a 405 Method Not Allowed if the request is not a POST
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

