import './App.css';
import HomePageComponent from './components/HomePageComponent';
import NavBar from './components/NavBar';
import SignInFormComponent from './components/SignInForm';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <NavBar user={user}/>
      { !user && 
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <SignInFormComponent/>
        </div> }
      { user && (
        <HomePageComponent user={user}/>
      )}
    </>
  );  
}

export default App;
