import React, { useEffect, useState } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { socketHook } from '../hooks/socketHook.jsx';
import { MdOnlinePrediction } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { setSocketLastMessage } from '../state/index.jsx';

export const Messages = ({ friend, handleClick }) => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const socket = socketHook();
  const onlineUsers = useSelector((state) => state.userSlice.onlineUsers);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const userId = useSelector((state) => state.userSlice.user._id);
  const room = [userId, friend._id].sort().join('_');
  const chatUser ={}
  const sendMessages = async () => {
    try {
      const res = await fetch(`http://localhost:6001/message/send/${friend._id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ message, userId })
      });
      const data = await res.json();
      console.log(data);
      setMessage(''); //clear input
    } catch (e) {
      console.log(e.message);
    }
  };

  const socketMessage = () => {
    const chatUser = {
      senderId: userId,
      message,
    };
    socket.emit("message", { room, chatUser });
    setMessage(''); //clear input
  };

  const getMessages = async () => {
    try {
      const res = await fetch(`http://localhost:6001/message/${userId}/${friend._id}`, {
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
      console.log(data)
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

  return (
    <div className="p-4 h-full bg-white rounded-lg flex flex-col justify-between">
      {/* Header for name img and online status*/}
      <div className="flex items-center space-x-4 text-[22px] mb-4 border-blue-500 border-b-[2px] pb-1">
        <div onClick={handleClick} className="cursor-pointer text-blue-500">
          <IoArrowBackSharp />
        </div>
        <img
          src={`http://localhost:6001/streamId/${friend.userPic}`}
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
      <div className="flex-grow overflow-y-auto mb-4 space-y-4">
        {chats && chats.map((m, index) => (
          m.message ?
            <div key={index} className={`flex items-start space-x-2 ${m.senderId === userId ? 'justify-end' : 'justify-start'}`}>
              <img
                src={m.senderId === userId ? `http://localhost:6001/streamId/${user.userPic}` : `http://localhost:6001/streamId/${friend.userPic}`}
                className="h-[38px] w-[38px] rounded-full object-cover"
                alt="User"
              />
              <div className={`${m.senderId === userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'} p-3 rounded-lg max-w-[70%] break-words`}>
                <div className="text-[16px] font-semibold">{m.senderId === userId ? 'You' : `${friend.firstname} ${friend.lastname}`}</div>
                <div className="text-[14px]">{m.message}</div>
              </div>
            </div> : null
        ))}
      </div>

      {/* Message Input(send messages) */}
      <div className="flex items-center space-x-2">
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
