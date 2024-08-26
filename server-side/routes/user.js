import express from 'express'
import {getUsers,addRemoveFriend, getUserFriends} from '../controller/user.js'
import authUser from '../middleware/authorization.js';

const router = express.Router();

//get
router.get('/',authUser, getUsers); // get all users (basically for users page)
router.get('/:id', getUserFriends) // get specific user or friend page
//patch
router.patch('/add/:friendId/:id',authUser, addRemoveFriend); //add or remove friends
export default router; 