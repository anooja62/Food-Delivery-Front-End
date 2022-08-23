import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const getShippings = createAsyncThunk("addr/allShippings", async () => {
  const response = await axios.get(`/addr/all-addresses`);
  return response.data;
});
export const deleteShipping = createAsyncThunk(
  "addr/allShippings",
  async (id) => {
    const response = await axios.put(`/addr/deleted/${id}`);
    return response
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getShippings.pending]: (state, action) => {
      state.status = "loading";
    },
    [getShippings.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getShippings.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteShipping.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteShipping.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [deleteShipping.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const addressActions = addressSlice.actions;
export default addressSlice;
