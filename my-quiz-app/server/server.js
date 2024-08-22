const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.REACT_APP_API_BASE_URL || '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const port = process.env.PORT || 8080;
const claudeAPIKey = process.env.CLAUDE_API_KEY;
const claudeBaseURL = 'https://api.anthropic.com/v1/messages';

app.use(express.static(path.join(__dirname, '../dist')));

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

app.post('/api/generate-quiz', async (req, res) => {
  const { topic, expertise, numberOfQuestions, style } = req.body;

  const prompt = `Generate ${numberOfQuestions} quiz questions on the topic of ${topic} for a ${expertise} level audience. The questions should be styled in the manner of ${style}. Just go straight to the questions no other response. Do not give me multiple choices just 5 questions.`;

  try {
    console.log('Sending request to Claude API with prompt:', prompt);

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
        max_tokens: 100 * numberOfQuestions,
        messages: [
          { role: 'user', content: prompt },
        ],
      },
    });

    console.log('Received response from Claude API:', response.data);

    const questions = response.data.content[0].text.split('\n').filter((line) => line.trim());
    res.json({ questions });
  } catch (error) {
    console.error('Error generating quiz:', error.message);

    if (error.response) {
      console.error('Error response data:', error.response.data);
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

app.post('/api/verify-answer', async (req, res) => {
  const { question, userAnswer, correctAnswer } = req.body;
  // Update the prompt to request an explanation
  const prompt = `The question is: "${question}". The user's answer is: "${userAnswer}". The correct answer is: "${correctAnswer}".
  Compare the user's answer to the correct answer, the user's answer does not have to be the full technical description,can be one word answers, and partially correct to be 'Correct'. 
  Is the user's answer correct? Reply with "Correct" or "Incorrect". Also, provide a brief explanation of why the answer is correct or incorrect.`;
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
        max_tokens: 150, 
        messages: [
          { role: 'user', content: prompt },
        ],
      },
    });

    console.log('Received response from Claude API:', response.data);
    // Extract the response text
    const responseText = response.data.content[0].text.trim();
    // Check if the response starts with "Correct" or "Incorrect"
    const isCorrect = responseText.toLowerCase().startsWith('correct');
    // Extract the explanation (everything after the first line)
    const explanation = responseText.split('\n').slice(1).join(' ') || 'No explanation provided.';
    // Send both the correctness and the explanation back to the user
    res.json({ correct: isCorrect, explanation });
  } catch (error) {
    console.error('Error verifying answer:', error);
    res.status(500).send('Failed to verify answer');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
