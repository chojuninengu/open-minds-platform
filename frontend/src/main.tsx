import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Apply Tailwind's base styles and custom styles
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 