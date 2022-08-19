import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const getFoodreviews = createAsyncThunk(
  "revi/allFoodreviews",
  async () => {
    const response = await axios.get(`/revi/all-foodreview`);
    return response.data;
  }
);
export const approveFoodreview = createAsyncThunk(
  "revi/allFoodreviews",
  async (id) => {
    const response = await axios.put(`/revi/approve/${id}`);
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "restaurants",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getFoodreviews.pending]: (state, action) => {
      state.status = "loading";
    },
    [getFoodreviews.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getFoodreviews.rejected]: (state, action) => {
      state.status = "failed";
    },
    [approveFoodreview.pending]: (state, action) => {
      state.status = "loading";
    },
    [approveFoodreview.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [approveFoodreview.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const reviewActions = reviewSlice.actions;
export default reviewSlice;
