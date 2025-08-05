import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router'
import './App.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />  {/* ✅ Use RouterProvider */}
  </StrictMode>,
)
