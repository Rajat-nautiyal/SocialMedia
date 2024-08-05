import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {Register} from './pages/register.jsx'
import {Login} from './pages/login/login.jsx'
import {Users} from './pages/users/users.jsx'
import {Home} from './pages/home/home.jsx'
import { Profile } from './component/profile.jsx';
import {useSelector} from 'react-redux'

function App(){
  const isAuth = Boolean(useSelector((state) => state.userSlice.token));
  // const isAuth = true
  // console.log(isAuth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Login />} />
          <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={<Register/>} />
          <Route path="/users" element={isAuth ? <Users /> : <Login />} />
          <Route path="/profile/:id" element={isAuth ? <Profile /> : <Login />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;
