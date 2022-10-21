import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
    name: 'status',
    initialState: {
        token: ''
    },
    reducers: {
        setToken(state, action){
            state.token = action.payload;
        },
        defaultToken(state, action) {
            state.token = ''
        }
    }
});

export const statusActions = statusSlice.actions;

export default statusSlice;