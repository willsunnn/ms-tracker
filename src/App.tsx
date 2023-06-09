import './App.css';
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
        <h1 className="text-3xl font-bold underline text-red-600">
          {`userId=${(user!=null)? user.uid : 'null'}`}
        </h1>
      )}
    </>
  );  
}

export default App;
