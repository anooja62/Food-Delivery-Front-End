import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSingleRestaurant } from "../../../store/shopping-cart/restaurantSlice";

const Details = () => {
  let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleRestaurant(id));
  }, []);

  const singleRestaurant = useSelector(
    (state) => state.restaurant.singleRestaurent
  );

  return (
    <>
      <h2>{singleRestaurant.name}</h2>
      <p className="text-muted">{singleRestaurant.address}</p>
    </>
  );
};
export default Details;
