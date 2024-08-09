// src/pages/Generate.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Generate() {
  return (
    <>
      <Navbar />
      <div>
        <h1>Generate Quiz Page</h1>
        <p>Users should be able to create quizzes
User should be able to select a Topic, Expertise, Number of questions, Style of questions for a quiz
Quizzes should have a title, description, and a list of questions.
</p>
      </div>
      <Footer />
    </>
  );
}

export default Generate;
