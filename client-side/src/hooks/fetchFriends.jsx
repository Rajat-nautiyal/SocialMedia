import { useDispatch, useSelector } from 'react-redux';
import {setFriends} from '../state/index.jsx';

export const FetchProfileUser = () => {
    const userId = useSelector((state)=>state.userSlice.user._id)
    const profileUser = useSelector((state)=>state.userSlice.profileUser);
    const dispatch = useDispatch();
    const getFriends =async()=>{
        if (profileUser === null) {
        try {
            const response = await fetch(`http://localhost:6001/users/${userId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include', // Include cookies with the request
            });
            if (response.ok) {
            const data = await response.json();
            dispatch(setFriends({ friends: data.friendsData }));
            } else {
            console.error('Failed to fetch user data');
            }
        } catch (e) {
            console.error('Error:', e);
        }
        }
    }
    return getFriends;
  };
