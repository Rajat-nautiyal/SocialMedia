import { useSelector,useDispatch } from 'react-redux';
import state, {setLastMessage} from '../state/index.jsx'

export const LastMessageHook = ()=>{ 
    const dispatch = useDispatch();
    const userId = useSelector((state)=>state.userSlice.user._id);
    const getLastMessages = async () => {
        try {
          const res = await fetch(`http://localhost:6001/message/${userId}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
          });
          const data = await res.json();
          // console.log(data);
          dispatch(setLastMessage(data))
        } catch (e) {
          console.log(e.message);
        }
      };
    
    return getLastMessages;
  }
