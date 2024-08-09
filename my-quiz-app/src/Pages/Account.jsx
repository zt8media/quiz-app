// src/pages/Account.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Account() {
  return (
    <>
      <Navbar />
      <div>
        <h1>Account Page</h1>
        <p>Should be a static recreation of the current Account Page
You do not need to track any quiz stats or account information
</p>
      </div>
      <Footer />
    </>
  );
}

export default Account;
