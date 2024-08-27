import React, {useState, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { MdPhotoLibrary } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const CreatePost = ({handleClick}) => {
  const[fileName, setFileName] = useState(null);
  const[inputValue, setInputValue] = useState('');

  const[loading, setLoading]= useState(false);
  const formRef = useRef();
  const user = useSelector((state) => state.userSlice.user);
  const userId = user._id;
  const fullname = `${user.firstname} ${user.lastname}`
  const userPic = user.userPic;
  
    const postData = async(e)=>{
       e.preventDefault()
       setLoading(true);
       const formData = new FormData(formRef.current);
       const description = formRef.current.description.value;
       const file = formRef.current.file.value;
       if ((description===null || description==="") && (file===null || file==="")) {
        console.log('No description or picture provided');
        setLoading(false)
        return;
      }   
        formData.append('userId',userId);
        formData.append('fullname', fullname);
       try{
         const res = await fetch('https://socialera.us.to/post/createpost',{
           method:'POST',
           body: formData,
           credentials: 'include', 
         })
         const data = await res.json()
         setLoading(false)
         setFileName(null)
         setInputValue('')
        // dispatch(updatePost({post:data}))
          handleClick()
         console.log('form data is',data)
        }
        catch (error) {
           console.error('Error submitting form:', error);
        }
      }
  return (
    <div className='w-full bg-white rounded-lg my-2 mb-4 items-center 
      pb-[5px] shadow-md pt-[10px] border-[1px]'>
      <form ref={formRef} onSubmit={postData} className='w-full' >
        <div className='flex space-x-1'>
          <img src={`https://socialera.us.to/streamId/${userPic}`} className='profile-pic'/>
          <input 
            type="text" 
            className='postInput'
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
            name="description" 
            placeholder="Post something..." 
          />
          {loading?(
            <button type='submit' value='Post' className='btn'>
                <AiOutlineLoading3Quarters className=' loadingBtn'/>
            </button>
          ):(
          <button type='submit' value='Post' className='btn'>Post</button>
          )}
        </div>
        <input type='file' 
          id = 'file' name='file' style={{display :'none'}}
          onChange={(e)=>setFileName(e.target.value)}
        />
        <label htmlFor='file' name = 'file' className='w-full'>
              <div name = 'file' className='createPostIcon'>
                <MdPhotoLibrary className='text-[30px] text-green-500 max-md:text-green-600'  />
                Photo/Video
              </div>
              <div className='text-gray-600 font-sm '>{fileName}</div>
        </label>

      </form>

    </div>
  )
}
