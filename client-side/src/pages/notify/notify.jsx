import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {FormatTime} from "../../utils/formatDate.js"
import {useUpdateNotifyHook} from "../../hooks/notifyHook.jsx"
import { useNavigate, useParams } from 'react-router-dom';
import {getUserPost} from '../../hooks/getUserHook.jsx'

export const Notify = () => {
  const notifications = useSelector((state)=>state.userSlice.notifications);
  const mode = useSelector((state)=>state.userSlice.mode);
  const navigate = useNavigate();
  const getUser = getUserPost(); //to get user posts

  // const userId = useSelector((state)=>state.userSlice.user._id);
  // const handleClick =(userId)=>{
  //   if(params.id) return
  //   navigate(`profile/${userId}`)
  // }
  const patchNotify = useUpdateNotifyHook()
  useEffect(()=>{
    patchNotify();
  },[])
  return (
    <div className='w-full bg-[#eeeeee] h-full shadow-xl rounded-xl p-4 pt-[0px] overflow-auto scrollbar-hide ' id={mode?'darkNotifyTwo':''}>
      <div className='text-[25px] font-semibold border-b-2 border-blue-700 mb-4 shadow-none sticky top-0 
      bg-[#eeeeee] py-4 rounded-none' id={mode?'darkNotifyThree':''}>Notification</div>
      <div className="space-y-4">
        {notifications && notifications.map((n) => (
          <div key={n._id} onClick={()=>getUser(n.actionId)}
           className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-md">
            <img
              src={`http://localhost:6001/streamId/${n.actionPic}`}
              className='h-[45px] w-[45px] rounded-full object-cover'
              alt='pic'
            />
            <div>
              <div className='text-gray-800 font-semibold'>{n.notification}</div>
              <div className='text-gray-800 '>{FormatTime(new Date(n.createdAt))}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
