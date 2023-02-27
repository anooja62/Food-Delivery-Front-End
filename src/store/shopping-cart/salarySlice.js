/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const paySalary = createAsyncThunk(`salary/pay-salary`, async (id) => {
  const response = await axios.put(`/salary/pay-salary/${id}`);

  return response.data;
});
export const getSalaryDetails = createAsyncThunk(
  `salary/monthly-salary`,
  async (id) => {
    const response = await axios.get(`/salary/monthly-salary/${id}`);

    return response.data;
  }
);
const salarySlice = createSlice({
  name: "salary",
  initialState: {
    paysalarydetails: [],
    monthlysalarydetails: [],
    status: "",
  },
  extraReducers: {
    [paySalary.pending]: (state, action) => {
      state.status = "loading";
    },
    [paySalary.fulfilled]: (state, payload) => {

      state.paysalarydetails = payload.payload;
      state.status = "success";
    },
    [paySalary.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getSalaryDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSalaryDetails.fulfilled]: (state, payload) => {
      state.monthlysalarydetails = payload.payload;
      state.status = "success";
    },
    [getSalaryDetails.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const salaryActions = salarySlice.actions;
export default salarySlice;
