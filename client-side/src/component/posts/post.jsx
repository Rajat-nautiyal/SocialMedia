import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import {updatePost, setFriends} from '../../state/index.jsx'
import {Comment} from './comment.jsx'

export const Post = ({post}) => {
    const dispatch = useDispatch();
    const userId = useSelector((state)=>state.userSlice.user._id);
    const isLiked = Boolean(post.likes[userId])
    const likeCount = Object.keys(post.likes).length;

    const followUser =async(friendId)=>{
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
    <div className='w-full bg-white rounded-lg my-2 py-[5px] shadow-md border-[1px]'>
          <div className='w-full ' key ={post._id}>
            <div className='flex font-medium text-[17px] hover:cursor-pointer items-start'>
              <img src={`http://localhost:6001/streamId/${post.userId.userPic}`} 
                className='post-profile-pic' alt="Post" />
              <div className='pl-[5px] flex flex-col hover:cursor-pointer'>
                <div>{post.fullname}</div> 
                <div className='text-[13px]'>today 5hr</div>
              </div>
              <div onClick={()=>{followUser(post.userId._id)}} className='pl-[5px] text-[17px]
               text-blue-400 hover:underline'>
                •Follow
              </div>
            </div>
            <p className='pl-[6px]'>{post.description}</p>
            {post.postPicturePath && post.postPicturePath.contentType ? (
              post.postPicturePath.contentType === 'image/png' || post.postPicturePath.contentType === 'image/jpeg' ? (
                <img src={`http://localhost:6001/stream/${post.postPicturePath.filename}`} className='postPic' alt="Post" />
              ) : post.postPicturePath.contentType === 'video/mp4' ? (
                <video src={`http://localhost:6001/stream/${post.postPicturePath.filename}`} 
                className='postPic' controls></video>
              ) : (
                <div>Unsupported content type</div>
              )
            ) : null}
            <div className='flex pt-[10px]'>
                <div className=' flex text-[26px] font-medium hover:cursor-pointer text-gray-500 pl-[12px]' 
                onClick={()=>likePost(post._id)}>
                  {isLiked?<GoHeartFill className='text-red-500 '/>:<GoHeart/>}
                  <div className='text-[18px] px-1 text-gray-500'> {likeCount}</div>
                </div>
                <div><Comment post={post}/></div>
            </div>
          </div>
    </div>  
    )
}
