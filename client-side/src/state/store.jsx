import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from './index.jsx'

const store = configureStore({
    reducer:{
        userSlice: userSliceReducer
    }
})

export default store;