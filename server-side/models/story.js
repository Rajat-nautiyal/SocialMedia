import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    description: String,
    postPicturePath:String,

},{timestamps:true}
)
storySchema.index({createdAt: 1},{expireAfterSeconds: 86400});

const Story = mongoose.model('Story', storySchema);
export default Story;