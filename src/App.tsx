import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import * as Auth from 'firebase/auth';
import { Persistence } from './persistence/firebase';
import SignInFormComponent from './components/SignInForm';

const App = () => {

  // Handle user change
  const [user, setUser] = React.useState<Auth.User|null>(null);
  useEffect(() => {
    Persistence.onUserChange(setUser)
  }, []);

  return (
    <>
      <NavBar user={user}/>
      { !user && 
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <SignInFormComponent/>
        </div> }
      { user && (
        <h1 className="text-3xl font-bold underline text-red-600">
          {`userId=${(user!=null)? user.uid : 'null'}`}
        </h1>
      )}
    </>
  );  
}

export default App;
