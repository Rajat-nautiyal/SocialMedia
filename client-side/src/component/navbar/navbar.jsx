import React,{useState, useEffect} from 'react'
import {  useNavigate } from 'react-router-dom';
import { RiHome2Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux'
import { setLogout, setProfileUser,setMode } from '../../state/index.jsx'
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import { IoLogoGithub } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import '../../pages/home/home.css'
import {Search} from '../../component/search.jsx'
import {setMessagePageBool, setNavClickValue, setNotifyPageBool} from '../../state/index.jsx'

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state)=>state.userSlice.mode);
  const messagePageBool = useSelector((state)=>state.userSlice.messagePageBool);
  const notifyPageBool = useSelector((state)=>state.userSlice.notifyPageBool);
  const navClickValue = useSelector((state)=>state.userSlice.navClickValue);
  const notifications = useSelector((state)=>state.userSlice.notifications);
  // console.log(notifications)
    const Count = notifications.filter((n)=> n.read === false)
    const notifyCount = Count.length;

    // console.log(Count);
  const [darkMode, setDarkMode] = useState(null);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    localStorage.setItem('darkMode', JSON.parse(newMode));
    const getMode = JSON.parse(localStorage.getItem('darkMode'));
    dispatch(setMode(getMode))
    setDarkMode(getMode)
  };

  const handleClick=()=>{
    if(notifyPageBool===true){
      dispatch(setNotifyPageBool(!notifyPageBool));
    }
    dispatch(setProfileUser(null))
    dispatch(setNavClickValue('home'))
    navigate('/')

  }
  const handleClickUsers=()=>{
    dispatch(setNavClickValue('users'))
    navigate('/users')
  }
  const handleClickNotify=()=>{
    if(messagePageBool===true){
      dispatch(setMessagePageBool(!messagePageBool));
    }
    if(notifyPageBool===true){
      dispatch(setNotifyPageBool(!notifyPageBool));
    }
    dispatch(setNotifyPageBool(!notifyPageBool));
  }
  const handleClickMessage =()=>{
    dispatch(setMessagePageBool(!messagePageBool));
    if(notifyPageBool===true){
      dispatch(setNotifyPageBool(!notifyPageBool));
    }

  }

  const handleLogout =()=>{
    dispatch(setLogout())
  }
  useEffect(()=>{
    const getMode = JSON.parse(localStorage.getItem('darkMode'));
    dispatch(setMode(getMode))
    setDarkMode(getMode)
  },[])

  return (
    <>
     <div className='top-header' id={mode?'darkTopheader':''}>
        <div className='flex flex-row w-9/12'>
          <div className='nameNsearch'>
            <div className='flex flex-row text-[30px] items-center'>
              <IoShareSocialOutline/>SocialEra
            </div> 
            <div className='text-[18px]'><Search/></div>
          </div>
          <div className='navHeader'>
            <div className='flex justify-around gap-[6%] w-[100%] text-[25px] 
            overflow-y-hidden'>
              <div className={`hover:bg-gray-300 cursor-pointer py-2 px-8 transition-all 
                rounded-lg`} id={navClickValue=='home'&&!mode?'home':navClickValue=='home'&&mode?'darkHome':null}
                onClick={handleClick}>
                  <RiHome2Line className={mode&&navClickValue==='home'?`text-primary-Default`:``}/>
              </div>
              <div className='hover:bg-gray-300 cursor-pointer py-2 px-8 transition-all 
              rounded-lg' id={navClickValue=='users'&&!mode?'users':navClickValue=='users'&&mode?'darkUsers':null}
                onClick={handleClickUsers}>
                  <FaUsers className={mode&&navClickValue==='users'?`text-primary-Default`:``} />
              </div>
              <div onClick={handleClickNotify}
                id={notifyPageBool && !mode ? 'notify' : notifyPageBool && mode ? 'darkNotify' : null}
                className="relative hover:bg-gray-300 cursor-pointer py-2 px-8 transition-all rounded-lg overflow-hidden"
              >
                {notifyCount!==0?<div className="absolute top-0 right-2 flex items-center justify-center h-6 w-6 text-[14px] font-semibold text-red-500 rounded-full bg-gray-300">
                  {notifyCount}
                </div>:null}
                <MdOutlineNotificationsActive 
                  className={`${mode && notifyPageBool ? 'text-primary-Default' : ''} text-[24px]`} 
                />
              </div>
              <div className='hover:bg-gray-300 cursor-pointer py-2 px-8 transition-all rounded-lg' 
                onClick={handleClickMessage} id={messagePageBool&&!mode?'chat':messagePageBool&&mode?'darkChat':null}
              >
                  <AiOutlineMessage className={mode&&messagePageBool?`text-primary-Default`:``}/>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row items-center w-[20%] justify-around text-[25px]'>
          <div onClick ={toggleDarkMode} className='hover:bg-gray-300 cursor-pointer py-2 px-8 transition-all rounded-lg'>
            {mode?<MdLightMode className='text-customGray'/>:<MdDarkMode/>}
          </div>
          <div onClick={handleLogout} className='hover:bg-gray-300 cursor-pointer py-2 px-8 
          transition-all rounded-lg'><IoIosLogOut/></div>
          <div className='hover:bg-gray-300 cursor-pointer py-2 px-8 transition-all rounded-lg'>
            <IoLogoGithub/>
          </div>
        </div>
      </div>

    </>
  )
}
