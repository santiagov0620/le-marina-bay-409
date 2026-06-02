import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/playfair-display/700.css'
import LeMarinaLanding from './le_marina_bay_landing.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LeMarinaLanding />
  </StrictMode>
)
