require('dotenv').config();

module.exports={
    MONGODB_URI:process.env.MONGODB_URI,
    PORT:process.env.PORT,
    JWT_SECRET:process.env.JWT_SECRET,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
}