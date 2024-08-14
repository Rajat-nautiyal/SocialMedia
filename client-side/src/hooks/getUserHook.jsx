import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {setProfileUser} from '../state/index.jsx'
import { useNavigate } from 'react-router-dom';
import { setPosts } from '../state/index.jsx';

export const getUserPost = ()=>{
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getPost =async(user)=>{
      try{
        dispatch(setProfileUser(user))
        // console.log(user)
        const res = await fetch(`http://localhost:6001/post/${user._id}`,{
          method: 'GET',
          headers:{
            'content-type':'application/json'
          },
        })
        const data = await res.json() 
        dispatch(setPosts({posts:data}))
        // setUser(data)
        // console.log(data)
        navigate(`/profile/${user._id}`)
  
      } catch(e){
          console.log(e.message)
      }
    }

    return getPost;
  }
