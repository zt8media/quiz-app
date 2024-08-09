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
        <p>Manage your account details here.</p>
      </div>
      <Footer />
    </>
  );
}

export default Account;
