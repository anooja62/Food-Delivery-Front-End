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
export const deliveryOrder = createAsyncThunk(
  `order/get-delivery-order`,
  async (id) => {
    const response = await axios.get(`order/get-delivery-order/${id}`);
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
export const outForDelivery = createAsyncThunk(
  `order/out-for-delivery`,
  async (data) => {
    const response = await axios.put(`order/out-for-delivery`, data);
    return response.data;
  }
);
export const deliveredOrder = createAsyncThunk(
  `order/delivered-order`,
  async (id) => {
    const response = await axios.get(`order/delivered-order`);
    return response.data;
  }
);
export const makeDeliverd = createAsyncThunk(
  `order/delivered`,
  async (data) => {
    const response = await axios.put(`order/delivered`,data);
    return response.data;
  }
);
const initialState = {
  status: "",
  orderItems: [],
  restaurantOrders: [],
  deliveryOrder: [],
  deliveredOrders:[]
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
    [deliveryOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [deliveryOrder.fulfilled]: (state, { payload }) => {
      state.deliveryOrder = payload;
      state.status = "success";
    },
    [deliveryOrder.rejected]: (state, action) => {
      state.status = "failed";
    },
    [outForDelivery.pending]: (state, action) => {
      state.status = "loading";
    },
    [outForDelivery.fulfilled]: (state, { payload }) => {
      state.deliveryOrder = payload;
      state.status = "success";
    },
    [outForDelivery.rejected]: (state, action) => {
      state.status = "failed";
    },
      [deliveredOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [deliveredOrder.fulfilled]: (state, { payload }) => {
      state.deliveredOrders = payload;
      state.status = "success";
    },
    [deliveredOrder.rejected]: (state, action) => {
      state.status = "failed";
    },
    [makeDeliverd.pending]: (state, action) => {
      state.status = "loading";
    },
    [makeDeliverd.fulfilled]: (state, { payload }) => {
      state.deliveredOrders = payload;
      state.status = "success";
    },
    [makeDeliverd.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
