import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import {GridFSBucket,ObjectId} from 'mongodb'

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true, limit: '30mb'}))
app.use(cors({origin:'http://localhost:5173'}))

const mongoURI = "mongodb://127.0.0.1/TestDb"
const conn = mongoose.createConnection(mongoURI);

var gfs
conn.once('open', ()=>{                     //on opening mongodb
    gfs = Grid(conn.db , mongoose.mongo);   //init gridfs
    gfs.collection('uploads');              //db collection name is upload
    console.log('gridfs is initialized')
})

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file)=>{
        return new Promise((resolve, reject)=>{
            if(!file){
                reject('error')
            };
            const filename = file.originalname;
            const fileInfo={
                filename : filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        })
    }
})
const upload = multer({storage});

app.get('/',(req,res)=>{
    res.json('workin');
})
app.post('/upload',upload.single('file'),(req,res)=>{
    res.json({file:req.file});
})

app.get('/files', async (req, res) => {
    try{
        const files = await gfs.files.find().toArray();
        res.json({files});    
    }catch(err){
        console.log(e)
    }
});


app.get('/file/:filename',async (req,res)=>{
    const gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
    try{
           const file = await gfs.files.findOne({filename:req.params.filename});
            const readStream = gridfsBucket.openDownloadStream(file._id);
            readStream.pipe(res);
    }catch(error){
        res.status(500).json({message:'error retrieving file', error: error.message})
        console.log(error)
    }
})

app.listen(6001,()=>{
    console.log(`server connected`)
})
