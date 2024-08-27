import React from 'react'
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowBackSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import {GetUserPost} from '../hooks/getUserHook.jsx'

export const MobSearch = ({handleKeyDown, setInputValue, foundedUser, inputValue, handleClickMobSearch,setFoundedUser}) => {
    const mode = useSelector((state)=>state.userSlice.mode);
    const getUserPost =GetUserPost();

  return (
    <div className='w-[100vw] flex justify-center items-center h-screen top-[-1dvh] left-[-4px] z-50 absolute
     bg-black bg-opacity-65 '
    >
      <div className='w-[80%] h-[80%] bg-[#37445b] rounded-lg'>
        <div className='flex mt-5 mx-auto items-center w-full justify-center gap-3 ml-2'>
          <div onClick={handleClickMobSearch} 
          className="cursor-pointer text-3xl text-gray-50 rounded-full
           bg-slate-600"
          >
            <IoArrowBackSharp className='text-3xl' />
          </div>

          <div className="relative w-full"
            id={mode?'darkSearch':''}>
            <div className="absolute inset-y-0 left-0 pl-2 max-md:pl-2 flex 
             items-center text-gray-500 pointer-events-none">
              <CiSearch className='text-[22px]'/>
            </div>
            <input
              type="text"
              onKeyDown={handleKeyDown}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-[75%] bg-gray-100 focus:bg-white  
              placeholder:text-gray-400 placeholder:text-[15px] 
                focus:w-[85%] transition-all duration-300 focus:outline-none 
                focus:ring-2 focus:ring-blue-400 rounded-full h-10 pl-10 shadow-sm 
                focus:shadow-md placeholder:font-light"
              placeholder="Search friends"
            />

        </div>
      </div>
      {foundedUser && foundedUser.firstname? (
          <div className='relative w-[95%] mt-4 mx-auto p-2 bg-white flex items-center 
          rounded-xl shadow-xl '>
            <img 
              src={`https://socialera.us.to/streamId/${foundedUser.userPic}`} 
              className='w-12 h-12 rounded-full object-cover mr-3' 
              alt={`${foundedUser.firstname} ${foundedUser.lastname}`} 
            />
            <div onClick={() => {getUserPost(foundedUser),handleClickMobSearch()}} className='flex flex-col'>
              <span className='text-lg font-semibold' id={mode?'darkSearch':''}>
                {foundedUser.firstname} {foundedUser.lastname}
              </span>
              <span className='text-gray-700'>
                {foundedUser.location}
              </span>
            </div>
            <RxCross2 onClick={()=>{setFoundedUser(null),setInputValue('')}}
            className='text-gray-700 text-[23px] mx-auto hover:cursor-pointer
            hover:bg-slate-300 rounded-lg'/>

          </div>

        ):<div className='text-white text-center mt-6'>
          {foundedUser}
          </div>}
        


      </div>
    </div>
  )
}
