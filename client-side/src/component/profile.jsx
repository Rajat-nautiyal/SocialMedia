import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FaBagShopping } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

export const Profile = () => {

  const logInUser = useSelector((state)=>state.userSlice.user)
  const profileUser = useSelector((state)=>state.userSlice.profileUser)

  return (
    <div className='w-full h-[80%] flex justify-center'>
      {profileUser?(
        <div className='w-[92%] mt-12 mx-auto py-5 h-full rounded-lg shadow-md flex flex-col bg-white'>
          <img 
            src={`http://localhost:6001/streamId/${profileUser.userPic}`} 
            className='w-[80%] h-[70%] mx-auto rounded-xl mb-4 object-cover' 
            alt="Profile" 
          />
          <div className='text-center text-xl font-semibold'>
            {profileUser.firstname} {profileUser.lastname}
          </div>
          <div className='text-center text-gray-600 flex justify-center w-full items-baseline mt-2'>
            <FaBagShopping className='mr-2' /> 
            <div> Works at {profileUser.occupation}</div>
          </div>
          <div className='text-center text-gray-500 flex justify-center items-center mt-1'>
            <FaLocationDot className='mr-2' /> 
            <div className='w-90%'> Lives in {profileUser.location}</div>
          </div>
      </div>

      ):(
      <div className='w-[92%] mt-12 h-full overflow-hidden mx-auto py-5 rounded-lg shadow-md flex flex-col bg-white'>
        <img 
          src={`http://localhost:6001/streamId/${logInUser.userPic}`} 
          className='w-[80%] h-[70%] mx-auto rounded-xl mb-4 object-cover' 
          alt="Profile" 
        />
        <div className='text-center text-xl font-semibold'>
          {logInUser.firstname} {logInUser.lastname}
        </div>
        <div className='text-center text-gray-600 flex justify-center w-full items-baseline mt-2'>
          <FaBagShopping className='mr-2' /> 
          <div>Works at {logInUser.occupation}</div>
        </div>
        <div className='text-center text-gray-500 flex justify-center items-center mt-1'>
          <FaLocationDot className='mr-2' />
          <div className='w-90%'> Lives in {logInUser.location}</div>
        </div>
      </div>
      )}
     

    </div>
  )
}
