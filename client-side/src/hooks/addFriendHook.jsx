import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriends,setOriginalFriends} from '../state/index.jsx';

export const FollowUser = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state)=>state.userSlice.user._id);
    const profileUser = useSelector((state)=>state.userSlice.profileUser);

    const addFriend =async(friendId)=>{
        try{
          const res = await fetch(`http://localhost:6001/users/add/${friendId}/${userId}`,{
            method: 'PATCH',
            headers:{
              'content-type':'application/json'
            },
            credentials: 'include', 
          })
          const data = await res.json()
          // console.log(data)
          if(profileUser) return dispatch(setOriginalFriends({friends:data.friendsData}));
          dispatch(setFriends({friends:data.friendsData}))
        } catch(e){
            console.log(e.message)
        }
      }  
    return addFriend;
  }
