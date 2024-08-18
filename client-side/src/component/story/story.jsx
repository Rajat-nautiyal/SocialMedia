import React,{useState,useEffect} from 'react'
import { CreateStory } from './createStory'
import { IoAdd } from "react-icons/io5";
import {GetStory} from "./getStory.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { setStories } from '../../state/index.jsx';

export const Story = () => {
  const userPic =  useSelector(state=>state.userSlice.user.userPic);
  const [story, setStory] = useState(false)
  const stories =  useSelector(state=>state.userSlice.stories);
  const generalBg = 'https://scontent-del1-1.xx.fbcdn.net/v/t39.10873-6/40345755_2163632403908042_6254610308791271424_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=427b5c&_nc_ohc=0Z0D6SF7mMwQ7kNvgEyQm2D&_nc_ht=scontent-del1-1.xx&cb_e2o_trans=t&oh=00_AYCf2DVmebUy7_bLeNmRe-UZfpEcl885pZ_nwsuZn7p2vA&oe=66C5B750'

  const handleClick =()=>{
    setStory(null)
  }
  const dispatch = useDispatch();
  const fetchStories = async()=>{
    try{
      const res = await fetch(`http://localhost:6001/story`,{
        method: 'GET',
        headers:{
          'content-type':'application/json'
        },
      })
      const data = await res.json()
      console.log(data)
      dispatch(setStories(data))
    } catch(e){
        console.log(e.message)
    }
  }
  useEffect(()=>{
    fetchStories()
  },[])
  return (
    <div className='w-full h-[30%] overflow-x-scroll overflow-y-hidden my-2 mb-5 
      scrollbar-hide flex items-center'>
      <div className='h-full w-full flex flex-row space-x-4 overflow scrollbar-hide'>
        <CreateStory />
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
                    src={s.postPicturePath?`http://localhost:6001/streamId/${s.postPicturePath}`:generalBg}
                    className="w-full h-full object-cover rounded-xl" 
                    alt="story" 
                />
            </div>
            <div className='absolute flex flex-col w-full h-full justify-between p-2'>
              <img 
                src={`http://localhost:6001/streamId/${s.userId.userPic}`}
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
