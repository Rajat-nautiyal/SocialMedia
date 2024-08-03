import { gfs, gridfsBucket} from '../db/connectToMongo.js'
import mongoose from 'mongoose';

export const streamFile =async(req,res)=>{
    try{    
            const fileData = await gfs.files.findOne({filename:req.params.filename});
            
            // console.log(fileData)
            const readStream = gridfsBucket.openDownloadStream(fileData._id);
            readStream.pipe(res);
        }catch(error){
            res.status(500).json({message:'error retrieving file', error: error.message})
            console.log(error)
        }
    }

export const streamFileId =async(req,res)=>{
    try{    
        const fileId = new mongoose.Types.ObjectId(req.params.id); //without converting id to object(id)
        const fileData = await gfs.files.findOne({_id:fileId});   //fileData would give null
        const readStream = gridfsBucket.openDownloadStream(fileData._id);
        readStream.pipe(res);
    }catch(error){
        res.status(500).json({message:'error retrieving file', error: error.message})
        console.log(error)
    }
}
    