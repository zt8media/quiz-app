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
        <p>Should be a static recreation of the current Home Page
</p>
      </div>
      <Footer />
    </>
  );
}

export default Home;
