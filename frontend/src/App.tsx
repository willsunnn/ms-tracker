import './App.css'
import { FloatingActionButton } from './components/fab/FloatingActionButton'
import NavBar from './components/navbar/NavBar'
import { SignInPage } from './components/SignInForm'
import { TaskViewPage } from './components/taskview/TaskViewPage'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'

const App = () => {
  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={
        (
          <div className="bg-base-300 w-screen h-screen">
            <div className="top-bar w-full fixed p-2 z-[100]">
              <NavBar/>
            </div>
            <div className="fixed bottom-5 right-5 z-[100]">
              <FloatingActionButton/>
            </div>
            <div className="w-screen min-h-screen h-full z-0 overflow-scroll py-20 px-5 max-w-screen ma ">
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

        {/* If there was no path redirect to TaskViewPage */}
        <Route path="" element={(
          <Navigate to="characters"/>
        )}/>
      </Route>
    </Routes>
  </BrowserRouter>)
}

export default App
