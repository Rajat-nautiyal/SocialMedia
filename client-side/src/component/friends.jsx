import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setFriends } from '../state/index.jsx';
import {FollowUser} from '../hooks/addFriendHook.jsx'
import {GetUserPost} from '../hooks/getUserHook.jsx'

export const Friends = () => {
  const frnds = useSelector((state)=>state.userSlice.user.friends);
  const originalfriends = useSelector((state)=>state.userSlice.originalfriends);

  const userId = useSelector((state)=>state.userSlice.user._id);
  const mode = useSelector((state)=>state.userSlice.mode);
  // console.log(frnds)
  const dispatch = useDispatch();
  const profileUser = useSelector((state)=>state.userSlice.profileUser);
  const followUser = FollowUser(); // to add/remove friend
  const getUserpost = GetUserPost(); //to get user posts

  const getUserFriends =async()=>{
      try{
        let res;
        if(profileUser ===null){
          res = await fetch(`https://server-side-delta.vercel.app/users/${userId}`,{
            method: 'GET',
            headers:{
              'content-type':'application/json'
            },
            credentials: 'include', // Include cookies with the request
          })
        }else{
          res = await fetch(`https://server-side-delta.vercel.app/users/${profileUser._id}`,{
            method: 'GET',
            headers:{
              'content-type':'application/json'
            },
            credentials: 'include',
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
    <div className='w-[100%] max-tl:w-[80%] p-4 max-md:max-h-[50vh] mb-2 overflow-auto scrollbar-hide max-md:mt-6'>
      <h2 className={mode ? 'text-[20px] text-white font-medium py-3' : 'text-[20px] font-medium py-3'}>Friends</h2>
      {frnds&&frnds.friends && frnds.friends.length===0?
        <div className={mode?`text-white`:``}>
          No Friends to show
        </div>:null}
      <div className='max-md:grid max-md:grid-cols-2 gap-3 font-montserrat space-y-4 
       max-md:space-y-0 max-md:gap-y-3'>
        {frnds && frnds.friends && frnds.friends.map((u) => (
          <div 
            key={u._id} 
            className='bg-white rounded-md shadow-md p-4 flex items-center max-md:flex-col space-x-4 max-h-64 h-full'
          >
            <img
              onClick={() => { getUserpost(u) }}
              src={`https://server-side-delta.vercel.app/streamId/${u.userPic}`}
              className='h-16 w-16 max-md:h-20 max-md:w-20 rounded-lg object-cover'
              alt={`${u.firstname} ${u.lastname}`}
            />
            <div 
              className='flex-1 hover:cursor-pointer max-md:mt-2' 
              onClick={() => { getUserpost(u) }}
            >
              <div className='hover:underline text-[18px] max-md:text-[14px] font-semibold'>
                {u.firstname} {u.lastname}
              </div>
              <div className='text-[17px] max-md:text-[14px] text-gray-600'>
                {u.location}
              </div>
            </div>
          
          {u._id!==userId?  
          (originalfriends.friends&&originalfriends.friends.some(friend => friend._id ===u._id) ? (
            <button 
            onClick={() => { followUser(u._id) }} 
            className='text-[16px] text-gray-500 hover:text-gray-600 max-md:text-[14px] max-md:hover:underline hover:font-large'
            >
              Following 
            </button>
          ) : (
            <button 
              onClick={() => { followUser(u._id) }} 
              className='text-[16px] hover:text-blue-600 text-blue-500 max-md:text-[14px] max-md:hover:underline hover:font-large'
            >
              Add 
            </button>
        ))
        :      
        <button 
        className='text-[16px] max-md:text-[14px]  font-semibold text-blue-700'
        >
          You 
        </button>}

          </div>
        ))}
      </div>
    </div>
  )
}
