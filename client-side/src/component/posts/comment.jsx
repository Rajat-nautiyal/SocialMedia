import React,{useState} from 'react'
import { FaRegCommentDots } from "react-icons/fa";
import { useDispatch,useSelector } from 'react-redux';
import {updatePost} from '../../state/index.jsx'
import { RiDeleteBin5Line } from "react-icons/ri";

export const Comment = ({post}) => {
    // console.log(comments)
    const [isClicked, setIsClicked] = useState(true)
    const [delId, setDelId] = useState('')

    const [comment, setComment] = useState('')
    const dispatch = useDispatch();
    const userId = useSelector((state)=>state.userSlice.user._id);
    const countComment = Object.keys(post.comments).length;

    const postComment = async(e)=>{
        e.preventDefault()
        try{
          const res = await fetch(`http://localhost:6001/post/add/comment/${post._id}`,{
            method: 'PATCH',
            headers:{
              'content-type':'application/json'
            },
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
          const res = await fetch(`http://localhost:6001/post/delete/comment/${post._id}`,{
            method: 'PATCH',
            headers:{
              'content-type':'application/json'
            },
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
      <div>
          {isClicked ? (
              <>
                <div className='flex text-[26px] ml-[50px] text-gray-500'> 
                    <FaRegCommentDots onClick={OnClickCommentTag} /> 
                    <div className='text-[18px] px-[10px] font-medium'>
                      {countComment}
                    </div>
                </div>
              </>
          ) : (
              <>
                  <FaRegCommentDots onClick={OnClickCommentTag} />
                  {post.comments.map(({ userId, comment, _id},index) => (
                      <div key={index} onClick={() => OnClickComment(userId._id, _id)}>
                        <div >
                          <div>
                            <img src={`http://localhost:6001/streamId/${userId.userPic}`} alt="Post" />
                            <div>{userId.firstname} {userId.lastname}</div>
                          </div>
                          <div>{comment}</div>
                          {delId === _id?<div><RiDeleteBin5Line onClick={()=>deleteComment(_id)}/></div>:null}
                        </div>
                      </div>
                  ))}
                  <form onSubmit={postComment}>
                      <input 
                          type="text" name="comment" 
                          value={comment} onChange={(e) => setComment(e.target.value)} 
                          placeholder="Comment something..." 
                      />
                      <input type='submit' className='bg-slate-500 rounded-full px-2' />
                  </form>
              </>
          )}
      </div>
  );
}
