import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		read:{
			type:Boolean,
			default:false
		},
        file:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "uploads.files",
            default:null   
        },
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;