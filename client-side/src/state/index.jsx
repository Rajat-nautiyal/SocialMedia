import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    profileUser:null
  };
const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setLogin: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token
        // console.log(state.token)
    },
    setLogout:(state, action)=>{
        state.user = null;
        state.token = null;
    },
    setPosts:(state,action)=>{
        state.posts = action.payload.posts
        // console.log(state.posts)
    },
    updatePost:(state,action)=>{
      // console.log(action.payload.post.post._id)
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post.post._id) return action.payload.post.post;
        return post;
      });
      state.posts = updatedPosts;      
    },
    setProfileUser:(state,action)=>{
      state.profileUser = action.payload
  },
    setFriends:(state, action)=>{
      if(state.user){
        console.log(action.payload)
        state.user.friends = action.payload
      } else {
        console.error("user friends doesn't exist :(");
      }
    }
    
  },
});

export const { setLogin, setLogout, setPosts,updatePost, setPage, setFriends, setProfileUser } = userSlice.actions;
export default userSlice.reducer;
