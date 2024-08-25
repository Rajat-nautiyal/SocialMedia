import React,{useState} from 'react'
import { RxCross2 } from "react-icons/rx";
import {getUserPost} from '../hooks/getUserHook.jsx'
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@react-hook/media-query';
import { MobSearch } from './mob-search.jsx';

export const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [mobSearch, setMobSearch] = useState(false);
  const [foundedUser, setFoundedUser]= useState(null);
  const getUserpost = getUserPost(); //to get user posts
  const mode = useSelector((state)=>state.userSlice.mode);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const handleClickMobSearch=()=>{
    setMobSearch(!mobSearch);
  }
  const getUser =async(inputValue)=>{
    try{
      // console.log(user)
      const res = await fetch(`http://192.168.0.130:6001/users/${inputValue}`,{
        method: 'GET',
        headers:{
          'content-type':'application/json'
        },
      })
      const data = await res.json()
      if(data.user){
        setFoundedUser(data.user)
      } else {      
        setFoundedUser('No user Found')
      }
      
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
    <div className='w-[250px] max-tl:w-[150px] max-tl:overflow-hidden max-tl:mr-1 '>
  {!isMobile?
    <div className="relative w-[200px] transition-all duration-300 focus-within:w-[220px]
       max-md:w-[150px]"
      id={mode?'darkSearch':''}>
      <div className="absolute inset-y-0 left-0 pl-2 max-md:pl-2 flex items-center text-gray-500 pointer-events-none">
        <CiSearch className='text-[22px]'/>
      </div>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full border-[1.5px] border-gray-400 hover:border-blue-300 
          focus:w-[220px] transition-all duration-300 focus:outline-blue-400 bg-gray-100
          focus:border-none rounded-full py-[2px] pl-10 placeholder:text-[16px] focus:bg-gray-300
          max-tl:w-[150px] max-tl:hover:w-[150px] max-tl:pr-1
          max-md:w-[40px] max-md:pl-9 max-md:z-50 max-md:focus:w-[150px] max-md:rounded-full max-md:border-gray-500
          max-md:bg-gray-200 placeholder:font-light"
        placeholder="Search friends"
      />
    </div>
    :<>
      <div onClick={handleClickMobSearch}
      className='rounded-full absolute right-1 inset-y-1 w-8 h-8 p-1 
      bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center'
      >
        <CiSearch className='text-[22px] font-bold text-white hover:text-blue-100 
         transition-colors duration-300'
        />
      </div>
      {isMobile&&mobSearch?
        <MobSearch 
          handleKeyDown ={handleKeyDown}
          setInputValue ={setInputValue}
          inputValue ={inputValue}
          foundedUser= {foundedUser}
          setFoundedUser ={setFoundedUser}
          handleClickMobSearch= {handleClickMobSearch}
        />:null}
    </>
    }
      <div>
        {foundedUser && !isMobile && foundedUser.firstname? (
          <div className='absolute w-[250px] p-2 bg-white flex items-center 
          rounded-xl shadow-xl '>
            <img 
              src={`http://192.168.0.130:6001/streamId/${foundedUser.userPic}`} 
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
        ):!isMobile&&foundedUser?
        <div className='absolute w-[200px] p-2 bg-white flex items-center 
          rounded-xl shadow-xl text-black'>
          {foundedUser}
        </div>:null}
      </div>

    </div>
  )
}
