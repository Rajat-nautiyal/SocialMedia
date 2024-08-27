import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {GetUserPost} from '../hooks/getUserHook.jsx'
import { FollowUser } from '../hooks/addFriendHook.jsx';
import { FetchProfileUser } from '../hooks/fetchFriends.jsx';

export const UsersFunc = () => {
  const [users, setUsers] = useState([]);
  const getUserpost = GetUserPost();
  const followUser = FollowUser(); // to add/remove friend
  const  fetchProfileUser = FetchProfileUser(); 
  const frnds = useSelector((state)=>state.userSlice.user.friends);
  const mode = useSelector((state)=>state.userSlice.mode)

  const getUsers = async () => {
    try {
      const res = await fetch('https://socialera.us.to/users', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include', 
      });
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getUsers();
    fetchProfileUser();
  }, []);


  return (
<div className='w-full h-full overflow-y-auto scrollbar-hide'>
  <h2 className={mode ? 'text-[20px] text-white font-medium py-3' : 'text-[20px] font-medium py-3'}>
    People you may know
  </h2>
  <div className='w-full grid grid-cols-3 max-md:grid-cols-2 gap-4 max-md:gap-2 max-md:justify-items-center max-md:justify-center'>
    {users && users.map((user) => (
      <div 
        key={user._id} 
        className='bg-white rounded-md shadow-md h-[300px]  flex flex-col justify-between 
        p-3 hover:cursor-pointer hover:bg-gray-200 hover:shadow-2xl transition-all 
        max-md:w-[95%] overflow-hidden'
      >
        <div className='flex-1' onClick={() => getUserpost(user)}>
          <img 
            className='h-[170px] w-full object-cover mx-auto rounded-lg' 
            src={`https://socialera.us.to/streamId/${user.userPic}`} 
            alt={`${user.firstname}`} 
          />
        </div>
        <div className='mt-2 text-center'>
          <div 
            className='text-[18px] font-bold hover:underline' 
            onClick={() => getUserpost(user)}
          >
            {user.firstname} {user.lastname}
          </div>
          <div className='text-[17px] text-gray-600' onClick={() => getUserpost(user)}>
            {user.location}
          </div>
          {frnds.friends && frnds.friends.some(friend => friend._id === user._id) ? (
            <button 
              onClick={() => followUser(user._id)} 
              className='text-[18px] hover:underline hover:text-red-600 text-red-500 mt-1'
            >
              Remove
            </button>
          ) : (
            <button 
              onClick={() => followUser(user._id)} 
              className='text-[18px] hover:underline hover:text-blue-600 text-blue-500 mt-1'
            >
              Add
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
  );
};
