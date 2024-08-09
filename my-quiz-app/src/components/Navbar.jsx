// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

// Styled component for the navbar
const StyledNavbar = styled.nav`
  background-color: #2196F3 !important; /* Blue color */
  padding: 0 1rem; /* Padding for spacing */
  .nav-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px; /* Adjust height as needed */
  }
  .brand-logo {
    margin-left: 0; /* Align the logo to the left */
  }
  .sidenav {
    background-color: #2196F3; /* Match navbar color */
    height: 100%;
  }
  .sidenav-trigger {
    display: none; /* Hide the sidenav trigger by default */
    cursor: pointer;
  }
  .fa {
    font-size: 24px; /* Icon size */
  }
  @media (max-width: 992px) {
    .sidenav-trigger {
      display: flex;
      align-items: center;
      position: absolute;
      right: 1rem; /* Align to the right */
    }
    .navbar-links {
      display: none; /* Hide NavbarLinks in mobile view */
    }
    .fa {
      font-size: 36px; /* Larger icon on mobile */
    }
  }
`;

// Styled component for the sidenav
const Sidenav = styled.ul`
  background-color: #2196F3; /* Match navbar color */
`;

// Styled component for the navbar links
const NavbarLinks = styled.ul`
  display: flex;
  align-items: center;
  .nav-item {
    margin-left: 20px; /* Spacing between links */
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }, []);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
    const instance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
    if (instance) {
      if (isOpen) {
        instance.close();
      } else {
        instance.open();
      }
    }
  };

  return (
    <StyledNavbar className="nav-wrapper">
      <a href="/" className="brand-logo">lrnr</a>
      <a
        href="#!"
        onClick={handleMenuClick}
        className="sidenav-trigger"
      >
        <i className={`fa ${isOpen ? 'fa-times' : 'fa-bars'}`} />
      </a>
      <NavbarLinks className="navbar-links right hide-on-med-and-down">
        <li className="nav-item"><a href="/quiz">Quiz</a></li>
        <li className="nav-item"><a href="/results">Results</a></li>
        <li className="nav-item"><a href="/account">Account</a></li>
        <li className="nav-item"><a href="/generate">Generate Quiz</a></li>
      </NavbarLinks>
      <Sidenav className="sidenav" id="mobile-demo">
        <li><a href="/quiz">Quiz</a></li>
        <li><a href="/results">Results</a></li>
        <li><a href="/account">Account</a></li>
        <li><a href="/generate">Generate Quiz</a></li>
      </Sidenav>
    </StyledNavbar>
  );
};

export default Navbar;
