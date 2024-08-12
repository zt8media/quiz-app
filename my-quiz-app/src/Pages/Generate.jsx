// src/pages/Generate.jsx
import React, { useState } from 'react';

function Generate() {
  const [topic, setTopic] = useState('golang');
  const [expertise, setExpertise] = useState('novice');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [style, setStyle] = useState('normal');

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();

    // Example data to be sent or processed
    const quizData = {
      topic,
      expertise,
      numberOfQuestions,
      style,
    };

    console.log('Generating quiz with data:', quizData);

    // Navigate to the quiz page with the generated data
    // For now, we just log the data. You might want to send this data to the backend.
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>Generate Quiz Page</h1>
      <form onSubmit={handleGenerateQuiz}>
        <div>
          <label htmlFor="topic">Topic:</label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            style={{
              display: 'block',
              width: '100%',
              margin: '10px 0',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              backgroundColor: '#fff',
            }}
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
            style={{
              display: 'block',
              width: '100%',
              margin: '10px 0',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              backgroundColor: '#fff',
            }}
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
            style={{
              display: 'block',
              width: '100%',
              margin: '10px 0',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              backgroundColor: '#fff',
            }}
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
            style={{
              display: 'block',
              width: '100%',
              margin: '10px 0',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              backgroundColor: '#fff',
            }}
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
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: '#2196F3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Generate Quiz
        </button>
      </form>
    </div>
  );
}

export default Generate;
