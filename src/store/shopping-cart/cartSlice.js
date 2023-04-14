import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const addCart = createAsyncThunk("cart/add-cart", async (cart) => {
  const response = await axios.post("cart/add-cart", cart);
  return response.data;
});

export const userCart = createAsyncThunk(`cart/get-cart`, async (id) => {
  const response = await axios.get(`cart/get-cart/${id}`);
  return response.data;
});

export const addOrder = createAsyncThunk(`order/add-order`, async (id) => {
  const response = await axios.post(`order/add-order/${id}`);
  return response.data;
});

const initialState = {
  cartItems: [],
  cartItemsApi: [],
  totalQuantity: 0,
  totalAmount: 0,
  dbUpdated: false,
  apiCallRequired: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  extraReducers: {
    [addCart.pending]: (state, action) => {
      state.status = "loading";
      state.dbUpdated = true;
    },
    [addCart.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.dbUpdated = true;
      state.cartItemsApi = payload;
    },
    [addCart.rejected]: (state, action) => {
      state.status = "failed";
    },
    [userCart.pending]: (state, action) => {
      state.status = "loading";
      state.dbUpdated = true;
    },
    [userCart.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.dbUpdated = true;
      state.cartItems = payload;
    },
    [userCart.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addOrder.pending]: (state, action) => {
     
    },
    [addOrder.fulfilled]: (state, { payload }) => {
     
      // state.cartItemsApi = []
      // state.cartItems = []
    },
    [addOrder.rejected]: (state, action) => {
      
    },
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      console.log("first",existingItem)
      state.totalQuantity++;
      state.dbUpdated = false;
      state.apiCallRequired = true;
      if (!existingItem) {
        state.cartItems.push({
          _id: newItem._id,
          foodname: newItem.foodname,
          image: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }
      state.dbUpdated = false;
      state.apiCallRequired = true;
     
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === id);
      state.totalQuantity--;
      state.apiCallRequired = true;
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item._id !== id);
      } else {
        existingItem.quantity--;
        state.apiCallRequired = true;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    incrementItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === id);
      state.totalQuantity++;
      existingItem.quantity++;
      state.apiCallRequired = true;
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    calculations(state, action) {

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + Number(item.quantity),
        0
      );
    },
    deleteItem(state, action) {
      const id = action.payload;
  
      const existingItem = state.cartItems.find((item) => item._id === id);
      state.apiCallRequired = true;
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item._id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      
    },
    clearItem(state, action) {
      
       state.cartItemsApi = []
      state.cartItems = []
      state.apiCallRequired=  true
      state.totalAmount = 0
      state.totalQuantity = 0
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
