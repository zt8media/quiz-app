import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import Home from '../Home'; 

describe('Home Component', () => {
  // Test 1: Check if the logo renders
  test('renders the logo', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check if the logo image is present
    const logo = screen.getByAltText('Logo');

    //Check if the logo is defined 
    expect(logo).toBeDefined();
  });

  // Test 2: Check if the Begin Journey button renders
  test('renders the Begin Journey button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check if the Begin Journey button is present
    const button = screen.getByText('Begin Journey');

    // Check if the button is defined
    expect(button).toBeDefined();
  });

  // Test 3: Check if the Personalized Quizzes section renders
  test('renders the personalized quizzes section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check if the Personalized Quizzes heading is present
    const quizHeading = screen.getByText('Personalized Quizzes');

    // Check if the heading is defined
    expect(quizHeading).toBeDefined();
  });

  // Test 4: Check if the Begin Journey button links to the correct route
  test('Begin Journey button links to the correct route', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check if the Begin Journey button has the correct href attribute
    const button = screen.getByRole('link', { name: /Begin Journey/i });

    // Check if the button's href attribute is '/generate'
    expect(button.getAttribute('href')).toBe('/generate');
  });
});
