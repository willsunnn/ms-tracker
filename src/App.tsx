import './App.css';
import NavBar from './components/navbar/NavBar';
import SignInFormComponent from './components/SignInForm';
import { TaskViewPage } from './components/taskview/TaskViewPage';
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
        <TaskViewPage user={user}/>
      )}
    </>
  );  
}

export default App;
