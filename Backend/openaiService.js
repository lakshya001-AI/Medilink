const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getAIResponse = async (userMessage) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful health assistant.' },
        { role: 'user', content: userMessage },
      ],
    });``

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error interacting with OpenAI API:', error);
    throw new Error('Failed to get a response from OpenAI');
  }
};

module.exports = { getAIResponse };






