// frontend/src/index.js (Add Redux Provider)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'; 

// NEW: Redux Imports
import { Provider } from 'react-redux';
import store from './app/store'; // Import store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap with Redux Provider */}
    <Provider store={store}> 
        <AuthProvider> 
            <App />
        </AuthProvider>
    </Provider>
  </React.StrictMode>
);