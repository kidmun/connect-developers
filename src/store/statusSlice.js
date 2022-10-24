import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
    name: 'status',
    initialState: {
        token: '',
        userId: ''
    },
    reducers: {
        setToken(state, action){
            state.token = action.payload;
        },
        defaultToken(state) {
            state.token = ''
        },
        setUserId(state, action) {
            state.userId = action.payload;
        },
        defaultUserId(state) {
            state.userId = ''
        }
    }
});

export const statusActions = statusSlice.actions;

export default statusSlice;