import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Account from './pages/Account';
import Generate from './pages/Generate';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/account" element={<Account />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
