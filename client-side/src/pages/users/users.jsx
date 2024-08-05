import React, { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa6';
import { useSelector,useDispatch } from 'react-redux';
import {setProfileUser} from '../../state/index.jsx'
import { useNavigate } from 'react-router-dom';
import { setPosts } from '../../state/index.jsx';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const page = useSelector((state) => state.userSlice.page);
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const getUserpost = async(user)=>{
    try{
      dispatch(setProfileUser(user))
      // console.log(user)
      const res = await fetch(`http://localhost:6001/post/${user._id}`,{
        method: 'GET',
        headers:{
          'content-type':'application/json'
        },
      })
      const data = await res.json() 
      dispatch(setPosts({posts:data}))
      navigate(`/profile/${user._id}`)
      // setUser(data)
      console.log(data)
    } catch(e){
        console.log(e.message)
    }
  }
  
  
  const getUsers = async () => {
    try {
      const res = await fetch('http://localhost:6001/users', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      setUsers(data);
      console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className='w-[100%]'>
      <h2>People you may know</h2>
      {users.map((user) => (
        <div key={user._id} onClick={() => getUserpost(user)}>
          <div className='h-[150px]'>
            <img className='h-[150px]' src={`http://localhost:6001/streamId/${user.userPic}`} alt={`${user.firstname} ${user.lastname}`} />
          </div>
          <div>{user.firstname} {user.lastname}</div>
          <div>{user.location}</div>
        </div>
      ))}
    </div>
  );
};
