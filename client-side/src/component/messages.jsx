import React, { useEffect, useState } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { socketHook } from '../hooks/socketHook.jsx';
import { MdOnlinePrediction } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { setSocketLastMessage } from '../state/index.jsx';
import {FormatTime} from "../utils/formatDate.js"

export const Messages = ({ friend, handleClick }) => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [bool, setBool] = useState(false);
  const socket = socketHook();
  const onlineUsers = useSelector((state) => state.userSlice.onlineUsers);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const userId = useSelector((state) => state.userSlice.user._id);
  const room = [userId, friend._id].sort().join('_');
  const chatUser ={}

  const smoothScroll =()=>{
    const element = document.getElementById('chats');
    setTimeout(()=>{
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
      });
    },100)
  }

  const sendMessages = async () => {
    try {
      const res = await fetch(`https://socialmedia-z9uq.onrender.com/message/send/${friend._id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ message, userId })
      });
      smoothScroll()
      setMessage(''); //clear input
  
    } catch (e) {
      console.log(e.message);
    }
  };

  const socketMessage = () => {
    const chatUser = {
      senderId: userId,
      message,
      receiverId:friend._id,
      createdAt:new Date()
    };
    socket.emit("message", { room, chatUser });
    setMessage(''); //clear input
  };

  const getMessages = async () => {
    try {
      const res = await fetch(`https://socialmedia-z9uq.onrender.com/message/${userId}/${friend._id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
      });
      const data = await res.json();
      setChats(data.messages);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setChats((prevMessages) => Array.isArray(prevMessages) ? [...prevMessages, data] : [data]);
      console.log(data);
      smoothScroll();
      if(data.message&&data.senderId){
        dispatch(setSocketLastMessage(data))
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  
  useEffect(() => {
    socket.emit('message', {room, chatUser});
    getMessages();
  }, [friend._id]);

  const scroll =()=>{
    setTimeout(()=>{
      const element = document.getElementById('chats');
      element.scrollTop = element.scrollHeight; // Scroll to the bottom(without scroll behaviour)
      setBool(true)
    },400)
  }
  useEffect(() => {
    scroll()
  }, []);
  
  return (
    <div className="p-4 h-full max-md:h-[100dvh]   bg-white rounded-lg 
     flex flex-col justify-between">
      {/* Header for name img and online status*/}
      <div className="flex items-center max-md:sticky max-md:top-0 space-x-4 
        text-[22px] mb-4 border-blue-500 border-b-[2px] bg-white pb-1">
        <div onClick={handleClick} className="cursor-pointer text-blue-500">
          <IoArrowBackSharp />
        </div>
        <img
          src={`https://socialmedia-z9uq.onrender.com/streamId/${friend.userPic}`}
          className="h-[45px] w-[45px] rounded-full object-cover"
          alt="pic"
        />
        <div className="flex flex-col">
          <div className="font-semibold">{friend.firstname} {friend.lastname}</div>
          {onlineUsers.includes(friend._id)?(
          <div className="flex items-center text-[15px] font-medium text-gray-400 ">
            <MdOnlinePrediction className ="text-[20px] text-green-600 mr-1"/>online
          </div>
          ):null}
        </div>
      </div>

      {/* Chat Messages(sender N receiver)*/}
      <div className="flex-grow overflow-y-auto scrollbar-hide mb-4 space-y-4" id="chats">
        {chats && chats.map((m, index) => (
          m.message ?
            <div key={index} className={`flex items-start  space-x-2 ${m.senderId === userId ? 'justify-end' : 'justify-start'}`}>
              {bool?<img
                src={m.senderId === userId ? `https://socialmedia-z9uq.onrender.com/streamId/${user.userPic}` : `https://socialmedia-z9uq.onrender.com/streamId/${friend.userPic}`}
                className="h-[38px] w-[38px] rounded-full object-cover"
                alt="User"
              />:null}
              <div className={`${m.senderId === userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'} 
                p-3 rounded-lg max-w-[70%] break-words`} id={bool?null:'chatLoad'}>
                <div className="text-[16px] font-semibold">{m.senderId === userId ? 'You' : `${friend.firstname} ${friend.lastname}`}</div>
                <div className="text-[15px]">{m.message}</div>
                <div className="text-[12px]">{FormatTime(new Date(m.createdAt))}</div>
              </div>
            </div> : null
        ))}
      </div>

      {/* Message Input(send messages) */}
      <div className="flex items-center space-x-2 ">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
          placeholder="Type your message..."
        />
        <FaTelegramPlane
          onClick={() => { sendMessages(); socketMessage(); }}
          className="text-[30px] text-blue-500 cursor-pointer"
        />
      </div>
    </div>
  );
};
