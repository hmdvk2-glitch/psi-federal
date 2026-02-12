
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeBankData } from './storage/authStorage';
import "./index.css";
import "./src/lib/storageEngine";

// Seed data at startup so demo users always exist for classroom testing.
initializeBankData();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
