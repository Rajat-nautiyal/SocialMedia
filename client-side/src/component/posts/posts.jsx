import React, {useState,useEffect} from 'react'
import { CreatePost } from './createPost.jsx';
import { Post } from './post.jsx';
import {Story} from '../story/story.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state/index.jsx';

export const Posts = () => {
  const [createdPost, setCreatedPost]= useState(false);
  const posts = useSelector((state)=>state.userSlice.posts);
  const dispatch = useDispatch();
  const profileUser = useSelector((state)=>state.userSlice.profileUser);
  const mode = useSelector((state)=>state.userSlice.mode);
  // const userId = useSelector((state)=>state.userSlice.user._id);
  const handleClick =()=>{
    setCreatedPost(!createdPost);
  }

  const getPosts = async()=>{
    try{
      const res = await fetch('https://socialera.us.to/post',{
        method: 'GET',
        headers:{
          'content-type':'application/json'
        },
        credentials: 'include', 
      })
      const data = await res.json()
      // console.log(data)
      dispatch(setPosts({posts:data}))

    } catch(e){
        console.log(e.message)
    }
  }
  useEffect(()=>{
    if (profileUser === null) {
      getPosts();
    }  
  },[profileUser,createdPost]);

  return (
    <div className='w-full my-4'>
      {!profileUser?(<><Story/>
        <CreatePost handleClick ={handleClick}/></>):null}
        <h2 className={mode ? 'text-[20px] text-white font-semibold pt-2 pb-1 ml-2  font-montserrat' 
        : 'text-[20px] pt-2 pb-1 ml-2 font-semibold font-montserrat'}>Feeds</h2>
      {posts.length > 0 ? (
        posts.map((post) =>(
          <Post key = {post._id} post = {post}/>
        ))
      ) : (
        <div className={mode?'text-white font-medium flex justify-center':'flex justify-center'}>
          No Posts to Show
        </div>
      )}
    </div>
  )
}
