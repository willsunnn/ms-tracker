import './App.css'
import { AboutPage } from './components/about/AboutPage'
import { FloatingActionButton } from './components/fab/FloatingActionButton'
import NavBar from './components/navbar/NavBar'
import { SignInPage } from './components/SignInForm'
import { TaskViewPage } from './components/taskview/TaskViewPage'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

const App = () => {
  const { user } = useAuth()

  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={
        (
          <div className="bg-base-300 w-screen h-screen">
            <NavBar/>
            <div className="fixed bottom-5 right-5 z-[100]">
              <FloatingActionButton/>
            </div>
            <div className="w-screen min-h-screen h-full z-0 overflow-scroll py-2 px-5 max-w-screen">
              {/* This is where the content (SignInPage/TaskViewPage) will go */}
              <Outlet/>
            </div>
          </div>
        )}>

        {/* If the path is SignIn, render the SignInPage */}
        <Route path="signin" element={(
          <SignInPage/>
        )}/>

        {/* If the path is About, render the SignInPage */}
        <Route path="about" element={(
          <AboutPage/>
        )}/>

        {/* Else, let's render the TaskViewPage */}
        <Route path="*" element={(
          <TaskViewPage/>
        )}/>

        {/* If there was no path and the user is signed in, redirect to TaskViewPage
          If there was no path and the user is not signed in, redirect to About page
          We check if undefined here because the page loads in with undefined first.
          We dont want to redirect while we're still determining auth status */}
        <Route path="" element={
          (user === undefined) ? (<></>) : (user) ? (<Navigate to='/characters'/>) : (<Navigate to='/about'/>)
        }/>
      </Route>
    </Routes>
  </BrowserRouter>)
}

export default App
