import React from 'react';
import './App.css';
import { themeChange } from 'theme-change'
import NavBar from './components/NavBar';
import * as Auth from 'firebase/auth';
import { Persistence } from './persistence/firebase';
import { Alert, AlertCallback, AlertList } from './components/AlertComponent';
import { AddAlertCallbackProvider } from './contexts/AlertContext';
import SignInFormComponent from './components/SignInFormComponent';

const App = () => {
  // Handle theme change
  React.useEffect(() => {
    themeChange(false)
  }, []);

  // Handle user change
  const [user, setUser] = React.useState<Auth.User|null>(null);
  Persistence.onUserChange(setUser);

  return (
    <AddAlertCallbackProvider>
      <NavBar user={user}/>
      { !user && <div className="flex items-center justify-center h-[calc(100vh-64px)]"><SignInFormComponent/></div> }
      { user && (
        <h1 className="text-3xl font-bold underline text-red-600">
          {`userId=${(user!=null)? user.uid : 'null'}`}
        </h1>
      )}
    </AddAlertCallbackProvider>
  );  
}

export default App;
