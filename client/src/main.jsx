import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: { borderRadius: '14px', background: '#12302A', color: '#fff', fontSize: '14px' },
          success: { iconTheme: { primary: '#E8A317', secondary: '#12302A' } },
        }}
      />
    </AuthProvider>
  </React.StrictMode>
)
