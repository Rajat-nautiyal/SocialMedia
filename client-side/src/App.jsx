import React,{useEffect,useState} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {Register} from './pages/register.jsx'
import {Login} from './pages/login/login.jsx'
import {Users} from './pages/users/users.jsx'
import {Home} from './pages/home/home.jsx'
import {useDispatch,useSelector} from 'react-redux'
import { setLogin } from './state/index.jsx';

function App(){
  const user = useSelector(state=>state.userSlice.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('https://server-side-delta.vercel.app/auth/verify', {
          method: 'GET',
          credentials: 'include' // Include cookies in the request
        });
          const res = await response.json();
          if(res._id){
            dispatch(setLogin(res)); 
          }else {            
            console.log('error')
          }

      } catch (err) {
        console.error(err);
      }
    };

    checkAuth();
  }, []);  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={<Register/>} />
          <Route path="/users" element={user ? <Users /> : <Login />} />
          <Route path="/profile/:id" element={user ? <Home/> : <Login />} />
          <Route path="/post/:id" element={user ? <Home/> : <Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;
