import React, {useState, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { MdPhoto } from "react-icons/md";
import { MdPhotoLibrary } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import {updatePost} from '../../state/index.jsx'

export const CreatePost = ({handleClick}) => {
  const [fileName, setFileName] = useState(null);
  const[loading, setLoading]= useState(false);
  const dispatch = useDispatch();
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
         const res = await fetch('http://localhost:6001/post/createpost',{
           method:'POST',
           body: formData,
         })
         const data = await res.json()
         setLoading(false)
         setFileName(null)
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
          <img src={`http://localhost:6001/streamId/${userPic}`} className='profile-pic'/>
          <input type="text" 
          className='postInput'
          name="description" placeholder="Post something..." 
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
                <MdPhotoLibrary className='text-[30px] text-green-400' />
                Photo/Video
              </div>
              <div className='text-gray-600 font-sm'>{fileName}</div>
        </label>

      </form>

    </div>
  )
}
