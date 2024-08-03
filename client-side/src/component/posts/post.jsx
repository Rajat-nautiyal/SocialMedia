import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import {updatePost} from '../../state/index.jsx'
import {Comment} from './comment.jsx'

export const Post = ({post}) => {
    const dispatch = useDispatch();
    const userId = useSelector((state)=>state.userSlice.user._id);
    const isLiked = Boolean(post.likes[userId])
    const likeCount = Object.keys(post.likes).length;
    
    const likePost = async(postId)=>{
        try{
          const res = await fetch(`http://localhost:6001/post/like/${postId}`,{
            method: 'PATCH',
            headers:{
              'content-type':'application/json'
            },
            body: JSON.stringify({userId:userId})
          })
          const data = await res.json()
          console.log(data)
          dispatch(updatePost({post:data}))
        } catch(e){
            console.log(e.message)
        }
      }
    
  return (
    <div>
          <div className='w-6/12' key ={post._id}>
            <div>{post.fullname}</div>
            <p>{post.description}</p>
            {post.postPicturePath && post.postPicturePath.contentType ? (
              post.postPicturePath.contentType === 'image/png' || post.postPicturePath.contentType === 'image/jpeg' ? (
                <img src={`http://localhost:6001/stream/${post.postPicturePath.filename}`} alt="Post" />
              ) : post.postPicturePath.contentType === 'video/mp4' ? (
                <video src={`http://localhost:6001/stream/${post.postPicturePath.filename}`} controls></video>
              ) : (
                <div>Unsupported content type</div>
              )
            ) : null}
            <div>
                <div onClick={()=>likePost(post._id)}>
                {isLiked?<GoHeartFill/>:<GoHeart/>}
                </div>
                <div> {likeCount}</div>
                <div><Comment post={post}/></div>
            </div>
          </div>
    </div>  
    )
}
