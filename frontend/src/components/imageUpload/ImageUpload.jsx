import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addImage } from '../../redux/imageSlice';
import axios from 'axios';

const ImageUpload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    // Access the token from the Redux store
    const token = useSelector((state) => state.user.token);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', file);

        try {
            const response = await axios.post(`${apiUrl}/api/images/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // Use the token from the Redux store
                },
            });
            dispatch(addImage(response.data.image));
            // Redirect or handle successful upload
        } catch (error) {
            if (error.status = 403) {
                alert('Please Login to upload a image');
            }
            console.error('Image upload failed', error);
        }
    };

    return (
        <div className="flex h-full justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl"> {/* Wider container */}
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Upload Image</h2>

                <form onSubmit={handleImageUpload} className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4"> {/* Flexbox for horizontal layout on larger screens */}
                    <div className="w-full md:w-1/3">
                        <label className="block text-gray-700" htmlFor="title">Image Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter image title"
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/3">
                        <label className="block text-gray-700" htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter image description"
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/3">
                        <label className="block text-gray-700" htmlFor="image">Select Image</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="mt-1 w-full border rounded p-2 cursor-pointer"
                            required
                        />
                    </div>
                    <div className="w-full md:w-auto mt-6">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 w-full md:w-auto"
                        >
                            Upload Image
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ImageUpload;
