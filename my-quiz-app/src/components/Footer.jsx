import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = styled.footer`
  background-color: #1e90ff;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 15%;

  @media (max-width: 768px) {
    align-items: center;
    margin-top: 20px;
    margin-right: 0; /* Centering the links */
  }
`;

const FooterTitle = styled.h3`
  margin-bottom: 10px;
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 5px 0;

  &:hover {
    text-decoration: underline;
  }
`;

const ParagraphContainer = styled.div`
  max-width: 50%; /* Increased width to avoid jumbled text */
  margin-left: 5%;
  font-size: 1.3em;

  @media (max-width: 768px) {
    max-width: 80%; /* Further increased width for mobile */
    margin-left: 0; /* Centering the paragraph */
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ParagraphContainer>
        <p>
          Embrace the power of our app and unlock the secrets of the universe,
          one quiz at a time. As I always say, "Yesterday is history, tomorrow
          is a mystery, but today is a gift. That is why it is called the
          present."
        </p>
      </ParagraphContainer>
      <LinksContainer>
        <FooterTitle>Links</FooterTitle>
        <FooterLink to="/">Home</FooterLink>
        <FooterLink to="/account">Account</FooterLink>
        <FooterLink to="/quiz-generator">Quiz Generator</FooterLink>
      </LinksContainer>
    </FooterContainer>
  );
};

export default Footer;
