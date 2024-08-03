import React, {useState,useEffect} from 'react'
import { CreatePost } from './createPost.jsx';
import { Post } from './post.jsx';
import {Story} from '../story/story.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state/index.jsx';

export const Posts = () => {
  const posts = useSelector((state)=>state.userSlice.posts);
  const dispatch = useDispatch();
  // const userId = useSelector((state)=>state.userSlice.user._id);

  const getPosts = async()=>{
    try{
      const res = await fetch('http://localhost:6001/post',{
        method: 'GET',
        headers:{
          'content-type':'application/json'
        },
      })
      const data = await res.json()
      console.log(data)
      dispatch(setPosts({posts:data}))
    } catch(e){
        console.log(e.message)
    }
  }
  useEffect(()=>{
    getPosts()
  },[])
  return (
    <div>
      <Story/>
      <CreatePost/>
      {posts.length > 0 ? (
        posts.map((post) =>(
          <Post key = {post._id} post = {post}/>
        ))
      ) : (
        <div>No Posts to Show</div>
      )}
    </div>
  )
}
