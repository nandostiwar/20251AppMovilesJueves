import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Asegúrate de importar AuthProvider
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Ahora App tiene acceso al contexto */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
