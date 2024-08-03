import Post from '../models/post.js';
import User from "../models/user.js";
import { gfs, gridfsBucket} from '../db/connectToMongo.js'
import GridFsFile from '../models/gridfs.js';

export const getUsers = async(req,res)=>{
    try{
        const users = await User.find({},{password : 0});
        res.status(200).json(users);
    }catch(err){
        res.status(409).json({message:err.message})
    }
}
export const getUserFriends = async(req,res)=>{
    try{
        const userId = req.params.id
        const user = await User.findById(userId,{password : 0, email:0});
        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        console.log(friends)
        const friendsData = friends.map(
            ({_id, firstname, lastname,userPic, location, occupation})=>{
                return {_id, firstname, lastname, userPic, location, occupation,}
            })
        res.status(201).json({user,friendsData});
    }catch(err){
        res.status(409).json({message:err.message})
    }
}

export const addRemoveFriend =async(req,res)=>{
    try{
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        let friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: 'User or Friend not found' });
        }

        const checkFriend = user.friends.includes(friendId);
        if (checkFriend) {
            user.friends.pull(friendId);
            friend.friends.pull(id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        console.log(friends)
        const friendsData = friends.map(
            ({_id, firstname, lastname,userPic, location, occupation})=>{
                return {_id, firstname, lastname, userPic, location, occupation,}
            })
            // console.log(`${friendDetails} func is running`)
            res.status(200).json({message:`${user.firstname} added you in a friendlist`, friendsData});
    }catch(err){
        res.status(409).json({message:err.message})
    }
}

