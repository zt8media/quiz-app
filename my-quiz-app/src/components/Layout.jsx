import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the wrapper takes full height of the viewport */
`;

const ContentWrapper = styled.div`
  flex: 1; /* Take up remaining space */
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navbar />
      <ContentWrapper>
        {children}
      </ContentWrapper>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
