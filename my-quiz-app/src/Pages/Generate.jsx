import React, { useState } from 'react';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

function Generate() {
  const [topic, setTopic] = useState('golang'); // Defaulting quiz answer choices
  const [expertise, setExpertise] = useState('novice'); 
  const [numberOfQuestions, setNumberOfQuestions] = useState(5); 
  const [style, setStyle] = useState('normal'); 
  const [quizGenerated, setQuizGenerated] = useState(false); // Tracks whether the quiz has been generated
  const [questions, setQuestions] = useState([]); // Holds the generated quiz questions
  const [loading, setLoading] = useState(false); // Tracks loading state for data fetching
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [userAnswer, setUserAnswer] = useState(''); // Stores the user's answer
  const [feedback, setFeedback] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); // Error message in case of failure

  // Handles quiz generation by sending selected options to the API and fetching quiz questions
  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when fetching data
    setErrorMessage('');

    // Object with selected quiz options
    const quizData = {
      topic,
      expertise,
      numberOfQuestions,
      style,
    };

    try {
      // Sending POST request to backend API for quiz
      const response = await fetch(`${API_BASE_URL}/api/generate-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Received response from Claude API:', data);
        // Verifies that response contains a valid questions array
        if (data && Array.isArray(data.questions) && data.questions.length > 0) {
          // Map the questions to an array of objects and store them in state
          const questionsArray = data.questions.map((question) => ({
            question: question,
          }));

          setQuestions(questionsArray); // Set fetched questions in state
          setQuizGenerated(true); // Indicate that the quiz has been generated
          setCurrentQuestionIndex(0); // Start with the first question
        } else {
          throw new Error('Unexpected response structure');
        }
      } else {
        const errorText = await response.text();
        console.error('Failed to generate quiz:', errorText);
        setErrorMessage(`Failed to generate quiz: ${errorText}`);
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      setErrorMessage(`Error generating quiz: ${error.message}`);
    } finally {
      setLoading(false); // Set loading state to false after completion
    }
  };

  // Handles the submission of an answer by verifying it with the API
  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];

    try {
      // Send request to the server to verify the user's answer
      const response = await fetch(`${API_BASE_URL}/api/verify-answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentQuestion.question,
          userAnswer, 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Verification result:', data);

        // Update feedback based on verification result
        setFeedback(data.correct ? 'Correct!' : 'Incorrect.');
      } else {
        setFeedback('Failed to verify answer.');
      }

      // Move to the next question after showing feedback
      setTimeout(() => {
        setFeedback('');
        setUserAnswer('');
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          alert('Quiz completed!');
          setQuizGenerated(false); // Reset quiz
        }
      }, 3000); // Show feedback for 3 seconds
    } catch (error) {
      console.error('Error verifying answer:', error);
      setFeedback('Error verifying answer.');
    }
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>Generate Quiz Page</h1>
      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      
      {!quizGenerated ? (
        <>
          {loading ? (
            <div className="spinner" style={spinnerStyle}></div>
          ) : (
            <form onSubmit={handleGenerateQuiz}>
              <div>
                <label htmlFor="topic">Topic:</label>
                <select
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  style={inputStyle}
                >
                  <option value="golang">Golang</option>
                  <option value="aws">AWS</option>
                  <option value="javascript">JavaScript</option>
                  <option value="ci/cd">CI/CD</option>
                  <option value="home gardens">Home Gardens</option>
                  <option value="coffee">Coffee</option>
                  <option value="finger foods">Finger Foods</option>
                </select>
              </div>
              <div>
                <label htmlFor="expertise">Select Expertise Level:</label>
                <select
                  id="expertise"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  required
                  style={inputStyle}
                >
                  <option value="novice">Novice</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div>
                <label htmlFor="numberOfQuestions">Number of Questions:</label>
                <select
                  id="numberOfQuestions"
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                  required
                  style={inputStyle}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
              <div>
                <label htmlFor="style">Style of Questions:</label>
                <select
                  id="style"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  required
                  style={inputStyle}
                >
                  <option value="master oogway">Master Oogway</option>
                  <option value="1940's Gangster">1940's Gangster</option>
                  <option value="like an 8 year old">Like an 8 Year Old</option>
                  <option value="normal">Normal</option>
                  <option value="jedi">Jedi</option>
                  <option value="captain jack sparrow">Captain Jack Sparrow</option>
                  <option value="mathew mcconaughey">Mathew McConaughey</option>
                </select>
              </div>
              <button
                type="submit"
                style={buttonStyle}
              >
                Generate Quiz
              </button>
            </form>
          )}
        </>
      ) : (
        <form onSubmit={handleSubmitAnswer}>
          <div>
            <h2>{questions[currentQuestionIndex].question}</h2>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Submit Answer</button>
          </div>
          {feedback && <div style={{ marginTop: '10px', color: feedback === 'Correct!' ? 'green' : 'red' }}>{feedback}</div>}
        </form>
      )}
    </div>
  );
}

// Spinner CSS styling
const spinnerStyle = {
  display: 'block',
  margin: '40px auto',
  width: '50px',
  height: '50px',
  border: '8px solid #f3f3f3',
  borderTop: '8px solid #3498db',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

// Input style to simplify repeated styling code
const inputStyle = {
  display: 'block',
  width: '100%',
  margin: '10px 0',
  padding: '5px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
};

// Button styling
const buttonStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  backgroundColor: '#2196F3',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

// Keyframes for spinner animation
const styles = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Append styles to the document head
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

export default Generate;
