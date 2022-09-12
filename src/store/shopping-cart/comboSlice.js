import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const getCombos = createAsyncThunk(
  "comb/allCombos",
  async (id) => {
    const response = await axios.get(`/comb/all-combo/${id}`);
    return response.data;
  }
);
export const addCombo = createAsyncThunk("comb/add-combo", async (combo) => {
  const response = await axios.post("comb/add-combo",combo);

  return response.data;
});
export const deleteCombo = createAsyncThunk(
  "comb/allCombos",
  async (id) => {
    const response = await axios.put(`/comb/Delete/${id}`);
    return response.data;
  }
);

const comboSlice = createSlice({
  name: "combos",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getCombos.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCombos.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getCombos.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteCombo.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteCombo.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [deleteCombo.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const comboActions = comboSlice.actions;
export default comboSlice;
