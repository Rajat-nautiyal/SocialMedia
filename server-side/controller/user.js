import Post from '../models/post.js';
import User from "../models/user.js";
import { gfs, gridfsBucket} from '../db/connectToMongo.js'
import GridFsFile from '../models/gridfs.js';
import mongoose from 'mongoose';
import Notify from '../models/notify.js';

export const getUsers = async(req,res)=>{
    try{
        const users = await User.find({},{password : 0});
        res.status(200).json(users);
    }catch(err){
        res.status(409).json({message:err.message})
    }
}
export const getUserFriends = async (req, res) => {
    try {
      const userId = req.params.id;
      
      // Check if userId is a valid ObjectId(without it ->err:cast to objectId)
      let user = mongoose.Types.ObjectId.isValid(userId)
        ? await User.findById(userId, { password: 0, email: 0 })
        : null;
        
      if (!user) {
        // finding user by first name(for search),here userId is name
        let searchUser = await User.findOne({ firstname: { $regex : new RegExp(userId, "i") } }, { password: 0, email: 0 });
        //Regex, used for case-insenstivity(eg-rajat or Rajat)
        if (!searchUser) {
          // finding user by full name
          const [firstname, lastname] = userId.split(' ');      
          if (firstname && lastname) {
            searchUser = await User.findOne({
                          firstname: { $regex : new RegExp(firstname, "i") },
                          lastname: { $regex : new RegExp(lastname, "i") }}, 
                          { password: 0, email: 0 }
                        );
          }
        }
        if (!searchUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        user = searchUser;
      } 
      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      
      const friendsData = friends.map(({ _id, firstname, lastname, userPic, location, occupation }) => {
        return { _id, firstname, lastname, userPic, location, occupation };
      });
      
      res.status(201).json({ user, friendsData });
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  };
  
export const addRemoveFriend =async(req,res)=>{
  try {
    const { id, friendId } = req.params;
    
    // Prevent adding/removing self
    if (id === friendId) {
        return res.status(400).json({ message: "You cannot add yourself as a friend." });
    }
    
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

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

        const notification = await Notify.create({
            userId: friend._id,
            actionId: user._id,
            postId: null,
            read: false,
            actionPic:user.userPic,
            notification: `${user.firstname} ${user.lastname} added you in a friend list`
        });

        await notification.save();
    }

    await user.save();
    await friend.save();

    // getting friend data
    const friends = await Promise.all(
        user.friends.map(friendId => User.findById(friendId))
    );

    const friendsData = friends.map(({ _id, firstname, lastname, userPic, location, occupation }) => ({
        _id, firstname, lastname, userPic, location, occupation,
    }));

    res.status(200).json({ message: `${user.firstname} added you in a friend list`, friendsData });

} catch (err) {
    console.error("Error adding/removing friend:", err);
    res.status(500).json({ message: 'Internal Server Error' });
}
}
