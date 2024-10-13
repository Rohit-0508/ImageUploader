const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware'); 
const {uploadImage, getImages, updateImageViews}=require('../controllers/imageController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/upload', verifyToken, upload.single('image'), uploadImage);

router.get('/', getImages);

router.put('/:id/views', updateImageViews);

module.exports = router;
