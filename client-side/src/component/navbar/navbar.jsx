import React from 'react'
import { Home } from '../../pages/home/home.jsx'
import { Users } from '../../pages/users/users.jsx'
import { Notify } from '../../pages/notify/notify.jsx'
import { Messages } from '../../pages/messages/messages.jsx'
import {  useNavigate } from 'react-router-dom';
import { RiHome2Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../../state/index.jsx'
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";

export const Navbar = ({ setHomePage, setUsersPage, setMessagePage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useSelector((state)=>state.userSlice.page)

  const handleClickHome = () => {
    setHomePage(true);
    setUsersPage(false);
    setMessagePage(false);
  };

  const handleClickUsers = () => {
    setHomePage(false);
    setUsersPage(true);
    setMessagePage(false);
  };

  const handleClickMessages = () => {
    // setHomePage(false);
    // setUsersPage(false);
    setMessagePage(true);
  };

  return (
    <>
    <div className='flex justify-around w-[100%]'>
      <div onClick={handleClickHome}><RiHome2Line /></div>
      <div onClick={handleClickUsers}><FaUsers /></div>
      <div onClick={handleClickMessages}><MdOutlineNotificationsActive/></div>
      <div onClick={handleClickMessages}><AiOutlineMessage/></div>
    </div>

    </>
  )
}
