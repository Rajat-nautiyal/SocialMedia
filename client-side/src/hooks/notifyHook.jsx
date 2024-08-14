import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setNotifications} from '../state/index.jsx'

export const NotifyHook = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state)=>state.userSlice.user._id);
    const getNotify = async()=>{
        try{
          const res = await fetch(`http://localhost:6001/notify/${userId}`,{
            method: 'GET',
            headers:{
              'content-type':'application/json'
            },
          })
          const data = await res.json()
          console.log(data)
          dispatch(setNotifications(data))
        } catch(e){
            console.log(e.message)
        }
      }
    
  return getNotify;
}


export const useUpdateNotifyHook = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.userSlice.notifications);
  const userId = useSelector((state) => state.userSlice.user._id);

  const patchNotify = async () => {
    try {
      await fetch(`http://localhost:6001/notify/update/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notifications),
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return patchNotify;
};
