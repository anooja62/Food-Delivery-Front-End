import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const getDeliveryboys = createAsyncThunk(
  "deli/allDeliveryboys",
  async () => {
    const response = await axios.get(`/deli/all-deliveryboy`);
    return response.data;
  }
);
export const rejectDeliveryboy = createAsyncThunk(
  "deli/allDeliveryboys",
  async (id) => {
    const response = await axios.put(`/deli/reject/${id}`);
    return response.data;
  }
);

const deliverySlice = createSlice({
  name: "deliveryboys",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getDeliveryboys.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDeliveryboys.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getDeliveryboys.rejected]: (state, action) => {
      state.status = "failed";
    },
    [rejectDeliveryboy.pending]: (state, action) => {
      state.status = "loading";
    },
    [rejectDeliveryboy.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [rejectDeliveryboy.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const deliveryboyActions = deliverySlice.actions;
export default deliverySlice;
