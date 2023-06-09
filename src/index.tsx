import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { AddAlertCallbackProvider } from './contexts/AlertContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AddAlertCallbackProvider>
        <App />
      </AddAlertCallbackProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
