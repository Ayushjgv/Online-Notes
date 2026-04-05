import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { FirebaseProvider } from './context/Firebase.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </StrictMode>
  </BrowserRouter>
  ,
)
