import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImagesStart, fetchImagesSuccess, fetchImagesFailure } from '../../redux/imageSlice';
import axios from 'axios';
import ImageUpload from '../imageUpload/ImageUpload';
import { useNavigate } from 'react-router-dom';

const ImageGallery = () => {
    const dispatch = useDispatch();
    const images = useSelector((state) => state.images.images);
    const loading = useSelector((state) => state.images.loading);
    const error = useSelector((state) => state.images.error);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchImages = async () => {
        dispatch(fetchImagesStart());
        try {
            const response = await axios.get(`${apiUrl}/api/images/`);
            dispatch(fetchImagesSuccess(response.data));
            console.log(response.data);
        } catch (err) {
            dispatch(fetchImagesFailure(err.message));
        }
    };

    const handleImageClick = async (image) => {
        setSelectedImage(image); // Open the image in modal

        try {
            const response = await axios.put(`${apiUrl}/api/images/${image._id}/views`);


            const updatedImage = response.data.image;
            setSelectedImage((prevImage) => ({
                ...prevImage,
                viewCount: updatedImage.viewCount
            }));


            dispatch(fetchImagesSuccess(
                images.map((img) => img._id === updatedImage._id ? updatedImage : img)
            ))

        } catch (err) {
            console.error('Failed to update view count', err);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };


    useEffect(() => {
        fetchImages();
    }, [dispatch]);


    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="flex flex-col justify-center items-center p-4 bg-gray-100 min-h-screen">
            <div className='xl:h-[200px] h-full flex relative flex-col md:flex-row md:items-center'>
                <ImageUpload />
                {!isAuthenticated && (
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded absolute top-0 right-4 md:top-4 md:right-4"
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full max-w-6xl">
                {images.map((image) => (
                    <div key={image._id} className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition duration-200 hover:shadow-lg" onClick={() => handleImageClick(image)}>
                        <h3 className="text-lg font-semibold text-gray-800">{image.title}</h3>
                        <img
                            src={image.imageUrl}
                            alt={image.title}
                            className="w-full h-48 object-cover rounded mt-2"
                        />
                        <p className="text-gray-600 mt-2">{image.description}</p>
                        <p className="text-gray-500 mt-1">Views: {image.viewCount}</p>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white xl:h-[90vh] h-[70vh] flex flex-col justify-center p-4 rounded-lg shadow-lg relative max-w-4xl md:w-full sm:w-[650px] w-[350px]">
                        <button
                            className="absolute top-2 right-2 text-gray-700 text-xl"
                            onClick={() => setSelectedImage(null)}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">{selectedImage.title}</h2>
                        <img
                            src={selectedImage.imageUrl}
                            alt={selectedImage.title}
                            className="w-full lg:h-[70vh] h-[50vh] object-contain "
                        />
                        <p className="text-gray-600 mt-4">{selectedImage.description}</p>
                        <p className="text-gray-500 mt-1">Views: {selectedImage.viewCount}</p>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ImageGallery;
