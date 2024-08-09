// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'materialize-css/dist/css/materialize.min.css'; // Import Materialize CSS
import 'materialize-css/dist/js/materialize.min.js'; // Import Materialize JS
import '@fortawesome/fontawesome-free/css/all.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
