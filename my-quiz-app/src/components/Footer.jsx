// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #2196F3; /* Blue color */
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="container">
        <h5>Quiz App</h5>
        <p>Thank you for using our quiz app. We hope you enjoyed it!</p>
        <div>
          <a href="/" className="white-text">Home</a> | 
          <a href="/quiz" className="white-text"> Quiz</a> | 
          <a href="/results" className="white-text"> Results</a> | 
          <a href="/account" className="white-text"> Account</a> | 
          <a href="/generate" className="white-text"> Generate Quiz</a>
        </div>
        <div className="footer-copyright">
          © 2024 Quiz App
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
