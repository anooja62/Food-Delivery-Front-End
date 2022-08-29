import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const getRestaurants = createAsyncThunk(
  "rest/allRestaurants",
  async () => {
    const response = await axios.get(`/rest/all-restaurent`);
    return response.data;
  }
);
export const getRestaurantdetails = createAsyncThunk(
  `rest/allRestaurants`,
  async (id) => {
    const response = await axios.get(`/rest/res-details${id}`);
    return response.data;
  }
);
export const rejectRestaurant = createAsyncThunk(
  "rest/allRestaurants",
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
    [getRestaurantdetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getRestaurantdetails.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getRestaurantdetails.rejected]: (state, action) => {
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
