import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { FaBagShopping } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import {FollowUser} from '../hooks/addFriendHook.jsx'

export const Profile = () => {

  const logInUser = useSelector((state)=>state.userSlice.user)
  const profileUser = useSelector((state)=>state.userSlice.profileUser)
  const originalfriends = useSelector((state)=>state.userSlice.originalfriends);
  const followUser = FollowUser(); // to add/remove friend

  return (
    <div className='w-full h-full max-md:w-full flex items-center overflow-auto scrollbar-hide'>
      {profileUser?(
        <div className='w-[92%] px-3 max-md:w-[95%] font-inter max-h-full max-md:mt-6 
         mx-auto rounded-lg shadow-md flex flex-col bg-white py-5 overflow-auto scrollbar-hide'>
          <img 
            src={`https://server-side-delta.vercel.app/streamId/${profileUser.userPic}`} 
            className='min-w-[20%] max-h-[40vh]  max-md:rounded-3xl max-md:object-contain 
             max-md:max-h-[30vh] mx-auto rounded-xl mb-4 ' 
            alt="Profile" 
          />
          <div className='text-center text-xl font-semibold'>
            {profileUser.firstname} {profileUser.lastname}
          </div>

          { profileUser._id!==logInUser._id? 
            (profileUser&&originalfriends.friends&&originalfriends.friends.some(f => f._id === profileUser._id) ? (
            <div 
             onClick={() => { followUser(profileUser._id) }} 
             className='text-center text-[19px] font-medium font-poppins cursor-pointer
            text-gray-600 hover:underline hover:text-gray-700 mt-1'>
              Following
            </div>          
            ) : (
            <div 
            onClick={() => { followUser(profileUser._id) }} 
             className='text-center text-[19px] font-medium font-poppins cursor-pointer
            text-blue-600 hover:underline hover:text-blue-700 mt-1'>
              Follow
            </div>))
            :(
              originalfriends.friends&&<div 
               className='text-center text-[15px] text-gray-600 mt-1 font-light'
              >
                {originalfriends.friends.length} Followers
              </div>
            )
           }

          
          <div className='text-center text-gray-600 flex justify-center w-full 
           items-baseline mt-2'>
            <FaBagShopping className='mr-2 text-lg' /> 
            <div> Works at {profileUser.occupation}</div>
          </div>
          <div className='text-center text-gray-500 flex justify-center items-center mt-1'>
            <FaLocationDot className='mr-2 text-lg' /> 
            <div className='w-90%'> Lives in {profileUser.location}</div>
          </div>
      </div>

      ):(
        <div className='w-[92%] px-3 max-md:w-[95%] font-inter max-h-full max-md:mt-6 
         mx-auto rounded-lg shadow-md flex flex-col bg-white py-5 overflow-auto scrollbar-hide'>
          <img 
            src={`https://server-side-delta.vercel.app/streamId/${logInUser.userPic}`} 
            className='min-w-[20%] max-h-[40vh]  max-md:rounded-3xl max-md:object-contain 
             max-md:max-h-[30vh] mx-auto rounded-xl mb-4 ' 
            alt="Profile" 
          />
        <div className='text-center text-xl font-semibold'>
          {logInUser.firstname} {logInUser.lastname}
        </div>
        <div 
          className='text-center text-[15px] text-gray-600 mt-1 font-light'
        >
          {originalfriends.friends&&originalfriends.friends.length} Followers
        </div>        
        <div className='text-center text-gray-600 flex justify-center w-full items-baseline mt-2'>
          <FaBagShopping className='mr-2 text-lg' /> 
          <div>Works at {logInUser.occupation}</div>
        </div>
        <div className='text-center text-gray-500 flex justify-center items-center mt-1'>
          <FaLocationDot className='mr-2 text-lg' />
          <div className='w-90%'> Lives in {logInUser.location}</div>
        </div>
      </div>
      )}
     

    </div>
  )
}
