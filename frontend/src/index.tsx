import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { SettingsContextProvider } from './contexts/SettingsContext'
import { AddAlertCallbackProvider } from './contexts/AlertContext'
import { AuthContextProvider } from './contexts/AuthContext'
import { OpenInDialogContextProvider } from './contexts/DialogContext'
import { ApiContextProvider } from './contexts/ApiContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <SettingsContextProvider>
      <ApiContextProvider>
        <AuthContextProvider>
          <AddAlertCallbackProvider>
            <OpenInDialogContextProvider>
              <App />
            </OpenInDialogContextProvider>
          </AddAlertCallbackProvider>
        </AuthContextProvider>
      </ApiContextProvider>
    </SettingsContextProvider>
  </React.StrictMode>
)
