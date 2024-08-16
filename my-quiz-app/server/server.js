const express = require('express');
const axios = require('axios');
require('dotenv').config({ path: '../.env' }); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

const port = process.env.PORT || 8080; // Use the port from environment variables or default to 8080
const claudeAPIKey = process.env.CLAUDE_API_KEY; // Claude API key from environment variables
const claudeBaseURL = 'https://api.anthropic.com/v1/messages'; // Correct base URL for Claude API

// Handle CORS for cross-origin requests
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes

// Default route for root path
app.get('/', (req, res) => {
  res.send('Welcome to the Quiz API'); // Simple response for the root URL
});

// Quiz topics
app.get('/api/topics', (req, res) => {
  res.json([
    'golang',
    'aws',
    'javascript',
    'ci/cd',
    'home gardens',
    'coffee',
    'finger foods',
  ]);
});

// Quiz questions generation route
app.post('/api/generate-quiz', async (req, res) => {
  const { topic, expertise, numberOfQuestions, style } = req.body; // Extract options from the request body

  // Construct the prompt based on the selected options
  const prompt = `Generate ${numberOfQuestions} quiz questions on the topic of ${topic} for a ${expertise} level audience. The questions should be styled in the manner of ${style}. 
   Just go straight to the questions no other response. Do not give me multiple choices just 5 questions.`;

  try {
    console.log('Sending request to Claude API with prompt:', prompt);

    const response = await axios({
      method: 'post',
      url: claudeBaseURL,
      headers: {
        'x-api-key': claudeAPIKey, // Use the API key from environment variables
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01', // Set the correct API version
      },
      data: {
        model: 'claude-3-5-sonnet-20240620', // Specify the correct model
        max_tokens: 100 * numberOfQuestions, // Adjust max tokens based on the number of questions
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
    });

    console.log('Received response from Claude API:', response.data);

    // Extract the generated questions from the API response
    const questions = response.data.content[0].text.split('\n').filter((line) => line.trim());

    res.json({ questions });
  } catch (error) {
    console.error('Error generating quiz:', error.message);

    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
      res.status(error.response.status).send(`Failed to generate quiz: ${error.response.data}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      res.status(500).send('No response received from Claude API');
    } else {
      console.error('Error during request setup:', error.message);
      res.status(500).send('Failed to generate quiz');
    }
  }
});

// Route to submit answers (placeholder)
app.post('/api/submit-answers', (req, res) => {
  // Placeholder logic for answer submission
  res.json({ success: true, message: 'Answers submitted successfully' });
});

app.post('/api/verify-answer', async (req, res) => {
    const { question, userAnswer, correctAnswer } = req.body;
  
    // Construct a clear prompt for Claude API to compare the answers
    const prompt = `The question is: "${question}". The user's answer is: "${userAnswer}". The correct answer is: "${correctAnswer}". Compare the user's answer to the correct answer. Is the user's answer correct? Reply with "Correct" or "Incorrect".
    As long as the users answer is partially correct, respond with "Correct". It does not have to be the full technical description or a complete explanation.`;
  
    try {
      console.log('Sending verification request to Claude API with prompt:', prompt);
  
      const response = await axios({
        method: 'post',
        url: claudeBaseURL,  
        headers: {
          'x-api-key': claudeAPIKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
        data: {
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 100,
          messages: [
            { role: 'user', content: prompt }
          ]
        }
      });
  
      console.log('Received response from Claude API:', response.data);
  
      // Extract the response and check if it's "Correct" or "Incorrect"
      const answerVerification = response.data.content[0].text.trim().toLowerCase();
      const isCorrect = answerVerification === 'correct';
      
      res.json({ correct: isCorrect });
    } catch (error) {
      console.error('Error verifying answer:', error);
      res.status(500).send('Failed to verify answer');
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
