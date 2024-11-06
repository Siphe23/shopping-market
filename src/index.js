// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import './index.css';
import App from './App'; // Import your App component
import store from './Redux/store'; // Import the store
import { Provider } from 'react-redux'; // Import Provider from react-redux

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <Provider store={store}> {/* Wrap your App in Provider */}
    <App />
  </Provider>
);
