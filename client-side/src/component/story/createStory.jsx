import React, {useState, useEffect,useRef} from 'react'
import { IoAdd } from "react-icons/io5";
import { TbPhotoFilled } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";

export const CreateStory = () => {
  const userPic =  useSelector(state=>state.userSlice.user.userPic);
  const [createStory, setCreateStory] = useState(false);
  const [inputText, setInputText] = useState(null);
  const stories =  useSelector(state=>state.userSlice.stories);
  const [fileData, setFileData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const generalBg = `https://scontent-del1-1.xx.fbcdn.net/v/t39.10873-6/40345755_2163632403908042_6254610308791271424_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=427b5c&_nc_ohc=0Z0D6SF7mMwQ7kNvgEyQm2D&_nc_ht=scontent-del1-1.xx&cb_e2o_trans=t&oh=00_AYCf2DVmebUy7_bLeNmRe-UZfpEcl885pZ_nwsuZn7p2vA&oe=66C5B750`
  // console.log(stories[0])
  const formRef = useRef();
  const userId = useSelector((state) => state.userSlice.user._id);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Create a URL for the file
      setSelectedFile(file);
      setFileData(fileUrl); 
      // console.log(fileUrl)
    }
  };  
  const postStory = async (e) => {
      e.preventDefault();
      const formData = new FormData(formRef.current);
      formData.append('userId', userId);
      const description = formData.get('description')
      const file = formData.get('image')
      // console.log(file)
      if(!description&&file.size===0&&file.name==='') return;
      try {
          const res = await fetch('http://localhost:6001/post/story', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          setCreateStory(false);
          setFileData(null);
          setInputText(null)
          console.log('form data is', data);
        } catch (error) {
          console.error('Error submitting form:', error);
        }
  };
  

  return (
  <>
    <div onClick ={()=>setCreateStory(!createStory)} 
      className={`relative ${stories[0]?`w-[30%]`:`w-[122px]`} flex items-center justify-center
      transition-all cursor-pointer overflow-x-auto flex-shrink-0 hover:scale-105`}>
      <img src={`http://localhost:6001/streamId/${userPic}`} 
        className="h-[100%] w-[100%] transition-all rounded-xl" 
        alt="create story" 
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <IoAdd className="text-[30px] font-bold text-white bg-blue-700 rounded-full p-1" />
      </div>
      <div className="absolute w-[93%] bottom-0 text-[15px] text-white bg-gray-700 
      bg-opacity-70 px-2 py-1 rounded-lg flex justify-center">
        Create Story
      </div>

    </div>
{createStory ? (
  <div className="fixed bg-gray-800 inset-0 flex items-center justify-center bg-opacity-75 z-10" style={{marginLeft:'0px'}}>
    <div className="relative w-[70%] h-[70%] bg-slate-100 rounded-xl overflow-hidden shadow-lg">
      <div className="flex justify-between px-5 items-center mb-4 bg-blue-500 text-lg">
        <div className="font-semibold text-white">Create Story</div>
        <RxCross2
          className="text-2xl text-gray-300 cursor-pointer font-bold hover:scale-125 transition-all"
          onClick={() => {
            setCreateStory(false);
            setFileData(null);
            setInputText(null)
          }}
        />
      </div>
      <div className="flex justify-around">
        <form ref={formRef} onSubmit={postStory} className="w-[40%] h-full flex flex-col gap-7">
          <input
            type="file"
            name="image"
            id="image"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <label htmlFor="image" className="w-full">
            <div className="createPostIcon w-full">
              <TbPhotoFilled className="text-[30px] text-green-400" />
              Photo
            </div>
            <div className="text-gray-600 font-medium">Choose Image for your story</div>
          </label>
          <input
            type="text"
            name="description"
            placeholder="Type text..."
            onChange={(e) => setInputText(e.target.value)}
            className="w-[90%] bg-slate-300 rounded-lg p-2"
          />
          <input
            type="submit"
            value="Create"
            className="bg-blue-700 py-2 w-[20%] cursor-pointer hover:bg-blue-800 rounded-full text-white"
          />
        </form>
        {fileData ? (
          <div className="w-[50%] overflow-hidden">
            <div className="absolute break-words pl-2 pr-2 font-bold w-[50%] text-white text-[25px]">
              {inputText}
            </div>
            {selectedFile?.type.startsWith('image/') ? (
              <img src={fileData} className="w-full rounded-xl" />
            ) : selectedFile?.type.startsWith('video/') ? (
              <video src={fileData} controls className="w-full rounded-xl" />
            ) : null}

          </div>
        ) :inputText? (
          <div className="w-[50%] overflow-hidden ">
            <div className="absolute break-words flex justify-center pl-2 pr-2 font-bold w-[50%] text-white text-[25px]">
              {inputText}
            </div>
            <img src={generalBg} className="w-full max-h-[45%] rounded-xl" />
          </div>
        ):   
          <div className="text-md font-medium">Story will remain active for 24 hours only</div>
        }
      </div>
    </div>
  </div>
) : null}
  </>
      
  )
}
