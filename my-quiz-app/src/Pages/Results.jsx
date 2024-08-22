import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h1`
  color: #009688;
  font-size: 5rem;
  margin-bottom: 20px;
`;

const ResultsText = styled.p`
  font-size: 1.5rem;
  color: black;
  margin: 10px 0;
`;

const Highlight = styled.span`
  background-color: lightgrey;
  color: black;
  padding: 0 5px;
  border-radius: 3px;
`;

const TryAgainButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: white;
  background-color: #009688;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
  &:hover {
    background-color: #00796b; /* Slightly darker shade for hover effect */
  }
`;

const Results = () => {
  return (
    <ResultsContainer>
      <Title>lrnr</Title>
      <ResultsText>Questions Right: <Highlight>0111</Highlight></ResultsText>
      <TryAgainButton to="/quiz">Try Another Quiz</TryAgainButton>
    </ResultsContainer>
  );
};

export default Results;