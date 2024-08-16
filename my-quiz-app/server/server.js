const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));  // Adjust if needed

// API routes
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
    const prompt = `Generate ${numberOfQuestions} quiz questions on the topic of ${topic} for an ${expertise} level audience. The questions should be styled in the manner of ${style}.`;

    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.claude.ai/v1/generate',
            headers: {
                Authorization: `Bearer ${process.env.CLAUDE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            data: {
                prompt,
                max_tokens: 100 * numberOfQuestions,
            },
        });

        const questions = response.data.choices[0].text.split('\n').filter((line) => line.trim());
        res.json({ questions });
    } catch (error) {
        console.error('Error generating quiz:', error);
        res.status(500).send('Failed to generate quiz');
    }
});

app.post('/api/submit-answers', (req, res) => {
    res.json({ success: true, message: 'Answers submitted successfully' });
});

// Catch-all handler for any requests not handled by API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));  // Adjust if needed
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
