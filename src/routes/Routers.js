import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import AllFoods from "../Pages/AllFoods";
import FoodDetails from "../Pages/FoodDetails";
import Cart from "../Pages/Cart";
import Checkout from "../Pages/Checkout";
import Restaurant from "../Pages/Restaurant";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Profile from "../Pages/Profile";

import Orders from "../Pages/Orders";
import Admin from "../Pages/Admin";
import RestaurantRegister from "../Pages/RestaurantRegister";
import Restaurantpage from "../Components/Restaurants/Restaurantspage";
import RestaurantUI from "../Components/Restaurants/RestaurantUI";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/restaurant" element={<Restaurant />} />
    
      <Route path="/orders" element={<Orders />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/restaurantregister" element={<RestaurantRegister />} />
      <Route path="/ordernow" element={<Restaurantpage />} />
      <Route path="/ui" element={<RestaurantUI />} />
    </Routes>
  );
}

export default Routers;
