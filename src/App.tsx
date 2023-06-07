import React from 'react';
import './App.css';
import { themeChange } from 'theme-change'
import NavBar from './components/NavBar';
import SettingsComponent from './components/SettingsComponent';
import * as Auth from 'firebase/auth';
import { Persistence } from './persistence/firebase';
import { Alert, AlertCallback, AlertList } from './components/AlertComponent';
import { AddAlertCallbackProvider } from './contexts/AlertContext';

const App = () => {
  // Handle theme change
  React.useEffect(() => {
    themeChange(false)
  }, []);

  // Handle user change
  const [user, setUser] = React.useState<Auth.User|null>(null);
  Persistence.onUserChange(setUser);

  const addAlerts: AlertCallback = (alert)=>{};

  return (
    <AddAlertCallbackProvider>
      <NavBar user={user}/>
      <h1 className="text-3xl font-bold underline text-red-600">
        {`userId=${(user!=null)? user.uid : 'null'}`}
      </h1>
      <SettingsComponent/>
    </AddAlertCallbackProvider>
  );  
}

export default App;
