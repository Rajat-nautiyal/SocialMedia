import React,{useState} from 'react'
import { RxCross2 } from "react-icons/rx";
import {getUserPost} from '../hooks/getUserHook.jsx'
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';

export const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [foundedUser, setFoundedUser]= useState(null);
  const getUserpost = getUserPost(); //to get user posts
  const mode = useSelector((state)=>state.userSlice.mode);

  const getUser =async(inputValue)=>{
    try{
      // console.log(user)
      const res = await fetch(`http://localhost:6001/users/${inputValue}`,{
        method: 'GET',
        headers:{
          'content-type':'application/json'
        },
      })
      const data = await res.json()
      setFoundedUser(data.user)
    } catch(e){
        console.log(e.message)
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getUser(inputValue);
    }
    setFoundedUser(null);
  };
  return (
    <div className='w-[250px]'>
    <div className="relative w-[200px] transition-all duration-300 focus-within:w-[250px]"
      id={mode?'darkSearch':''}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
        <CiSearch className='text-[22px]'/>
      </div>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full border-[1.5px] border-gray-400 hover:border-blue-300 
          focus:w-[250px] transition-all duration-300 focus:outline-blue-400 
          focus:border-[1px] rounded-full py-[3px] pl-10"
        placeholder="Search friends"
      />
    </div>
      <div>
        {foundedUser && (
          <div className='absolute w-[250px] p-2 bg-white flex items-center 
          rounded-xl shadow-xl '>
            <img 
              src={`http://localhost:6001/streamId/${foundedUser.userPic}`} 
              className='w-12 h-12 rounded-full object-cover mr-3' 
              alt={`${foundedUser.firstname} ${foundedUser.lastname}`} 
            />
            <div onClick={() => {getUserpost(foundedUser)}} className='flex flex-col'>
              <span className='text-lg font-semibold' id={mode?'darkSearch':''}>
                {foundedUser.firstname} {foundedUser.lastname}
              </span>
              <span className='text-gray-700'>
                {foundedUser.location}
              </span>
            </div>
            <RxCross2 onClick={()=>setFoundedUser(null)}
            className='text-gray-700 text-[23px] mx-auto hover:cursor-pointer
            hover:bg-slate-300 rounded-lg'/>
          </div>
        )}
      </div>

    </div>
  )
}
