import mongoose from 'mongoose';

const gridFsFileSchema = new mongoose.Schema({}, { strict: false });
const GridFsFile = mongoose.model('uploads.files', gridFsFileSchema);

export default GridFsFile;
