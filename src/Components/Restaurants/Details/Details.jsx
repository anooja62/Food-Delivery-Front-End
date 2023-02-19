import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
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
      <h2>{singleRestaurant.name}</h2> <Box component="fieldset" mb={2} borderColor="transparent">
        <Rating name="read-only" value={rating} readOnly /> 
      </Box>
      <p className="text-muted"> {singleRestaurant.address}</p>
     
     
    </>
  );
};
export default Details;
