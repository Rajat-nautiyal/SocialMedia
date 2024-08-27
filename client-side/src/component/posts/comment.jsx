import React,{useState} from 'react'
import { FaRegCommentDots } from "react-icons/fa";
import { useDispatch,useSelector } from 'react-redux';
import {updatePost} from '../../state/index.jsx'
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdArrowBack } from "react-icons/io";

export const Comment = ({post}) => {
    // console.log(comments)
    const [isClicked, setIsClicked] = useState(true)
    const [delId, setDelId] = useState('')

    const [comment, setComment] = useState('')
    const dispatch = useDispatch();
    const userId = useSelector((state)=>state.userSlice.user._id);
    const countComment = Object.keys(post.comments).length;
    const mode = useSelector((state)=>state.userSlice.mode);

    const postComment = async(e)=>{
        e.preventDefault()
        try{
          const res = await fetch(`https://socialera.us.to/post/add/comment/${post._id}`,{
            method: 'PATCH',
            headers:{
              'content-type':'application/json'
            },
            credentials: 'include', 
            body: JSON.stringify({userId:userId, comment:comment})

          })
          const data = await res.json()
          dispatch(updatePost({post:data}))
          setComment('')
          // console.log(data)
        } catch(e){
            console.log(e.message)
        }
      }

      const deleteComment = async(commentId)=>{
        try{
          const res = await fetch(`https://socialera.us.to/post/delete/comment/${post._id}`,{
            method: 'PATCH',
            headers:{
              'content-type':'application/json'
            },
            credentials: 'include', 
            body: JSON.stringify({commentId:commentId})

          })
          const data = await res.json()
          // console.log(data)
          dispatch(updatePost({post:data}))
        } catch(e){
            console.log(e.message)
        }
      }
      
    const OnClickCommentTag =()=>{
        setIsClicked((prev)=>!prev)
    }
    const OnClickComment =(userId, commentId)=>{
      if(userId==userId||userId==post.userId){
        setDelId((prevId)=>(prevId === commentId? null:commentId))
      }
  }

    
    return (
      <div >
          {isClicked ? (
              <>
                <div id={mode?'darkComment':''} 
                className='flex text-[26px] py-[6px] px-[8px] hover:bg-gray-300 transition-all rounded-lg ml-[50px] text-gray-500'> 
                    <FaRegCommentDots onClick={OnClickCommentTag} /> 
                    <div className='text-[18px] px-[10px] font-medium'>
                      {countComment}
                    </div>
                </div>
              </>
            ) : (
        <>
          <div className='absolute min-h-[200px] max-h-[350px] max-md:w-full 
            max-md:min-h-[60dvb] max-md:top-32 max-md:left-0 bg-white top-[150px] 
            w-[70%] p-4 rounded-lg shadow-lg flex flex-col justify-between
            left-[15%]'>
            <div className='flex justify-between text-gray-500'>
              <IoMdArrowBack className='text-3xl cursor-pointer mb-2' 
              onClick={OnClickCommentTag} />
              <div className='font-semibold'>Comments</div>
              <FaRegCommentDots className='text-3xl cursor-pointer mb-2' 
              onClick={OnClickCommentTag} />
            </div>
            <div className='overflow-y-scroll flex-grow'>
              {post.comments.map(({ userId, comment, _id }, index) => (
                <div key={index} className='mb-4' onClick={() => OnClickComment(userId._id, _id)}>
                  <div className='flex items-start mb-2'>
                    <img 
                      src={`https://socialera.us.to/streamId/${userId.userPic}`} 
                      className='w-10 h-10 rounded-full mr-3 object-cover' 
                      alt="Post" 
                    />
                    <div className='rounded-xl py-[4px] pl-[4px] pr-[10px] bg-gray-300 shadow-md'>
                      <div className='font-semibold text-black'>{userId.firstname} {userId.lastname}</div>
                      <div className='text-gray-700 font-sm'>{comment}</div>
                    </div>
                  </div>
                  {delId === _id && (
                    <div className='flex justify-end'>
                      <RiDeleteBin5Line className='text-red-600 text-[20px] cursor-pointer' 
                      onClick={() => deleteComment(_id)} />
                    </div>
                  )}
                </div>
              ))}
              {countComment==0?<div className='font-sans text-gray-400 font-medium 
                flex justify-center mt-2'>No comments to show</div>:null}
            </div>

            <form className='flex items-center mt-2' onSubmit={postComment}>
              <input 
                type="text" 
                name="comment" 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="Comment something..." 
                className='flex-grow border focus:bg-slate-200 focus:outline-none border-gray-300 rounded-lg px-3 py-2 mr-2'
              />
              <input 
                type='submit' 
                value="Post" 
                className='bg-slate-500 text-white rounded-full px-4 py-2 cursor-pointer'
              />
            </form>
          </div>
        </>
          )}
      </div>
  );
}
