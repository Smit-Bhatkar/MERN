// frontend/src/index.js (Add AuthProvider)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the App with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);