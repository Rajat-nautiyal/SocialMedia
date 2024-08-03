import React from 'react'
import { useMediaQuery } from '@react-hook/media-query';
import {Search} from '../../component/search.jsx'
import {Profile} from '../../component/profile.jsx'
import {Posts} from '../../component/posts/posts.jsx'
import {Friends} from '../../component/friends.jsx'
import {Navbar} from '../../component/navbar/navbar.jsx'
import {Messages} from '../messages/messages.jsx'
import { IoLogoGithub } from "react-icons/io";

import { useDispatch } from 'react-redux';

export const Home = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const dispatch = useDispatch();
  const bool = true;
  return (
    <>
    {!isMobile?(<>
      <div className='flex flex-row'>
        <div className='flex flex-row'>
          <div className='flex flex-row pr-2'>
            <div>SocialEra</div>
            <div><Search/></div>
          </div>
          <div><Navbar/></div>
        </div>
        <div className='flex flex-row pl-2'>
          <div>darkmode</div>
          <div>logout</div>
          <div><IoLogoGithub/></div>
        </div>
      </div>
      <div className='flex flex-row justify-between'>
        <Profile/>
        <Posts/>
        {bool?<Friends/>:<Messages/>}
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
