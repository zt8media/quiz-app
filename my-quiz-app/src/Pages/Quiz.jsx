// src/pages/Quiz.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Quiz() {
  return (
    <>
      <Navbar />
      <div>
        <h1>Quiz Page</h1>
        <p>Users should be presented with one question at a time and be able to select an answer.
Users should be able to submit their answers 
</p>
      </div>
      <Footer />
    </>
  );
}

export default Quiz;
