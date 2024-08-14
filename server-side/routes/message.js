import express from 'express'
import {getMessages, getLastMessages} from '../controller/message.js'

const router = express.Router();

router.get('/:id/:friendId',getMessages);
router.get('/:id',getLastMessages);


export default router;