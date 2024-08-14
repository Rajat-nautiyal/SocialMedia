import React,{useState, useEffect}from 'react'
import { useMediaQuery } from '@react-hook/media-query';
import {Search} from '../../component/search.jsx';
import {Profile} from '../../component/profile.jsx';
import {Posts} from '../../component/posts/posts.jsx'
import {Friends} from '../../component/friends.jsx'
import {Navbar} from '../../component/navbar/navbar.jsx'
import {ChatUsers} from '../messages/messages.jsx'
import {Notify} from '../notify/notify.jsx'
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { socketHook } from '../../hooks/socketHook.jsx';
import {setOnlineUsers} from '../../state/index.jsx';
import {NotifyHook} from '../../hooks/notifyHook.jsx';

export const Home = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  // const userId = useSelector((state)=>state.userSlice.user._id);
  const mode = useSelector((state)=>state.userSlice.mode)
  const messagePageBool = useSelector((state)=>state.userSlice.messagePageBool);
  const notifyPageBool = useSelector((state)=>state.userSlice.notifyPageBool);
  const dispatch = useDispatch();
  const socket = socketHook();
  const getNotify = NotifyHook();

  useEffect(()=>{
    socket.on('onlineUsers',(onlineUsers)=>{
      dispatch(setOnlineUsers(onlineUsers))
    })
    return ()=>{
      socket.disconnect()
    }
  },[])
  useEffect(()=>{
    getNotify()
  },[])

  return (
    <>
    {!isMobile?(<>
        <Navbar/>
      <div className='mainPage' id={mode?'darkMainPage':''}>
        <Profile className='w-[30%]'/>
          <Posts className='w-[40%]'/>
        <Friends className='w-[30%]'/>
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
      </> ):(
      <>
        <div>
          <div>
            <div>SocialEra</div>
            <div><Search/></div>
          </div>
          <div><Navbar/></div>
        </div>
        <div>
          <div>darkmode</div>
          <div>logout</div>
        </div>
        <Profile/>
        <Posts/>
        <Friends/>:<ChatUsers/>
        </>)
    } 
    </>
  )
}
