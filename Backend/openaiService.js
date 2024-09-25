// const OpenAI = require("openai");
// require("dotenv").config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const getAIResponse = async (userMessage) => {
//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a helpful health assistant." },
//         { role: "user", content: userMessage },
//       ],
//     });
//     ``;

//     return completion.choices[0].message.content;
//   } catch (error) {
//     console.error("Error interacting with OpenAI API:", error);
//     throw new Error("Failed to get a response from OpenAI");
//   }
// };

// module.exports = { getAIResponse };

// const cohere = require("cohere-ai");
// require("dotenv").config();


// // Initialize Cohere with your API key
// cohere.init(process.env.COHERE_API_KEY);

// const getAIResponse = async (userMessage) => {
//   try {
//     // Send a request to Cohere to generate a response
//     const response = await cohere.generate({
//       model: 'command-xlarge-nightly', // You can choose an appropriate model
//       prompt: userMessage,
//       max_tokens: 300, // Limit the response length
//       temperature: 0.8, // Adjust creativity
//     });

//     // Extract the generated text from the response
//     return response.body.generations[0].text;
//   } catch (error) {
//     console.error("Error interacting with Cohere API:", error);
//     throw new Error("Failed to get a response from Cohere");
//   }
// };

// module.exports = { getAIResponse };
