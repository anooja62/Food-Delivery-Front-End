import React, { useRef, useState } from "react";

import { useDispatch } from "react-redux";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { rejectRestaurant } from "../../../store/shopping-cart/restaurantSlice";

import Button from 'react-bootstrap/Button';


const Fssai = ({ restaurant, url }) => {
  
 
  const dispatch = useDispatch();
  const handleReject = async (id) => {
    dispatch(rejectRestaurant(id));
  };

  
  

  return (
    <>
      <tbody>
        <tr>
          <td className="text-center" style={{ paddingTop: "2%" }}>
            {restaurant.name}
          </td>
          <td className="text-center" style={{ paddingTop: "2%" }}>
            {restaurant.email}
          </td>
          <td className="text-center" style={{ paddingTop: "2%" }}>
            {restaurant.expiredate}
          </td>
         
        

          <td className="text-center">


          <Button variant="danger" onClick={() => handleReject(restaurant._id)}>Disable</Button>
           
          </td>
        </tr>
      </tbody>
      
     
    </>
  );
};
export default Fssai;
