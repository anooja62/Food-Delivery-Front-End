import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import restaurantSlice from "./shopping-cart/restaurantSlice";
import deliverySlice from "./shopping-cart/deliverySlice";
import reviewSlice from "./shopping-cart/reviewSlice";
import userSlice from "./shopping-cart/userSlice";
import addressSlice from "./shopping-cart/addressSlice";
import menuSlice from "./shopping-cart/menuSlice";
import comboSlice from "./shopping-cart/comboSlice";


const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    restaurant: restaurantSlice.reducer,
    deliveryboy: deliverySlice.reducer,
    foodreview: reviewSlice.reducer,
    user: userSlice.reducer,
    shipping: addressSlice.reducer,
    menu:menuSlice.reducer,
    combo:comboSlice.reducer,
   


  },
});

export default store;
