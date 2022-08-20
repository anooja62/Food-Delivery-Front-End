import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const getUsers = createAsyncThunk(
    "auth/allUsers",
    async (id) => {
        const response = await axios.get(`/auth/all-user`);
        return response.data;
    }
);
export const blockUser = createAsyncThunk(
    "auth/allUsers",
    async (id) => {
        const response = await axios.put(`/auth/block/${id}`);
        return response.data;
    }
);
const userSlice = createSlice({
    name: "users",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.status = "loading";
        },
        [getUsers.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = "success";
        },
        [getUsers.rejected]: (state, action) => {
            state.status = "failed";
        },
        [blockUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [blockUser.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = "success";
        },
        [blockUser.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice;
