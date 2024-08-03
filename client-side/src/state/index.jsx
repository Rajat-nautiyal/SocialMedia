import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "light",
    user: {
      createdAt:"2024-07-31T08:09:25.507Z",
      email:"test@example.us",
      firstname: "Jon",
      friends: [],
      lastname: "Doe",
      location: "mumbai",
      occupation:"student",
      password:"$2b$10$IxVf7DMOEaLj7qile2kKQOR/T0Y00.qhdDdaT1AxICspGq1rE7Z/m",
      updatedAt:"2024-07-31T08:09:25.507Z",
      userPic:"66a9f13467a19a3b165fb94e",
      __v:0,
      _id:"66a9f1355805459f38a94bda"
    },
    token: null,
    posts: [],
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
    }
    
  },
});

export const { setLogin, setLogout, setPosts,updatePost } = userSlice.actions;
export default userSlice.reducer;
