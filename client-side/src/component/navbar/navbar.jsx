import React from 'react'
import { Home } from '../../pages/home/home.jsx'
import { Users } from '../../pages/users/users.jsx'
import { Notify } from '../../pages/notify/notify.jsx'
import { Messages } from '../../pages/messages/messages.jsx'
import {  useNavigate } from 'react-router-dom';
import { RiHome2Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";

export const Navbar = () => {
  const navigate = useNavigate();
  const handleClick =()=>{
    navigate('/')
  }
  // const handleClickUsers =()=>{
  //   navigate('/users')
  // }

  return (
    <>
    <div className='flex items-center'>
      <div onClick={handleClick}><RiHome2Line/></div>
      <div ><Users/></div>
      <div><Notify/></div>
      <div><Messages/></div>
    </div>
    </>
  )
}
