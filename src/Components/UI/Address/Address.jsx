import React from "react";

import { useDispatch } from "react-redux";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteShipping } from "../../../store/shopping-cart/addressSlice";

const Address = ({ shipping }) => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    dispatch(deleteShipping(id));
  };

  return (
    <>
      <div>
       
          
             <p>{shipping.name}</p> 
           
             <p> {shipping.phone}</p>
           
             <p> {shipping.pincode}</p>
           
             <p>{shipping.address}</p> 
           

            
              <IconButton aria-label="delete" size="large">
                <DeleteIcon
                  fontSize="inherit"
                  onClick={() => handleDelete(shipping._id)}
                />
              </IconButton>
           
      </div>
    </>
  );
};
export default Address;
