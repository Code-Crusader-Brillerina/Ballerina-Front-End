// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { RouterProvider } from 'react-router-dom'
// import router from './router/Router'
// import './App.css'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={router} />  {/* ✅ Use RouterProvider */}
//   </StrictMode>,
// )


import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
 // Assuming your router file is here
import './index.css';
import './App.css'

// Import the AuthProvider
import { AuthProvider } from './context/AuthContext';
import router from './router/Router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)