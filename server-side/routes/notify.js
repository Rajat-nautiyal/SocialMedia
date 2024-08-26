import express from 'express'
import authUser from '../middleware/authorization.js';
import {getNotification,updateNotifications} from '../controller/notify.js'

const router = express.Router();

//get notifications
router.get('/:id', getNotification) // user Id

router.patch('/update/:id',authUser, updateNotifications) // user Id

export default router;