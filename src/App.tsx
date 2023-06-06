import React from 'react';
import './App.css';
import { themeChange } from 'theme-change'
import NavBar from './components/NavBar';
import SettingsSheet from './components/SettingsSheet';
import * as Auth from 'firebase/auth';
import { Persistence } from './persistence/firebase';
import { Alert, AlertCallback, AlertList } from './components/AlertComponent';

const App = () => {
  // Handle theme change
  React.useEffect(() => {
    themeChange(false)
  }, []);

  // Handle user change
  const [user, setUser] = React.useState<Auth.User|null>(null);
  Persistence.onUserChange(setUser);

  // Create Alert Callback
  const [alerts, setAlerts] = React.useState<Alert[]>([]);
  const addAlerts: AlertCallback = (alert) => {
    setAlerts([...alerts, alert]);
  }

  return (
    <div>
      <NavBar user={user} alertCallback={addAlerts}/>
      <h1 className="text-3xl font-bold underline text-red-600">
        {`userId=${(user!=null)? user.uid : 'null'}`}
      </h1>
      <SettingsSheet/>
      <AlertList alerts={alerts}/>
    </div>
  );  
}

export default App;
