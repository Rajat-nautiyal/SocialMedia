import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    story: Boolean,
    fullname:{
        type: String,
        required: true,
    },
    likes:{
        type: Map,
        of: Boolean
    },
    description: String,
    postPicturePath:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'uploads.files' //ref to gridfs collection
    },
    comments:[
        {
            comment:String,
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'User'
            },        
        }
    ]
},{timestamps:true}
)

const Post = mongoose.model('Post', postSchema);
export default Post;