import React,{useState}from 'react'
import  {UsersFunc} from '../../component/users.jsx'
import { useMediaQuery } from '@react-hook/media-query';
import {Navbar} from '../../component/navbar/navbar.jsx'
import {Profile} from '../../component/profile.jsx'
import {Friends} from '../../component/friends.jsx'
import {ChatUsers} from '../messages/messages.jsx'
import {Notify} from '../notify/notify.jsx'
import { useDispatch, useSelector } from 'react-redux';

export const Users = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const messagePageBool = useSelector((state)=>state.userSlice.messagePageBool);
    const notifyPageBool = useSelector((state)=>state.userSlice.notifyPageBool);
    const mode = useSelector((state)=>state.userSlice.mode)

  return (
    <>
      {!isMobile?
      <>
      <Navbar/>
      <div className='mainPage' id={mode?'darkMainPage':''}>
        <div className='w-[30%]'><Profile /></div>
        <div className='w-[70%] '><UsersFunc /></div>
       
        {messagePageBool?
        <div className='w-[30%] h-[90%] left-[66%] absolute 
          rounded-xl shadow-lg bg-purple-300'>
          <ChatUsers className='w-[100%]' />
        </div>:null}
        {notifyPageBool?
        <div className='w-[30%] h-[90%] left-[66%] absolute 
          rounded-xl shadow-lg bg-purple-300'>
          <Notify className='w-[100%]' />
        </div>:null}
      </div>
      </>
      :
      <div>
        <Navbar/>
        <div className='mainPage' id={mode?'darkMainPage':''}>
        <div className='w-full '><UsersFunc /></div>
       
        {messagePageBool?
        <div className='w-[30%] h-[90%] max-md:min-h-screen left-[66%] absolute 
        rounded-xl shadow-lg bg-white max-md:w-full max-md:left-0
         max-md:top-0 max-md:z-10'>
          <ChatUsers className='w-[100%]' />
        </div>:null}
        {notifyPageBool?
        <div className='w-[30%] h-[90%] left-[66%] absolute 
          rounded-xl shadow-lg bg-white max-md:w-full max-md:left-0
          max-md:h-screen max-md:top-0 max-md:z-10'>
          <Notify className='w-[100%]' />
        </div>:null}
      </div>
        
      </div>}
    
    </>  
    )
}
