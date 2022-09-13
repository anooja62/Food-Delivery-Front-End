import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoodreviews } from "../../../store/shopping-cart/reviewSlice";
import { useParams } from "react-router-dom";
const Review = ({ foodreview }) => {
    let { id } = useParams();
    
    const dispatch = useDispatch();
    dispatch(getFoodreviews(id));
  return (
    <>
      <p className="text-center">{foodreview.name}</p>
      <p className="text-center">{foodreview.description}</p>
    </>
  );
};
export default Review;
