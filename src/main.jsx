import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LeMarinaLanding from './le_marina_bay_landing.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LeMarinaLanding />
  </StrictMode>
)
