import express from 'express'
import { getStories} from '../controller/story.js'

const router = express.Router();

//get posts
router.get('/', getStories);

export default router;