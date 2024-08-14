import React, { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa6';
import { useSelector,useDispatch } from 'react-redux';
import {setProfileUser} from '../state/index.jsx'
import { useNavigate } from 'react-router-dom';
import { setPosts } from '../state/index.jsx';
import {getUserPost} from '../hooks/getUserHook.jsx'
import { FollowUser } from '../hooks/addFriendHook.jsx';

export const UsersFunc = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserpost = getUserPost();
  const followUser = FollowUser(); // to add/remove friend
  const frnds = useSelector((state)=>state.userSlice.user.friends);
  const mode = useSelector((state)=>state.userSlice.mode)

  // console.log(frnds)
  // console.log(frnds.friends)

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
      // console.log(friends);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


  return (
<div className='w-[100%] h-full overflow-y-auto scrollbar-hide'>
  <h2 className={mode?'text-[20px] text-white font-medium py-3':'text-[20px] font-medium py-3'}>People you may know</h2>
  <div className='w-[100%] grid grid-cols-3 gap-[8px] overflow-hidden '>
    {users.map((user) => (
      <div key={user._id} className='bg-white rounded-md 
      shadow-md h-[300px]  flex-col justify-between p-3
      hover:cursor-pointer hover:bg-gray-200 hover:shadow-2xl transition-all 
      inline-table overflow-hidden' >
        <div className='flex-1' onClick={() => getUserpost(user)}>
          <img className='h-[100%] min-h-[170px] w-[90%] object-cover mx-auto rounded-lg' 
          src={`http://localhost:6001/streamId/${user.userPic}`} 
          alt={`${user.firstname}`} />
        </div>
        <div className='mt-2'>
          <div className='text-[18px] font-bold hover:underline' 
          onClick={() => getUserpost(user)}>
            {user.firstname} {user.lastname}
          </div>
          <div className='text-[17px]' onClick={() => getUserpost(user)}>{user.location}</div>

          {frnds && frnds.friends.some(friend => friend._id === user._id) ? (
            <button onClick={() => followUser(user._id)} 
            className='text-[18px] hover:underline hover:text-red-600  
            text-red-500 mt-1'>
              Remove
            </button>
          ) : (
            <button onClick={() => followUser(user._id)} 
            className='text-[18px] hover:underline hover:text-blue-600
             text-blue-500 mt-1'>
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
