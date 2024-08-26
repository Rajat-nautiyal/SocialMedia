import express from 'express'
import { getAllFeeds, getUserPosts, postLike, pushComment, deleteComment} from '../controller/post.js'
import authUser from '../middleware/authorization.js';

const router = express.Router();

//get posts
router.get('/', getAllFeeds);
//get a particular user posts
router.get('/:userId' , getUserPosts);
// post like
router.patch('/like/:id',authUser, postLike)
//push comments
router.patch('/add/comment/:id',authUser, pushComment)
//delete comments
router.patch('/delete/comment/:id', authUser,deleteComment)

export default router;