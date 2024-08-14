import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setFriends } from '../state/index.jsx';
import {FollowUser} from '../hooks/addFriendHook.jsx'
import {getUserPost} from '../hooks/getUserHook.jsx'

export const Friends = () => {
  const frnds = useSelector((state)=>state.userSlice.user.friends);
  const userId = useSelector((state)=>state.userSlice.user._id);
  const mode = useSelector((state)=>state.userSlice.mode);

  const dispatch = useDispatch();
  const profileUser = useSelector((state)=>state.userSlice.profileUser);
  const followUser = FollowUser(); // to add/remove friend
  const getUserpost = getUserPost(); //to get user posts

  const getUserFriends =async()=>{
      try{
        let res;
        if(profileUser ===null){
          res = await fetch(`http://localhost:6001/users/${userId}`,{
            method: 'GET',
            headers:{
              'content-type':'application/json'
            },
          })
        }else{
          res = await fetch(`http://localhost:6001/users/${profileUser._id}`,{
            method: 'GET',
            headers:{
              'content-type':'application/json'
            },
          })

        }
        const data = await res.json()
        // console.log(data) //got friends and current user
        dispatch(setFriends({friends:data.friendsData}))

      } catch(e){
          console.log(e.message)
      }
  }
  useEffect(()=>{
    getUserFriends();
  },[profileUser])
  
  return (
<div className='w-[100%] p-4'>
  <h2 className={mode?`text-[20px] text-white font-medium py-3`: `text-[20px] font-medium py-3`}>Friends</h2>
  <div className='space-y-4'>
    {frnds.friends && frnds.friends.map((u) => (
      <div key={u._id} className='bg-white rounded-md shadow-md p-4 flex items-center space-x-4'>
        <img
          onClick={()=>{getUserpost(u)}}
          src={`http://localhost:6001/streamId/${u.userPic}`}
          className='h-16 w-16 rounded-full object-cover'
          alt={`${u.firstname} ${u.lastname}`}
        />
        <div className='flex-1 hover:cursor-pointer' onClick={()=>{getUserpost(u)}}>
          <div className='hover:underline text-[18px] font-semibold'>{u.firstname} {u.lastname}</div>
          <div className='text-[17px] text-gray-600'>{u.location}</div>
        </div>
        <button onClick={()=>{followUser(u._id)}} className='text-[16px] 
        text-red-500 hover:text-red-600 hover:font-large'>Remove Friend</button>
      </div>
    ))}
  </div>
</div>
  )
}
