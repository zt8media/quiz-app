import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Quiz from './Pages/Quiz';
import Results from './Pages/Results';
import Account from './Pages/Account';
import Generate from './Pages/Generate';
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
