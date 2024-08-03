import mongoose from "mongoose";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

export const sendMessage =async(req,res)=>{
    const friendId = req.params.id;
    const {message, userId, file} = req.body;
    let fileId = null

    if(req.file){
        fileData = req.file.id
    }
    const userConversation = await Conversation.findOne({
        participants:{ $all:[friendId,userId] }
    })
    if(!userConversation){
        userConversation = await Conversation.create({
            participants: [friendId, userId],
        });
    }
    const newMessage = new Message({
        senderId:userId,
        receiverId:friendId,
        message: message,
        file: fileId,
        createdAt:Date.now,
    })
    if (newMessage) {
        userConversation.messages.push(newMessage._id);
    }
    await Promise.all([userConversation.save(), newMessage.save()]);
    //socket real-time chat code will be here
}

export const getMessages =async(req, res)=>{
    try{
        const {id, friendId} = req.params;
        const userConversation = await Conversation.findOne({
            participants: { $all: [id, friendId] },
        }).populate("messages");
    
        if (!userConversation) return res.status(200).json([]);
    
        const messages = userConversation.messages.populate('uploads.files');
        res.status(200).json(messages);    
    }catch(err){
        res.status(500).json({message:err.message});    
    }
}