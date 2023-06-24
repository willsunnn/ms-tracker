import './App.css';
import NavBar from './components/navbar/NavBar';
import SignInFormComponent from './components/SignInForm';
import { TaskViewPage } from './components/taskview/TaskViewPage';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="z-40">
        <NavBar/>
      </div>
      <div className="z-0">
        { !user && 
          <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <SignInFormComponent/>
          </div> }
        { user && (
          <TaskViewPage user={user}/>
        )}
      </div>
    </>
  );  
}

export default App;
