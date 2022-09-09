import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const addCart = createAsyncThunk("cart/add-cart", async (cart) => {
  const response = await axios.post("cart/add-cart", cart);
  return response.data;
});

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
  dbUpdated: false,
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
    },
    [addCart.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.cartItems.find(
        (item) => item.id !== newItem.id
      );
      state.totalQuantity++;
      state.dbUpdated = false;
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
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item._id !== id);
      } else {
        existingItem.quantity--;

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
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    deleteItem(state, action) {
      const id = action.payload;
      console.log(id, "dfdsfdsfdsf");
      const existingItem = state.cartItems.find((item) => item._id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item._id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
