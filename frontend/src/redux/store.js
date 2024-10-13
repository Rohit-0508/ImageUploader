import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import imageReducer from './imageSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        images: imageReducer,
    },
});

export default store;
