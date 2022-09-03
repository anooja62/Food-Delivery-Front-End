import React, { useEffect, useRef, useState } from "react";

import { useDispatch,useSelector } from "react-redux";
import {
  
  useParams,
} from "react-router-dom";


import {getSingleRestaurant} from "../../../store/shopping-cart/restaurantSlice";

const About = () => {

  let { id } = useParams();

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getSingleRestaurant(id));
  }, [])

  const singleRestaurant = useSelector((state) => state.restaurant.singleRestaurent);

  return (
    <>
      
      <p className="text-muted">{singleRestaurant.about}</p>
      
    </>
  );
};
export default About