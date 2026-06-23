import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminPanel from './components/AdminPanel.tsx'

const isRouteAdmin = window.location.pathname === '/admin'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isRouteAdmin ? <AdminPanel /> : <App />}
  </StrictMode>,
)
