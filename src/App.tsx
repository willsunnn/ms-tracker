import React from 'react';
import './App.css';
import { themeChange } from 'theme-change'
import NavBar from './components/NavBar';
import SettingsSheet from './components/SettingsSheet';
import * as Auth from 'firebase/auth';
import { Persistence } from './persistence/firebase';

function App() {
  // Handle theme change
  React.useEffect(() => {
    themeChange(false)
  }, []);

  // Handle user change
  const [user, setUser] = React.useState<Auth.User|null>(null);
  Persistence.onUserChange(setUser);

  return (
    <div>
      <NavBar user={user}/>
      <h1 className="text-3xl font-bold underline text-red-600">
        {`userId=${(user!=null)? user.uid : 'null'}`}
      </h1>
      <SettingsSheet/>
    </div>
  );  
}

export default App;
