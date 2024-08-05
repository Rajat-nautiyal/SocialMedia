import React,{useState}from 'react'
import { useMediaQuery } from '@react-hook/media-query';
import {Search} from '../../component/search.jsx'
import {Profile} from '../../component/profile.jsx'
import {Posts} from '../../component/posts/posts.jsx'
import {Friends} from '../../component/friends.jsx'
import {Navbar} from '../../component/navbar/navbar.jsx'
import {Messages} from '../messages/messages.jsx'
import { IoLogoGithub } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import './home.css'
import { useDispatch, useSelector } from 'react-redux';
import { Users } from '../users/users.jsx';
import { useParams } from 'react-router-dom';

export const Home = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [homePage, setHomePage] = useState(true);
  const [usersPage, setUsersPage] = useState(false);
  const [messagePage, setMessagePage] = useState(false);

  // const params = useParams();
  // if(params=='/profile/:id'){
  //   setUsersPage()
  // }

  const dispatch = useDispatch();
  // const page = useSelector((state)=>state.userSlice.page)
  const mode = useSelector((state)=>state.userSlice.mode)

  return (
    <>
    {!isMobile?(<>
      <div className='top-header'>
        <div className='flex flex-row w-9/12'>
          <div className='nameNsearch'>
            <div className='flex flex-row text-[30px] items-center'>
              <IoShareSocialOutline/>SocialEra
            </div>
            <div className='text-[18px]'><Search/></div>
          </div>
          <div className='navHeader'>
            <Navbar setHomePage={setHomePage} setUsersPage={setUsersPage} setMessagePage={setMessagePage}/>
          </div>
        </div>
        <div className='flex flex-row items-center w-[20%] justify-around'>
          <div>{mode==='light'?<MdLightMode/>:<MdDarkMode/>}</div>
          <div><IoIosLogOut/></div>
          <div><IoLogoGithub/></div>
        </div>
      </div>
      <div className='mainPage'>
        <Profile className='w-[30%]'/>
        {homePage ? (
          <Posts className='w-[40%]'/>
        ) : usersPage ? (
        <Users className='w-[40%]'/>
        ) : null}
        <Friends className='w-[30%]'/>
        <div className='w-[30%]' style={messagePage ? { color: 'black' }: { display: 'none' } }>
          <Messages className='w-[100%]'/>
        </div>
      </div>
      </> ):(
      <>
        <div>
          <div>
            <div>SocialEra</div>
            <div><Search/></div>
          </div>
          <div><Navbar/></div>
        </div>
        <div>
          <div>darkmode</div>
          <div>logout</div>
        </div>
        <Profile/>
        <Posts/>
        <Friends/>:<Messages/>
        </>)
    } 
    </>
  )
}
