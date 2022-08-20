import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const getRestaurants = createAsyncThunk(
  "rest/allReataurants",
  async () => {
    const response = await axios.get(`/rest/all-restaurent`);
    return response.data;
  }
);
export const rejectRestaurant = createAsyncThunk(
  "rest/allReataurants",
  async (id) => {
    const response = await axios.put(`/rest/reject/${id}`);
    return response.data;
  }
);

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getRestaurants.pending]: (state, action) => {
      state.status = "loading";
    },
    [getRestaurants.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getRestaurants.rejected]: (state, action) => {
      state.status = "failed";
    },
    [rejectRestaurant.pending]: (state, action) => {
      state.status = "loading";
    },
    [rejectRestaurant.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [rejectRestaurant.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const restaurantActions = restaurantSlice.actions;
export default restaurantSlice;
