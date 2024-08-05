import React, {useState, useRef} from 'react'
import {useSelector} from 'react-redux'
import { MdPhoto } from "react-icons/md";
import { MdPhotoLibrary } from "react-icons/md";

export const CreatePost = () => {
  const [fileData, setFileData] = useState(null);
  const formRef = useRef();
  const user = useSelector((state) => state.userSlice.user);
  const userId = user._id;
  const fullname = `${user.firstname} ${user.lastname}`
  const userPic = user.userPic;

    const postData = async(e)=>{
       e.preventDefault()
       const formData = new FormData(formRef.current);
       const description = formRef.current.description.value;
       const file = formRef.current.file.value;
       if ((description===null || description==="") && (file===null || file==="")) {
        console.log('No description or picture provided');
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
         console.log('form data is',data)
        }
        catch (error) {
           console.error('Error submitting form:', error);
        }
      }
  return (
    <div className='w-full bg-white rounded-lg my-2 items-center 
      pb-[5px] shadow-md pt-[10px] border-[1px]'>
      <form ref={formRef} onSubmit={postData} className='w-full' >
        <div className='flex space-x-1'>
          <img src={`http://localhost:6001/streamId/${userPic}`} className='profile-pic'/>
          <input type="text" 
          className='postInput'
          name="description" placeholder="Post something..." />
          <input type='submit' value='Post' className='btn'/>
        </div>
        <input type='file' 
          id = 'file' name='file' style={{display :'none'}}
        />
        <label htmlFor='file' name = 'file' className='w-full'>
              <div name = 'file' className='createPostIcon'>
                <MdPhotoLibrary className='text-[30px] text-green-400' />
                Photo/Video
              </div>
        </label>
      </form>

    </div>
  )
}
