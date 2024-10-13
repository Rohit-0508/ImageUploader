import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        isAuthenticated: false,
    },
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
