import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {FormatTime} from "../../utils/formatDate.js"
import {useUpdateNotifyHook} from "../../hooks/notifyHook.jsx"
import {getUserPost} from '../../hooks/getUserHook.jsx'
import { IoArrowBackSharp } from "react-icons/io5";
import {setNotifyPageBool} from '../../state/index.jsx'

export const Notify = () => {
  const notifications = useSelector((state)=>state.userSlice.notifications);
  const mode = useSelector((state)=>state.userSlice.mode);
  const dispatch = useDispatch();
  const getUser = getUserPost(); //to get user posts
  const notifyPageBool = useSelector((state)=>state.userSlice.notifyPageBool);

  const handleClick =()=>{
    dispatch(setNotifyPageBool(!notifyPageBool));
  }
  const patchNotify = useUpdateNotifyHook()
  useEffect(()=>{
    patchNotify();
  },[])

  return (
    <div className='w-full bg-[#eeeeee] h-full shadow-xl rounded-xl p-4 
      pt-[0px] overflow-auto scrollbar-hide font-inter ' id={mode?'darkNotifyTwo':''}>
      <div className='text-[25px] flex  items-center font-semibold border-b-2 border-blue-700 mb-4 shadow-none sticky top-0 
      bg-[#eeeeee] py-4 rounded-none' id={mode?'darkNotifyThree':''}>
        <IoArrowBackSharp onClick={handleClick}
          className='mr-2 max-md:mb-1 max-md:text-[26px] hover:bg-gray-600 rounded-full'
        />
        Notification
      </div>
      <div className="space-y-4">
        {notifications && notifications.map((n) => (
          <div key={n._id} onClick={()=>{getUser(n.actionId),handleClick()}}
           className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-md">
            <img
              src={`http://192.168.0.130:6001/streamId/${n.actionPic}`}
              className='h-[45px] w-[45px] rounded-full object-cover'
              alt='pic'
            />
            <div>
              <div className='text-gray-800 font-semibold'>{n.notification}</div>
              <div className='text-gray-800 text-sm '>{FormatTime(new Date(n.createdAt))}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
