import React, { useEffect,useRef, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useMediaQuery } from '@react-hook/media-query';
import generalBg from '../../../public/assets/40345755_2163632403908042_6254610308791271424_n.jpg'

export const GetStory = ({handleClick, story}) => {

    // console.log(story.postPicturePath)
    const [imgHeight, setImgHeight] = useState(null);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const imageRef = useRef();
    useEffect(()=>{
        // console.log(imageRef.current.src)
        if(isMobile){setTimeout(()=>handleClick(),6000)};
        setTimeout(()=>handleClick(),6000);
        const img = new Image();
        img.src = imageRef.current.src;
        img.onload = () => {
        const height = img.height
        setImgHeight(height)
        };
    },[])
 return (
    <div className="absolute inset-0 overflow-hidden bg-gray-900 bg-opacity-80 max-md:h-[100vh] flex justify-center items-center">
        <div className="bg-gray-800 h-[90vh] w-[50%] max-md:w-[95%] max-md:h-[90%] rounded-lg shadow-lg p-4 relative z-20">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                    <img 
                    src={`http://localhost:6001/streamId/${story.userId.userPic}`} 
                    className="h-12 w-12 object-cover border-2 border-blue-700 rounded-full"
                    />
                    <div className="text-white text-lg font-semibold">
                        {story.userId.firstname} {story.userId.lastname}
                    </div>
                </div>
                <RxCross2 
                    className="text-2xl text-gray-300 cursor-pointer hover:scale-125 transition-all duration-200"
                    onClick={handleClick} 
                />
            </div>
            <div className="relative w-full h-[2px] bg-gray-700 overflow-hidden mb-3">
                <div className="absolute h-full w-[100%] bg-white animate-slide"></div>
            </div>
            <div className="relative flex flex-col items-center h-full">
                {story.description?<div className="absolute top-0 mt-2 text-white text-[23px] font-bold break-words bg-black bg-opacity-50 px-2 rounded-lg text-center">
                    {story.description}
                </div>:null}
                
                <img ref={imageRef}
                    src={story.postPicturePath?`http://localhost:6001/streamId/${story.postPicturePath}`:generalBg}
                    className={story.postPicturePath?`h-[80%] ${imgHeight<860?`object-cover`: `object-contain`} w-full rounded-lg`:`h-[80%] object-scale-cover w-full rounded-lg`}
                />
            </div>
        </div>
    </div>
  )
}
