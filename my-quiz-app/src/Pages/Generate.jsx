import React, { useState } from 'react';

function Generate() {
  const [topic, setTopic] = useState('golang'); 
  const [expertise, setExpertise] = useState('novice'); 
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [style, setStyle] = useState('normal'); //Defaulting the quiz answer choices ^^^
  const [quizGenerated, setQuizGenerated] = useState(false); //Tracks wether quiz generated
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);//Tracks index of first question
  const [userAnswer, setUserAnswer] = useState(''); 
  const [feedback, setFeedback] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    setLoading(true); //Set loading state to true when fetching data
    setErrorMessage('');

//Object with selected quiz options
    const quizData = {
      topic,
      expertise,
      numberOfQuestions,
      style,
    };

    try {
      //Sending POST request to backend API for quiz
      const response = await fetch('http://localhost:8080/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Received response from Claude API:', data);
        //Verifies that response contains valid questions array 
        if (data && Array.isArray(data.questions) && data.questions.length > 0) {
          // Map the questions to array of objects and store them in state
          const questionsArray = data.questions.map((question) => ({
            question: question,
          }));

          setQuestions(questionsArray);// Set fetched questions in state
          setQuizGenerated(true);
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
      //Handles any errors during the fetch or processing of response
      console.error('Error generating quiz:', error);
      setErrorMessage(`Error generating quiz: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];
  
    try {
      // Send request to the server to verify the user's answer
      const response = await fetch('http://localhost:8080/api/verify-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentQuestion.question,
          userAnswer, // Answer provided by user
          correctAnswer: currentQuestion.correctAnswer, // Correct answer for current question
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

// Button 
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

