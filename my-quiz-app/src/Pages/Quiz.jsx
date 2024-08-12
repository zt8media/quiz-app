// src/pages/Quiz.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const questions = location.state?.questions || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmitAnswer = (event) => {
    event.preventDefault();
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);

    // Move to next question if there is one
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    } else {
      // All questions answered
      const correctAnswers = questions.filter(
        (q, i) => q.answer === newAnswers[i]
      ).length;
      navigate('/results', { state: { correctAnswers, totalQuestions: questions.length } }); // Use navigate instead of history.push
    }
  };

  if (questions.length === 0) {
    return <div>No questions available. Please generate a quiz first.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Quiz Page</h1>
        <form onSubmit={handleSubmitAnswer}>
          <h2>{currentQuestion.question}</h2>
          {currentQuestion.options.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  required
                />
                {option}
              </label>
            </div>
          ))}
          <button type="submit">Submit Answer</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Quiz;
