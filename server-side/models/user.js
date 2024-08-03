import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxLength:15,
      },
    lastname: {
        type: String,
        required: true,
        maxLength:15,
      },
    email:{
        type:String,
        required:true,
        minLength:4,
    },
    password:{
        type:String,
        required:true,
        minLength:5,
    },
    userPic:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'uploads.files', //ref to gridfs collection 
    },
    friends:{
        type: Array,
        default:[]
    },
    location:String,
    occupation: String,
    },   
    {timestamps:true}
);

const User = mongoose.model('User', UserSchema);
export default User;