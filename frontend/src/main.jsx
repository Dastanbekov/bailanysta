import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/main.css'
import './styles/auth.css'
import './styles/profile.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
