import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initializeBankData } from './storage/authStorage'

// 🏦 Start the bank! Seed database on every launch
// Real banks: This runs once during deployment
// Our sim: Runs every refresh (safe because we check for existing data)
initializeBankData();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
