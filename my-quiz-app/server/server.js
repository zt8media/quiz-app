const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;
const claudeAPIKey = process.env.CLAUDE_API_KEY;
const claudeBaseURL = 'https://api.claude.ai/v1';


// quiz topics
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
  
  // quiz questions
  app.post('/api/generate-quiz', async (req, res) => {
    const { topic, expertise, numberOfQuestions, style } = req.body;
  
    // Construct prompt based on the selected options
    const prompt = `Generate ${numberOfQuestions} quiz questions on the topic of ${topic} for an ${expertise} level audience. The questions should be styled in the manner of ${style}.`;
  
    try {
      const response = await axios({
        method: 'post',
        url: `${claudeBaseURL}/generate`,
        headers: {
          Authorization: `Bearer ${claudeAPIKey}`,
          'Content-Type': 'application/json',
        },
        data: {
          prompt,
          max_tokens: 100 * numberOfQuestions, // Adjust max_tokens as needed
        },
      });
  
      // questions from the API response
      const questions = response.data.choices[0].text
        .split('\n')
        .filter((line) => line.trim());
  
      res.json({ questions });
    } catch (error) {
      console.error('Error generating quiz:', error);
      res.status(500).send('Failed to generate quiz');
    }
  });
  
  // submit answers
  app.post('/api/submit-answers', (req, res) => {
    // Here you would handle the logic to compare user answers with correct answers
    // This is a placeholder
    res.json({ success: true, message: 'Answers submitted successfully' });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
