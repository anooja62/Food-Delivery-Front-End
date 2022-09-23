import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const getMenus = createAsyncThunk(
  `food/allMenus`,
  async (id) => {
    const response = await axios.get(`/food/all-menu/${id}`);
    return response.data;
  }
);
export const addMenu = createAsyncThunk("food/add-menu", async (menu) => {
  const response = await axios.post("food/add-menu",menu);

  return response.data;
});
export const deleteMenu = createAsyncThunk(
  "food/allMenus",
  async (id) => {
    const response = await axios.put(`/food/Delete/${id}`);
    return response.data;
  }
);
export const getSingleMenu = createAsyncThunk(
  `food/getSingleMenu`,
  async (id) => {
    const response = await axios.get(`/food/single-menu/${id}`);
    return response.data;
  }
);
const menuSlice = createSlice({
  name: "menus",
  initialState: {
    list: [],
    status: null,
    singleMenu:{}
  },
  extraReducers: {
    [getMenus.pending]: (state, action) => {
      state.status = "loading";
    },
    [getMenus.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getMenus.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addMenu.pending]: (state, action) => {
      state.status = "loading";
    },
    [addMenu.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [addMenu.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteMenu.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteMenu.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [deleteMenu.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getSingleMenu.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSingleMenu.fulfilled]: (state, { payload }) => {
      state.singleMenu = payload;
      state.status = "success";
    },
    [getSingleMenu.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice;
