import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: null,
    user: null,
    token: null,
    posts: [],
    stories:[],
    notifications:[],
    profileUser:null,
    messagePageBool:false,
    notifyPageBool:false,
    onlineUsers:[],
    originalfriends:[],
    navClickValue:'home',
    socketLastMessage:null,
    lastMessage:null,
  };
const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setMode:(state,action)=>{
      state.mode = action.payload;
    },
    setLogin: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        // console.log(state.token)
    },
    setLogout:(state, action)=>{
        state.user = null;
        state.token = null;
    },
    setPosts:(state,action)=>{
        state.posts = action.payload.posts;
        // console.log(state.posts)
    },
    updatePost:(state,action)=>{
      console.log(action.payload.post.post._id)
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post.post._id) return action.payload.post.post;
        return post;
      });
      state.posts = updatedPosts;      
    },
    setStories:(state,action)=>{
      // console.log(action.payload)
      state.stories = action.payload;      
    },
    createStory:(state,action)=>{
      console.log(action.payload)
      state.stories.push(action.payload)
      console.log(state.stories)
    },

    setProfileUser:(state,action)=>{
      state.profileUser = action.payload;
    },
    setFriends:(state, action)=>{
      if(state.user){
        // console.log(action.payload)
        state.user.friends = action.payload;
        if(state.profileUser) return; //did it so message-friends wont update
        state.originalfriends = action.payload;
      } else {
        console.error("user friends doesn't exist :(");
      }
    },
    setNotifications:(state, action)=>{
      state.notifications = action.payload;
    },
    setSocketLastMessage:(state,action)=>{
      state.socketLastMessage = action.payload;
    },
    setMessagePageBool:(state,action)=>{
      // console.log(action.payload)
      state.messagePageBool = action.payload;
    },
    setNotifyPageBool:(state,action)=>{
      state.notifyPageBool = action.payload;
    },
    setOnlineUsers:(state,action)=>{
      state.onlineUsers = action.payload;
    },
    setNavClickValue:(state,action)=>{
      // console.log(action.payload)
      state.navClickValue = action.payload;
    },
    setLastMessage:(state,action)=>{
      state.lastMessage = action.payload;
    }
  },
});

export const { setLogin, setLogout, setPosts, updatePost, setOnlineUsers,setLastMessage,
  setNotifications, setNavClickValue,setFriends, setProfileUser, setMessagePageBool, 
  setMode, setNotifyPageBool,setSocketLastMessage, createStory,setStories} = userSlice.actions;
export default userSlice.reducer;
