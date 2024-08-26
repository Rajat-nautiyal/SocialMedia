import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { getAuthUser, register } from './controller/auth.js';
import userRoutes from './routes/user.js';
import messageRoutes from './routes/message.js'
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js'
import storyRoutes from './routes/story.js'
import notifyRoutes from './routes/notify.js';
import authUser from './middleware/authorization.js';
import {createStory} from './controller/story.js'
import {createPost} from './controller/post.js'
import {connectToDb ,storage} from './db/connectToMongo.js'
import {setSocketIo} from './middleware/socket.js'
import { Server } from "socket.io";
import { createServer } from "http";
import {streamFile, streamFileId} from './middleware/stream.js'
import { sendMessage} from './controller/message.js'

const app = express();

app.use(cors({ origin: ['http://localhost:5173'],credentials: true } ));
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

dotenv.config();
// const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cookieParser());

connectToDb();
const upload = multer({ storage });
setSocketIo(io);
app.use('/users', userRoutes); // routes for users(add/remove friends , get all users)
app.use('/message', messageRoutes);// get messages
app.use('/auth', authRoutes);   //authentications
app.use('/post', postRoutes);   //posts activities(create, like, comment, get posts)
app.use('/notify', notifyRoutes);// get messages
app.use('/story', storyRoutes);

//stream files
app.get('/stream/:filename',streamFile)
app.get('/streamId/:id',streamFileId)

app.get('/auth/verify',authUser,getAuthUser) //persistent login

app.post('/auth/register', upload.single('picture'), register);
app.post('/post/createpost',authUser, upload.single('file'), createPost);
app.post('/message/send/:id',upload.single('file'),sendMessage); //friend id
app.post('/post/story',authUser, upload.single('image'), createStory);

const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
app.get('/', (req, res) => {
  res.json({message:'deployment working'});
});

=======
>>>>>>> d0416ec4e9b5193ecc4f783f4737461f23b2239d
server.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
});

export {io}
