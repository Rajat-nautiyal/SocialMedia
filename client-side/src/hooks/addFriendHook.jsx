import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {setProfileUser} from '../state/index.jsx'
import { useNavigate } from 'react-router-dom';
import { setFriends } from '../state/index.jsx';

export const FollowUser = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state)=>state.userSlice.user._id);

    const addFriend =async(friendId)=>{
        try{
          const res = await fetch(`http://localhost:6001/users/add/${friendId}/${userId}`,{
            method: 'PATCH',
            headers:{
              'content-type':'application/json'
            },
          })
          const data = await res.json()
          // console.log(data)
          dispatch(setFriends({friends:data.friendsData}))
        } catch(e){
            console.log(e.message)
        }
      }  
    return addFriend;
  }
