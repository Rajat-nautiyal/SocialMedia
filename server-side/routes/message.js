import express from 'express'
import {getMessages, sendMessage} from '../controller/message.js'

const router = express.Router();

router.get('/:id/:friendId',getMessages);

export default router;