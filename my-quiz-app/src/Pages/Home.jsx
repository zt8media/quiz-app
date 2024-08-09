// Example: src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Navbar />
      <div>
        <h1>Home Page</h1>
        <p>Welcome to the Quiz App!</p>
      </div>
      <Footer />
    </>
  );
}

export default Home;
