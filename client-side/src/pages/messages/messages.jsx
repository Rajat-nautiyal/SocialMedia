import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BsChatLeftDots } from "react-icons/bs";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import {Messages} from '../../component/messages.jsx'
import { socketHook } from '../../hooks/socketHook.jsx';
import NotifySoundTwo from "../../../public/assets/tap-notification-180637.mp3"
import { setMessagePageBool } from '../../state/index.jsx';
import { IoArrowBackSharp } from "react-icons/io5";

export const ChatUsers = () => {
  const [friend, setFriend] = useState(null)
  const [lastMessage, setLastMessage] = useState(null)
  const [newMessage, setNewMessage] = useState(null)
  const dispatch = useDispatch();
  const originalfriends = useSelector((state)=>state.userSlice.originalfriends);
  const user = useSelector((state)=>state.userSlice.user);
  const messagePageBool = useSelector((state)=>state.userSlice.messagePageBool);
  const mode = useSelector((state)=>state.userSlice.mode);
  const userId = useSelector((state)=>state.userSlice.user._id);
  const onlineUsers = useSelector((state)=>state.userSlice.onlineUsers);
  const socket = socketHook();
  
  const handleClick =()=>{
    setFriend(null)
  }
  const handleClickTwo =()=>{
      dispatch(setMessagePageBool(!messagePageBool));
    
  }
  const getLastMessages = async () => {
    try {
      const res = await fetch(`https://socialmedia-z9uq.onrender.com/message/${userId}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include', // Include cookies with the request

      });
      const data = await res.json();
      setLastMessage(data)
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    socket.on("new-message", (data) => {
      if (data.message && data.senderId) {
        setNewMessage(data);
        if (data.receiverId === userId||data.senderId === userId) {
            const sound = new Audio(NotifySoundTwo);
            sound.play();
        }
      }
    });
      return () => {
      socket.disconnect();
    };
  }, [socket]);


  useEffect(() => {
    getLastMessages();
  }, [friend,messagePageBool]);

  return (
    <div className='w-full bg-[rgb(96,96,96)] max-md:h-[100dvh] max-md:rounded-none
     overflow-y-auto h-full rounded-xl p-4 scrollbar-hide'  id={mode?'darkChatBg':''}>
      <div className='text-[25px] flex items-center font-semibold border-b-2
         text-white border-blue-500 mb-4 '>
        <IoArrowBackSharp onClick={handleClickTwo} className='mr-2 hover:bg-gray-600 rounded-full'/>
        Your Chats
      </div>
      
      {onlineUsers.length >=1 || onlineUsers.includes(userId) ? (
        <div className='text-lg text-white mb-2'>Online Users</div>
      ) : null}

      {/* Online Users Scrollable Section(check if not) */}
      <div className="flex flex-row overflow-x-auto scrollbar-hide space-x-4 pb-4">
          <div className="flex flex-col hover:cursor-pointer items-center space-y-2">
              <img 
                src={`https://socialmedia-z9uq.onrender.com/streamId/${user.userPic}`} 
                className='h-[45px] w-[45px] hover:h-[48px] hover:w-[48px] transition-all rounded-full object-cover' 
                alt='You'
              />
              <div className="text-sm font-medium text-white">You</div>
            </div>

        {originalfriends?.friends?.map((u) => (
          onlineUsers.includes(u._id) && (
            <div key={u._id} onClick={() => setFriend(u)}
            className="flex flex-col hover:cursor-pointer items-center space-y-2">
              <img 
                src={`https://socialmedia-z9uq.onrender.com/streamId/${u.userPic}`} 
                className='h-[45px] w-[45px] hover:h-[48px] hover:w-[48px] transition-all rounded-full object-cover' 
                alt={`${u.firstname}`} 
              />
              <div className="text-sm font-medium text-white">{u.firstname}</div>
            </div>
          )
        ))}
      </div>

      {/* Friends List Section */}
      <div className="space-y-4">
      {originalfriends?.friends?.map((u) => {
        const message = lastMessage?.find(
          (m) => m.senderId === u._id || m.receiverId === u._id
        );

        if (message) {
          return (
            <div
              key={u._id}
              onClick={() => setFriend(u)}
              className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center space-x-4
               hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
            >
              <img
                src={`https://socialmedia-z9uq.onrender.com/streamId/${u.userPic}`}
                className="h-[45px] w-[45px] rounded-full object-cover"
                alt={`${u.firstname}`}
              />
              <div className="flex-1">
                <div className="text-[18px] font-semibold">
                  {u.firstname} {u.lastname}
                </div>
                <div className="text-[15px] text-gray-600">
                  {
                  newMessage&&newMessage.senderId===u._id&&newMessage.receiverId===userId?
                  newMessage.message:message.message
                }
                </div>
              </div>
              <div>
                {newMessage&&newMessage.senderId===u._id? (
                  <MdOutlineMarkUnreadChatAlt className="text-[23px] text-red-500" />
                ) : message.read? (
                  <BsChatLeftDots className="text-[23px] text-blue-500" />
                ): message.senderId===userId?                  
                <BsChatLeftDots className="text-[23px] text-blue-500" />
                :<MdOutlineMarkUnreadChatAlt className="text-[23px] text-red-500" />
                }
              </div>
            </div>
          );
        }
        return (
          <div
            key={u._id}
            onClick={() => setFriend(u)}
            className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center space-x-4
             hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
          >
            <img
              src={`https://socialmedia-z9uq.onrender.com/streamId/${u.userPic}`}
              className="h-[45px] w-[45px] rounded-full object-cover"
              alt={`${u.firstname}`}
            />
            <div className="flex-1">
              <div className="text-[18px] font-semibold">
                {u.firstname} {u.lastname}
              </div>
              <div className="text-[15px] text-gray-600">Say hi<span className='text-[18px]'>👋</span></div>
            </div>
            <div>
              {true ? (
                <BsChatLeftDots className="text-[23px] text-blue-500" />
              ) : (
                <MdOutlineMarkUnreadChatAlt className="text-[23px] text-red-500" />
              )}
            </div>
          </div>
        );
      })}
      </div>

      {/* Messages Section */}
      {friend ? (
        <div className='absolute h-full w-full max-md:h-[100dvh] max-md:left-0 
          top-0 bg-white z-10 overflow-hidden'>
          <Messages friend={friend} handleClick={handleClick} />
        </div>
      ) : null}
      {originalfriends.friends.length===0?
        <div className='text-white text-center font-inter font-light'>Add friends to chat</div>:null}
    </div>

  )
} 


