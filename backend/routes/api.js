const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in the environment variables.');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/chatbot', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('--- DETAILED AI ERROR ---');
    console.error('Error Message:', error.message);
    console.error('Error Details:', error.details);
    console.error('Full Error Object:', JSON.stringify(error, null, 2));
    console.error('--- END OF AI ERROR ---');
    res.status(500).json({ error: 'Failed to get a response from the AI. Check server logs for details.' });
  }
});

module.exports = router;
