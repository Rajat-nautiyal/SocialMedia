import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {setProfileUser} from '../state/index.jsx'
import { useNavigate } from 'react-router-dom';
import { setPosts } from '../state/index.jsx';

export const GetUserPost = ()=>{
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getPost =async(user)=>{
      try{
        dispatch(setProfileUser(user))
        const res = await fetch(`http://localhost:6001/post/${user._id}`,{
          method: 'GET',
          headers:{
            'content-type':'application/json'
          },
          credentials: 'include', 
        })
        const data = await res.json() 
        dispatch(setPosts({posts:data}))
        window.scrollTo(0, 0);

        navigate(`/profile/${user._id}`)
        document.documentElement.scrollTop = 0;


      } catch(e){
          console.log(e.message)
      }
    }

    return getPost;
  }
