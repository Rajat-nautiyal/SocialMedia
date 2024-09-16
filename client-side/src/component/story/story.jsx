import React,{useState,useEffect} from 'react'
import { CreateStory } from './createStory'
import { IoAdd } from "react-icons/io5";
import {GetStory} from "./getStory.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { setStories } from '../../state/index.jsx';
import generalBg from '../../../public/assets/40345755_2163632403908042_6254610308791271424_n.jpg'

export const Story = () => {
  const userPic =  useSelector(state=>state.userSlice.user.userPic);
  const [story, setStory] = useState(false)
  const [createdStory, setCreatedStory] = useState(false)
  const stories =  useSelector(state=>state.userSlice.stories);

  const handleStory =()=>{
    setCreatedStory(!createdStory);
  }
  const handleClick =()=>{
    setStory(null)
  }
  const dispatch = useDispatch();
  const fetchStories = async()=>{
    try{
      const res = await fetch(`https://server-side-delta.vercel.app/story`,{
        method: 'GET',
        headers:{
          'content-type':'application/json'
        },
        credentials: 'include', 
      })
      const data = await res.json()
      dispatch(setStories(data))
    } catch(e){
        console.log(e.message)
    }
  }
  useEffect(()=>{
    fetchStories()
  },[createdStory])
  return (
    <div className='w-full h-[30%] max-md:h-[25vh] overflow-x-scroll overflow-y-hidden my-2 mb-5 
      scrollbar-hide flex items-center'>
      <div className='h-full w-full flex flex-row space-x-4 overflow scrollbar-hide'>
        <CreateStory handleStory ={handleStory} />
        {stories && stories.map((s) => (
          <div onClick={()=>setStory(s)} 
            key={s._id}
            className="relative flex flex-row flex-shrink-0 h-full w-[30%] cursor-pointer 
            rounded-xl transition-all  duration-300 hover:scale-105"
          >
              <div className="relative flex flex-col w-[95%] items-center h-full">
                {s.description?
                <div className="absolute top-0 mt-2 text-white text-[11px] font-bold 
                  break-words bg-black bg-opacity-50 p-1 rounded-lg max-w-[90%] text-center"
                >
                  {s.description}
                </div>:null}
                <img 
                    src={s.postPicturePath?`https://server-side-delta.vercel.app/streamId/${s.postPicturePath}`:generalBg}
                    className="w-full h-full object-cover rounded-xl" 
                    alt="story" 
                />
            </div>
            <div className='absolute flex flex-col w-full h-full justify-between p-2'>
              <img 
                src={`https://server-side-delta.vercel.app/streamId/${s.userId.userPic}`}
                className="h-[48px] w-[48px] border-[3.5px] border-blue-700 rounded-full" 
              />
              <div className='text-white text-sm'>{s.userId.firstname} {s.userId.lastname}</div>
            </div>
          </div>
        ))}
      </div>
      {story?
        <GetStory handleClick={handleClick} story={story}/>:null}
    </div>
  )
}
