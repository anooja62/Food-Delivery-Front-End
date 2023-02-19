/** @format */

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { getSingleRestaurant } from "../../../store/shopping-cart/restaurantSlice";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
const Details = () => {
  let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleRestaurant(id));
  }, []);

  const singleRestaurant = useSelector(
    (state) => state.restaurant.singleRestaurent
  );
  const getRating = (sentimentScore) => {
    if (sentimentScore >= 10) {
      return 5;
    } else if (sentimentScore >= 6) {
      return 4;
    } else if (sentimentScore >= 4) {
      return 3;
    } else if (sentimentScore >= 2) {
      return 2;
    } else {
      return 1;
    }
  };

  const rating = getRating(singleRestaurant.sentimentScore);
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ margin: "0 10px" }}>{singleRestaurant.name}</h2>
        <Box
          component='fieldset'
          borderColor='transparent'
          style={{ alignItems: "center" }}
        >
          <Rating name='read-only' value={rating} readOnly />
        </Box>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
        <p className='text-muted' style={{ marginRight: "10px" }}>
          FSSAI NO.
        </p>
        <p style={{ fontWeight: 600, marginRight: "10px" }}>
          {singleRestaurant.license}
        </p>
        <p className='text-muted' style={{ marginRight: "10px" }}>
          PHONE :
        </p>
        <p style={{ fontWeight: 600, marginRight: "10px" }}>
          {singleRestaurant.phone}
        </p>
        <p className='text-muted' style={{ marginRight: "10px" }}>
          EMAIL :
        </p>
        <p style={{ fontWeight: 600 }}>{singleRestaurant.email}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FmdGoodIcon />
        <p className='text-muted' style={{ margin: "0 10px" }}>
          {singleRestaurant.address}
        </p>
      </div>
    </>
  );
};
export default Details;
