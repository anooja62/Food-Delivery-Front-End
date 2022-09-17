import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const getOrders = createAsyncThunk(
  `pay/get-orders`,
  async (id) => {
    const response = await axios.get(`/pay/get-orders/${id}`);
    return response.data;
  }
);
;

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getOrders.pending]: (state, action) => {
      state.status = "loading";
    },
    [getOrders.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getOrders.rejected]: (state, action) => {
      state.status = "failed";
    },
   
    
  },
});

export const paymentActions = paymentSlice.actions;
export default paymentSlice;
