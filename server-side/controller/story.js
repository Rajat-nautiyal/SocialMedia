import mongoose from "mongoose";
import Story from '../models/story.js'

export const getStories = async(req,res)=>{
    try{
        const story = await Story.find()
        .populate({
            path: 'userId',
            select: 'firstname lastname location occupation userPic'
        }).populate({
            path: 'postPicturePath',
        }).sort({ createdAt:-1 });

        res.status(200).json(story);
       }catch(err){
        res.status(404).json({message:err.message})
    }
}
export const createStory = async(req,res)=>{
    try{
        const {userId, description} = req.body;
        const newStory = new Story({
            userId:userId,
            postPicturePath: req.file? req.file.id:null,
            description:description?description:null,
        });
        const saveStory = await newStory.save();
        res.status(201).json(saveStory);

    }
    catch(err){
        res.status(501).json({message:err.message})
    }
}
