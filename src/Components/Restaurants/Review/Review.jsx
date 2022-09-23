import React from "react";

import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
const Review = ({ foodreview }) => {
   
  return (
    <>
    
     <span style={{fontWeight:600}}><VerifiedUserIcon fontSize="small"/> {foodreview.name}</span>
      
      <p>{foodreview.description}</p>
    </>
  );
};
export default Review;
