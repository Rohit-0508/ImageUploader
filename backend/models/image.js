const mongoose= require('mongoose');

const imageSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    viewCount:{
        type:Number,
        default: 0,
    },
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
});

const Image= mongoose.model('Image',imageSchema);

module.exports = Image;