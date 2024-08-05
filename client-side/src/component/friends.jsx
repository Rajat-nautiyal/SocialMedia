import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setFriends } from '../state/index.jsx';
import {useNavigate} from 'react-router-dom'

export const Friends = () => {
  const navigate = useNavigate();
  const [friendArr, setFriendArr] = useState([]);
  const frnds = useSelector((state)=>state.userSlice.user.friends);
  console.log(frnds)
  const userId = useSelector((state)=>state.userSlice.user._id);
  const dispatch = useDispatch();

  const getUserFriends =async()=>{
      try{
        const res = await fetch(`http://localhost:6001/users/${userId}`,{
          method: 'GET',
          headers:{
            'content-type':'application/json'
          },
        })
        const data = await res.json()
        // console.log(data) //got friends and current user
        setFriendArr(data)
        dispatch(setFriends({friends:data.friendsData}))
      } catch(e){
          console.log(e.message)
      }
  }
  useEffect(()=>{
    getUserFriends();
  },[])
  
  return (
    <div className='w-[100%]'>
      friends
      {frnds.friends&&frnds.friends.map((u)=>(
        <div key={u._id}>
          <img src={`http://localhost:6001/streamId/${u.userPic}`}
          className ='profile-pic' alt="user" />     
          <div>{u.firstname} {u.lastname}</div>   
          <div>{u.location}</div>
          <div>remove friend</div>
        </div>
      ))}
    </div>
  )
}
