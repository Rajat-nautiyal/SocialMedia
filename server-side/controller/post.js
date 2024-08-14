import Post from '../models/post.js';
import User from "../models/user.js";
import { gfs, gridfsBucket} from '../db/connectToMongo.js'
import GridFsFile from '../models/gridfs.js'; //without it -> error occurs(grid uploads schema not defined)
import mongoose from 'mongoose';
import Notify from '../models/notify.js';

export const createPost = async(req,res)=>{
    try{
        const {userId, description, fullname} = req.body;
        const pictureId = req.file? req.file.id: null;

        const newPost = new Post({
            userId:userId,
            fullname: fullname,
            story: false,
            postPicturePath: pictureId,
            description:description,
            likes:{},
            comments:[],
        });
        const savePost = await newPost.save();
        res.status(201).json({post:savePost});
    }catch(err){
        res.status(409).json({message:err.message})
    }
}

export const createStory = async(req,res)=>{
    try{
        const {userId, postPicturePath, description} = req.body;
        const user = await User.findOne(userId);
        const pictureId = req.file? req.file.id: null;

        const newPost = new Post({
            userId:userId,
            fullname: user.firstname + user.lastname,
            story: true,
            postPicturePath: pictureId,
            description:description,
            likes:null,
            comments:[]
        });
        const savePost = await newPost.save();
        res.status(201).json(savePost);
    }catch(err){
        res.status(409).json({message:err.message})
    }
}
export const getAllFeeds = async(req,res)=>{
    try{
        // const posts = await Post.find().populate('postPicturePath comments.userId');
        const posts = await Post.find()
        .populate({path: 'postPicturePath'})
        .populate({
            path: 'userId',
            select: 'firstname lastname location occupation userPic'
        })
        .populate({
                path: 'comments.userId',
                select: 'firstname lastname userPic _id'
        }).sort({ createdAt:-1 });

        res.status(200).json(posts);
       }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const getUserPosts = async(req,res)=>{
    try{
        const userId = req.params.userId;
        // const id = new mongoose.Types.ObjectId(userId)
        console.log(userId)
        const userPosts = await Post.find({userId:userId})  
        .populate({path: 'postPicturePath'})
        .populate({
            path: 'userId',
            select: 'firstname lastname location occupation userPic'
        })
        .populate({
                path: 'comments.userId',
                select: 'firstname lastname userPic _id'
        }).sort({ createdAt: 1 });
        console.log(userPosts)
        res.status(200).json(userPosts);
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const postLike = async(req,res)=>{
    try{
        const id = req.params.id; //post id
        const {userId} = req.body;  //user id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = await Post.findById(id)
        .populate({path: 'postPicturePath'})
        .populate({
            path: 'userId',
            select: 'userPic'
        })
        .populate({
                path: 'comments.userId',
                select: 'firstname lastname userPic _id'
        }).sort({ createdAt: 1 });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // console.log(id)
        // console.log(post._id)

        const isLiked = post.likes.get(userId);
        if(isLiked){
            post.likes.delete(userId)
            await post.save();
            res.status(200).json({post:post});
        }else{
            post.likes.set(userId,true)        
            const notification = await Notify.create({
                        userId: post.userId._id,
                        actionId:userId,
                        postId:id,
                        read:false,
                        notification:`${user.firstname} ${user.lastname} has liked on your post`,
                        actionPic:user.userPic
            })
            console.log(notification)
            await notification.save();
            await post.save();
            res.status(200).json({message:`${user.firstname} liked your Post`,post});
        }
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const pushComment = async(req,res)=>{
    try{
        const id = req.params.id; //post id
        const {userId, comment} = req.body;  //user id & comment
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newComment = {
            userId: userId,
            comment: comment,
        };

        const post = await Post.findByIdAndUpdate(
                            id,
                            {$push:{comments:newComment}},
                            { new: true, useFindAndModify: false } // new returns updated data
                    ).populate({path: 'postPicturePath'})
                    .populate({
                        path: 'userId',
                        select: 'userPic'
                    })
                     .populate({
                             path: 'comments.userId',
                             select: 'firstname lastname userPic _id'
                    });

        const notification = await Notify.create({
                        userId: post.userId._id,
                        actionId:userId,
                        postId:id,
                        read:false,
                        notification:`${user.firstname} ${user.lastname} added a comment on your post`,
                        actionPic:user.userPic
                    })
        await notification.save();
        res.status(201).json({message:`${user.firstname} added a comment on your post`,post})
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const deleteComment = async(req,res)=>{
    try{
        const id = req.params.id; //post id
        const {commentId} = req.body; //comment
        let commId = new mongoose.Types.ObjectId(commentId) 
        const post = await Post.findByIdAndUpdate(
                            id,
                            {$pull:{comments:{ _id: commId }}},
                            { new: true} // new returns updated data
                        ).populate({path: 'postPicturePath'})
                        .populate({
                            path: 'userId',
                            select: 'userPic'
                        })
                        .populate({
                                path: 'comments.userId',
                                select: 'firstname lastname userPic _id'
                        });
                        console.log(post)
        res.status(201).json({post})
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

