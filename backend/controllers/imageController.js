const Image= require('../models/image');
const {CLOUDINARY_URL}=require('../config/config');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    url: CLOUDINARY_URL,
});


exports.uploadImage = async (req, res) => {
    try {
        const { title, description } = req.body;
        const file = req.file.buffer; 

        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image' },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                stream.end(file); // Send the file buffer to Cloudinary
            });
        };

        const result = await uploadToCloudinary();

        const newImage = new Image({
            title,
            description,
            imageUrl: result.secure_url,
            viewCount: 0,
            uploadedBy: req.userId,
        });

        await newImage.save();
        res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Failed to upload image to Cloudinary', error });
    }
};


exports.getImages= async(req, res)=>{
    try{
        const images= await Image.find({});
        res.status(200).json(images);
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Failed to fetch images',error});
    }
};

exports.updateImageViews= async(req, res)=>{
    try{
        const {id}=req.params;
        const image = await Image.findById(id);

        if(!image){
            return res.status(404).json({message:'Image not found'});
        }

        image.viewCount +=1;
        await image.save();

        res.status(200).json({message:'Views count updated', image});
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Failed to update view count', error});
    }
};

