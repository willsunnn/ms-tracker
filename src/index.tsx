import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { AddAlertCallbackProvider } from './contexts/AlertContext';
import { AuthContextProvider } from './contexts/AuthContext';
import { OpenInDialogContextProvider } from './contexts/DialogContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <AddAlertCallbackProvider>
          <OpenInDialogContextProvider>
            <App />
          </OpenInDialogContextProvider>
        </AddAlertCallbackProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
