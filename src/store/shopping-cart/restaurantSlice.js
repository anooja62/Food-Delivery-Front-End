import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const getRestaurants = createAsyncThunk(
  "rest/allRestaurants",
  async () => {
    const response = await axios.get(`/rest/all-restaurent`);
    return response.data;
  }
);
export const getParsedRestaurants = createAsyncThunk(
  "rest/parsed-restaurent",
  async () => {
    const response = await axios.get(`/rest/parsed-restaurent`);
    return response.data;
  }
);
export const getRestaurantdetails = createAsyncThunk(
  `rest/getRestaurantdetails`,
  async (id) => {
    const response = await axios.get(`/rest/res-details/${id}`);
    return response.data;
  }
);
export const rejectRestaurant = createAsyncThunk(
  "rest/rejectRestaurant",
  async (id) => {
    const response = await axios.put(`/rest/reject/${id}`);
    return response.data;
  }
);
export const getSingleRestaurant = createAsyncThunk(
  `rest/getSingleRestaurant`,
  async (id) => {
    const response = await axios.get(`/rest/single-rest/${id}`);
    return response.data;
  }
);
export const getLocationRestaurant = createAsyncThunk(
  `rest/getLocationRestaurant`,
  async (address) => {
    const response = await axios.get(`/rest/search/${address}`);
    return response.data;
  }
);

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    list: [],
    location: [],
    parsedRestaurant: [],
    status: null,
    singleRestaurent: {},
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
    [getParsedRestaurants.pending]: (state, action) => {
      state.status = "loading";
    },
    [getParsedRestaurants.fulfilled]: (state, { payload }) => {
      state.parsedRestaurant = payload;
      state.status = "success";
    },
    [getParsedRestaurants.rejected]: (state, action) => {
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
    [getSingleRestaurant.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSingleRestaurant.fulfilled]: (state, { payload }) => {
      state.singleRestaurent = payload;
      state.status = "success";
    },
    [getSingleRestaurant.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getLocationRestaurant.pending]: (state, action) => {
      state.status = "loading";
    },
    [getLocationRestaurant.fulfilled]: (state, { payload }) => {
      state.location = payload;
      state.status = "success";
    },
    [getLocationRestaurant.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const restaurantActions = restaurantSlice.actions;
export default restaurantSlice;
