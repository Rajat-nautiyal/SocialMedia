import mongoose from "mongoose";
import Notify from "../models/notify.js";
import User from "../models/user.js"

export const getNotification =async(req, res)=>{
    try{
        const userId = req.params.id;
        console.log(`user id is`,userId);//best debug to solve error issue regards cast to object
        const notifications = await Notify.find({userId:userId})
                                    .populate({
                                        path: 'actionId',
                                        select: 'firstname lastname location occupation userPic _id'
                                    }).sort({createdAt:-1})
        res.status(200).json(notifications);
    }catch(err){
        res.status(409).json({message:err.message})
    }

}
export const updateNotifications =async(req, res)=>{
    try{
        const userId = req.params.id;
        console.log(`user id is`,userId);
        await Notify.updateMany({
                            userId:userId, 
                            read:false },
                            {$set:{read:true}
                        });
        // res.status(200).json(notifications);
    }catch(err){
        res.status(409).json({message:err.message})
    }

}