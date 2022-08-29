import React, { useRef, useState } from "react";

import { useDispatch } from "react-redux";

import { getRestaurantdetails } from "../../../store/shopping-cart/restaurantSlice";

const Details = ({ restaurant }) => {
  const dispatch = useDispatch();
  dispatch(getRestaurantdetails());

  return (
    <>
      <h2>{restaurant.name}</h2>
      <p className="text-muted">{restaurant.address}</p>
    </>
  );
};
export default Details;
