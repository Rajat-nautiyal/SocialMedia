import React,{useEffect}from 'react'
import { useMediaQuery } from '@react-hook/media-query';
import {Profile} from '../../component/profile.jsx';
import {Posts} from '../../component/posts/posts.jsx'
import {Friends} from '../../component/friends.jsx'
import {Navbar} from '../../component/navbar/navbar.jsx'
import {ChatUsers} from '../messages/messages.jsx'
import {Notify} from '../notify/notify.jsx'
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { socketHook } from '../../hooks/socketHook.jsx';
import {setOnlineUsers,setFriends} from '../../state/index.jsx';
import {NotifyHook} from '../../hooks/notifyHook.jsx';
import { LastMessageHook } from '../../hooks/getLastMessage.jsx';

export const Home = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const userId = useSelector((state)=>state.userSlice.user._id)
  const lastMessage = LastMessageHook();
  const mode = useSelector((state)=>state.userSlice.mode);
  const messagePageBool = useSelector((state)=>state.userSlice.messagePageBool);
  const notifyPageBool = useSelector((state)=>state.userSlice.notifyPageBool);
  const profileUser = useSelector((state)=>state.userSlice.profileUser);
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
  },[]);

  useEffect(()=>{
    if(profileUser===null) return;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;      // Scrolls  <body> element
    const mainPageElement = document.getElementById('mainPage');
    if (mainPageElement) {
      mainPageElement.scrollTop = 0;
    }

  },[profileUser]);

  useEffect(()=>{
    lastMessage()
    getNotify()        
    const fetchProfileUser = async () => {
      if (profileUser === null) {
        try {
          const response = await fetch(`http://192.168.0.130:6001/users/${userId}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
            credentials: 'include', // Include cookies with the request
          });
          if (response.ok) {
            const data = await response.json();
            dispatch(setFriends({ friends: data.friendsData }));
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (e) {
          console.error('Error:', e);
        }
      }
    };
  
    fetchProfileUser();

    },[])

  return (
    <>
    {!isMobile?(<>
        <Navbar/>
      <div className='mainPage' id={mode?'darkMainPage':'mainPage'}>
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
      <div>
        <Navbar/>
        <div className='mainPage' id={mode?'darkMainPage':''}>
          {profileUser?
            <>
              <Profile/>
              <Friends/>
            </>
            :null}
          <Posts />
        {messagePageBool?<div className='w-[30%] h-[90%] max-md:min-h-[100vh] overflow-hidden left-[66%] absolute 
           shadow-lg bg-white max-md:w-full max-md:left-0
           max-md:top-0 max-md:z-10'>
            <ChatUsers className='w-[100%]' />
          </div>:null}
        {notifyPageBool?
        <div className='w-[30%] h-[90%] left-[66%] absolute 
          rounded-xl shadow-lg bg-purple-300 max-md:w-full max-md:left-0
          max-md:h-screen max-md:top-0 max-md:z-10'>
          <Notify className='w-[100%]' />
        </div>:null}   
        </div>
      </div>
    )
    } 
    </>
  )
}
