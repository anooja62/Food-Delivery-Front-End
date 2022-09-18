import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const getMessages = createAsyncThunk(
  "msg/allMessages",
  async () => {
    const response = await axios.get(`/msg/all-message`);
    return response.data;
  }
);

export const replyMessage = createAsyncThunk(
  "msg/replymessage",
  async (id) => {
    const response = await axios.put(`/msg/reply/${id}`);
    return response.data;
  }
);
export const getSingleMessage = createAsyncThunk(
  `msg/getSingleMessage`,
  async (id) => {
    const response = await axios.get(`/msg/single-msg/${id}`);
    return response.data;
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    list: [],
    status: null,
    singleMessage:{}
  },
  extraReducers: {
    [getMessages.pending]: (state, action) => {
      state.status = "loading";
    },
    [getMessages.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getMessages.rejected]: (state, action) => {
      state.status = "failed";
    },
   
    [replyMessage.pending]: (state, action) => {
      state.status = "loading";
    },
    [replyMessage.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [replyMessage.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getSingleMessage.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSingleMessage.fulfilled]: (state, { payload }) => {
      state.singleMessage = payload;
      state.status = "success";
    },
    [getSingleMessage.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const messageActions = messageSlice.actions;
export default messageSlice;
