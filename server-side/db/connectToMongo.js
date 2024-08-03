import mongoose from "mongoose";
import { GridFsStorage } from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';

let gfs;
let storage;
let gridfsBucket;

export const connectToDb = async()=>{
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    
        const conn = mongoose.connection;
        conn.once('open', () => {
            gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: 'uploads',
            });    
            gfs = Grid(conn.db, mongoose.mongo);
            gfs.collection('uploads');
            console.log('gridfs is initialized');
        })

         storage = new GridFsStorage({
            url: process.env.MONGO_URL,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    if (!file) {
                        reject('error');
                    }
                    const timestamp = Date.now();
                    const filename = `${timestamp}`+ file.originalname;
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'uploads',
                    };
                    resolve(fileInfo);
                });
            }
        });

    }
    catch(err) {
        console.error('Error connecting to MongoDB', err);
    };
}

export { gfs, storage, gridfsBucket };