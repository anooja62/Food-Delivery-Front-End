import React from "react";
import { useDispatch } from "react-redux";
import { getFoodreviews } from "../../../store/shopping-cart/reviewSlice";
import { useParams } from "react-router-dom";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
const Review = ({ foodreview }) => {
    let { id } = useParams();
    
    const dispatch = useDispatch();
    dispatch(getFoodreviews(id));
  return (
    <>
    
     <span style={{fontWeight:600}}><VerifiedUserIcon fontSize="small"/> {foodreview.name}</span>
      
      <p>{foodreview.description}</p>
    </>
  );
};
export default Review;
