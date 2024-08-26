import React,{useMemo, useEffect} from 'react'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';

export const socketHook = () => {
  const userId = useSelector((state)=>state.userSlice.user._id);
  const messagePage = useSelector((state)=>state.userSlice.messagePage);
  const friend = useSelector((state)=>state.userSlice.friend);
  const dispatch = useDispatch();
  const socket = useMemo(()=>io("http://localhost:6001", {
        withCredentials: true,
        query: {
					userId: userId,
				},
  }),[])
    
      
  useEffect(() => {
    socket.on("connect", () => {
      // console.log("connected", socket.id);
    });    
    return () => {
      socket.disconnect();
    }}, [userId,messagePage,friend]);
  return socket
}
