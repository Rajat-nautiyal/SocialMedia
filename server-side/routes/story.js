import express from 'express'
import { getStories} from '../controller/story.js'
import authUser from '../middleware/authorization.js';

const router = express.Router();

//get posts
router.get('/', getStories);

export default router;