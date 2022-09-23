import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const getFoodreviews = createAsyncThunk(
  `revi/allFoodreviews`,
  async (id) => {
    const response = await axios.get(`/revi/all-foodreview/${id}`);
    return response.data;
  }
);
export const addReview = createAsyncThunk("revi/review", async (review) => {
  const response = await axios.post("revi/review",review);

  return response.data;
});


const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [addReview.pending]: (state, action) => {
      state.status = "loading";
    },
    [addReview.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [addReview.rejected]: (state, action) => {
      state.status = "failed";
    },
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
    
  },
});

export const reviewActions = reviewSlice.actions;
export default reviewSlice;
