import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const Profile = () => {

  const logInUser = useSelector((state)=>state.userSlice.user)
  const profileUser = useSelector((state)=>state.userSlice.profileUser)
  const params = useParams()
  // console.log(params)
  return (
    <div className='w-full'>
      {profileUser?(
        <div>
         <img src={`http://localhost:6001/streamId/${profileUser.userPic}`} 
         className='w-[100px] h-[100px] object-cover rounded-[50%]' alt="Profile" />
         <div>{profileUser.firstname} {profileUser.lastname}</div>
         <div>{profileUser.occupation}</div>
         <div>{profileUser.location}</div>
       </div>
      ):(
        <div>
        <img src={`http://localhost:6001/streamId/${logInUser.userPic}`} 
        className='w-[100px] h-[100px] object-cover rounded-[50%]' alt="Profile" />
        <div>{logInUser.firstname} {logInUser.lastname}</div>
        <div>{logInUser.occupation}</div>
        <div>{logInUser.location}</div>
      </div>
      )}
     

    </div>
  )
}
