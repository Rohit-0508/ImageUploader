import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
    name: 'images',
    initialState: {
        images: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchImagesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchImagesSuccess(state, action) {
            state.loading = false;
            state.images = action.payload;
        },
        fetchImagesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addImage(state, action) {
            state.images.push(action.payload);
        },
    },
});

export const { fetchImagesStart, fetchImagesSuccess, fetchImagesFailure, addImage } = imageSlice.actions;
export default imageSlice.reducer;
