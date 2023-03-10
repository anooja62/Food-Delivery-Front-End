/** @format */

import React, { useState, useEffect } from "react";
import "./top.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { restaurantOrder } from "../../../store/shopping-cart/ordersSlice";

export default function Top({ orderCount }) {
  const [cookies, setCookie] = useCookies(null);

  const restaurantId = cookies.restaurantId;
  const restaurantName = cookies.restaurantName;
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.restaurantOrders);

  useEffect(() => {
    dispatch(restaurantOrder(restaurantId));
  }, []);

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return (
    <div className='topbar' style={{ backgroundColor: "white" }}>
      <div className='topbarWrapper'>
        <div className='topLeft'>
          <span className='logo'>{restaurantName}</span>
        </div>

        <div className='topRight'>
          <div className='dateTime' style={{ color: "black" }}>
            {currentDate}
          </div>
          <div className='topAvatar'>
            <Badge badgeContent={orderCount} color='error'>
              <NotificationsIcon fontSize='large' />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
