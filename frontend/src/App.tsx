import './App.css'
import NavBar from './components/navbar/NavBar'
import { SignInPage } from './components/SignInForm'
import { TaskViewPage } from './components/taskview/TaskViewPage'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

const App = () => {
  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={
        (
          <div className="bg-base-300 w-full h-full min-h-screen">
            <div className="top-bar w-full fixed p-2 z-[100]">
              <NavBar/>
            </div>
            <div className="z-0">
              {/* This is where the content (SignInPage/TaskViewPage) will go */}
              <Outlet/>
            </div>
          </div>
        )}>

        {/* If the path is SignIn, render the SignInPage */}
        <Route path="signin" element={(
          <SignInPage/>
        )}/>

        {/* Else, let's render the TaskViewPage */}
        <Route path="*" element={(
          <TaskViewPage/>
        )}/>
      </Route>
    </Routes>
  </BrowserRouter>)
}

export default App
