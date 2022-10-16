import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const userOrder = createAsyncThunk(`order/get-order`, async (id) => {
  const response = await axios.get(`order/get-order/${id}`);
  return response.data;
});
export const restaurantOrder = createAsyncThunk(
  `order/get-resturant-order`,
  async (id) => {
    const response = await axios.get(`order/get-resturant-order/${id}`);
    return response.data;
  }
);
export const orderReady = createAsyncThunk(
  `order/order-ready`,
  async (data) => {
    const response = await axios.put(`order/order-ready`, data);
    return response.data;
  }
);

const initialState = {
  status: "",
  orderItems: [],
  restaurantOrders: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  extraReducers: {
    [userOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [userOrder.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orderItems = payload;
    },
    [userOrder.rejected]: (state, action) => {
      state.status = "failed";
    },
    [restaurantOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [restaurantOrder.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.restaurantOrders = payload;
    },
    [restaurantOrder.rejected]: (state, action) => {
      state.status = "failed";
    },
    [orderReady.pending]: (state, action) => {
      state.status = "loading";
    },
    [orderReady.fulfilled]: (state, { payload }) => {
      state.restaurantOrders = payload;
      state.status = "success";
    },
    [orderReady.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
