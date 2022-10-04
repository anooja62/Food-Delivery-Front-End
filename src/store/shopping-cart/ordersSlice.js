import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";



export const userOrder = createAsyncThunk(`order/get-order`, async (id) => {
  const response = await axios.get(`order/get-order/${id}`);
  return response.data;
});



const initialState = {
    status:"",
  orderItems: [],

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
     state.orderItems=payload
    },
    [userOrder.rejected]: (state, action) => {
      state.status = "failed";
    },
   
  },

});

export const orderActions = orderSlice.actions;
export default orderSlice;
