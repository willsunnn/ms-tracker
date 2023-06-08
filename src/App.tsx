import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import * as Auth from 'firebase/auth';
import { Persistence } from './persistence/firebase';
import { AddAlertCallbackProvider } from './contexts/AlertContext';
import SignInFormComponent from './components/SignInForm';
import { useToggleTheme } from './contexts/ThemeContext';

const App = () => {

  // Handle user change
  const [user, setUser] = React.useState<Auth.User|null>(null);
  useEffect(() => {
    Persistence.onUserChange(setUser)
  }, []);

  const toggleTheme = useToggleTheme();
  const onClick = () => {
    console.log('clicked')
    console.log(toggleTheme);
    toggleTheme();
  }

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
