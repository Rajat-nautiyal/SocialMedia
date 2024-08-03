import React, {useState, useRef} from 'react'
import {useSelector} from 'react-redux'
import { MdPhoto } from "react-icons/md";

export const CreatePost = () => {
  const [fileData, setFileData] = useState(null);
  const formRef = useRef();
  const user = useSelector((state) => state.userSlice.user);
  const userId = user._id;
  const fullname = `${user.firstname} ${user.lastname}`

    const postData = async(e)=>{
       e.preventDefault()
       const formData = new FormData(formRef.current);
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
    <>
      <form ref={formRef} onSubmit={postData} >
          <input type='file' id = 'file' name='file' style={{display :'none'}}
           />
          <label htmlFor='file' name = 'file'>
              <div name = 'file'><MdPhoto /></div>
          </label>

         <input type="text" name="description" placeholder="Post something..." />
        <input type='submit' value='submit' className='bg-slate-500 rounded-full px-2'/>
      </form>

    </>
  )
}
