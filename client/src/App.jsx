import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import { ToastContainer } from 'react-toastify';
import ResetEmail from './pages/ResetEmail';
import PasswordOtp from './pages/PasswordOtp';
import NewPassword from './pages/NewPassword';
import Notes from './pages/Notes';


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-email' element={<ResetEmail />} />
        <Route path='/password-otp' element={<PasswordOtp />} />
        <Route path='/new-password' element={<NewPassword />} />
        <Route path='/notes' element={<Notes />} />
        
      </Routes>
    </div>
  )
}

export default App
