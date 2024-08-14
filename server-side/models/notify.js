import mongoose from "mongoose";

const notifySchema = new mongoose.Schema({
    userId:String,
    actionId: {
       type: mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post',
     },
    notification: String,
    actionPic:String,
    read:Boolean,
},
{timestamps:true}
)

const Notify = mongoose.model("Notify", notifySchema)
export default Notify;