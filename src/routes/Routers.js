/** @format */

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import Checkout from "../Pages/Checkout";
import Restaurant from "../Pages/Restaurant";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Profile from "../Pages/Profile";
import Orders from "../Pages/Orders";
import Admin from "../Pages/Admin";
import RestaurantRegister from "../Pages/RestaurantRegister";
import Restaurantspage from "../Components/Restaurants/Restaurantspage";
import RestaurantUI from "../Components/Restaurants/RestaurantUI";
import ForgotPassword from "../Pages/ForgotPassword";
import NewSubmit from "../Components/NewSubmit/NewSubmit";
import Restaurantsdashboard from "../Components/Restaurants/Restaurantsdashboard";
import DeliveryStaff from "../Components/DeliveryStaff/DeliveryStaff";
import ComboUI from "../Components/Restaurants/Combo/ComboUI";
import RestaurantLogin from "../Pages/RestaurantLogin";
import DeliveryboyLogin from "../Pages/DeliveryboyLogin";
import PaymentSuccess from "../Pages/PaymentSuccess";

function Routers() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />

      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/login' element={<Login data-testid='child' />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/register' element={<Register />} />
      <Route path='/restaurant' element={<Restaurant />} />

      <Route path='/orders' element={<Orders />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/restaurantregister' element={<RestaurantRegister />} />
      <Route path='/ordernow' element={<Restaurantspage />} />
      <Route path='/ui/:id' element={<RestaurantUI />} />
      <Route path='/forgot' element={<ForgotPassword />} />
      <Route path='/newsubmit' element={<NewSubmit />} />
      <Route path='/admin-res' element={<Restaurantsdashboard />} />
      <Route path='/admin-staff' element={<DeliveryStaff />} />
      <Route path='/combo' element={<ComboUI />} />
      <Route path='/res-login' element={<RestaurantLogin />} />
      <Route path='/delivery-login' element={<DeliveryboyLogin />} />
      <Route path='/success' element={<PaymentSuccess />} />
    </Routes>
  );
}

export default Routers;
