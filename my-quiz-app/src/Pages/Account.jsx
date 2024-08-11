import React from 'react';

import styled from 'styled-components';

const MiddleContainer = styled.section`
  display: flex;
  flex-direction: row;
  margin: 15px;
  padding: 20px;
  justify-content: center;
  gap: 20%;

  @media (max-width: 768px) { /* Adjust the max-width value as needed */
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const MiddleContent = styled.div`
  font-size: 30px;
  color: rgb(0, 150, 136);
  font-weight: bold;
  margin-left: 2%;


  @media (max-width: 768px) {
    margin-left: 0;
    text-align: center;
  }
`;

const Icon = styled.span`
  color: #1DE9B6;
  font-size: 75px; /* Adjust the size as needed */
  display: block;

  @media (max-width: 768px) {
    font-size: 50px; /* Adjust the icon size for mobile if needed */
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Paragraph = styled.p`
  line-height: 1.2; /* Adjust the line height as needed */
  margin: 5px 0; /* Optional: adjust the margin if needed */
`;

function Account() {
  return (
    <>
    
      <div>
        <MiddleContent>
          <h1>Account</h1>
        </MiddleContent>
        <MiddleContainer>
          <Section>
            <Icon className="material-icons-outlined">whatshot</Icon>
            <h2>Streaks</h2>
            <Paragraph>You have a 5 day streak!</Paragraph>
          </Section>
          <Section>
            <Icon className="material-icons">list</Icon>
            <h2>Platinum Quizzes</h2>
            <Paragraph>golang - intermediate</Paragraph>
            <Paragraph>JavaScript - beginner</Paragraph>
            <Paragraph>AWS - beginner</Paragraph>
          </Section>
          <Section>
            <Icon className="material-icons">person</Icon>
            <h2>lrnr Level:2</h2>
            <Paragraph>150/200 xp</Paragraph>
          </Section>
        </MiddleContainer>
      </div>
    
    </>
  );
}

export default Account;
