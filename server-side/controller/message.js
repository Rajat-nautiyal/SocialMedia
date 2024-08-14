import mongoose from "mongoose";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

export const sendMessage =async(req,res)=>{
    const friendId = req.params.id;
    // const friendId = new mongoose.Types.ObjectId(req.params.id)
    const {message, userId} = req.body;
    let fileId = null
    // console.log(message, userId)
    // console.log(friendId)
    if(req.file){
        fileData = req.file.id
    }
    let userConversation = await Conversation.findOne({
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
    })
    if (newMessage) {
        userConversation.messages.push(newMessage._id);
    }
    await Promise.all([userConversation.save(), newMessage.save()]);
    res.status(201).json({message:'message saved'})
    // socket real-time chat code will be here
    
}

export const getMessages =async(req, res)=>{
    try{
        const {id, friendId} = req.params;
        const userConversation = await Conversation.findOne({
            participants: { $all: [id, friendId] },
        }).populate("messages").sort({ createdAt: 1 });
    
        if (!userConversation) return res.status(200).json([]);
    
        // console.log(userConversation.messages.slice(-1)[0])
        const lastMessage = userConversation.messages.slice(-1)[0]
        const userId = new mongoose.Types.ObjectId(id)
        console.log(userId)
        console.log(lastMessage.receiverId)
        if(lastMessage.receiverId.equals(userId)){ //note:-condition
            await Message.updateOne({             //lastmessage.recievrId === userId 
                _id:lastMessage._id             //doesn't work in case of ObjectId    
            },
                {$set:{read:true}
            });
            console.log('updated')
        }

        res.status(200).json(userConversation);    
    }catch(err){
        res.status(500).json({message:err.message});    
    }
}

export const getLastMessages =async(req, res)=>{
    try{
        const {id} = req.params;
        const userConversation = await Conversation.find({
            participants: { $all: [id] },
        })
        .populate("messages").sort({ createdAt: 1 });
    
        if (!userConversation) return res.status(200).json([]);
        
        const lastMessages =userConversation.map((d)=>  d.messages.slice(-1)[0]);//slice returns [] but i need {}
        res.status(200).json(lastMessages);    
    }catch(err){
        res.status(500).json({message:err.message});    
    }
}