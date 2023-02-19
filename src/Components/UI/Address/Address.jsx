import React from "react";

import { useDispatch } from "react-redux";
import {  Row, Col } from "react-bootstrap";

import { deleteShipping } from "../../../store/shopping-cart/addressSlice";
import Chip from '@mui/material/Chip';

const Address = ({ shipping,setDisableForm}) => {
  
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    dispatch(deleteShipping(id));
  };
  
const  handleChangeRadio = (id) => {
    if(id){
      setDisableForm(true)
    }
  }

  return (
    <>
  
 
    
      <Row>
        <Col>
        {window.location.href.includes("checkout") ? (
        <input type="radio" name="shippingid" value={shipping?._id}  onChange={()=>handleChangeRadio(shipping?._id)}/>):(
        " "
        )}
              
        <p style={{ fontWeight: "600"}}>{shipping?.name} </p>
        </Col>
        <Col></Col>
        <Col>
          <Chip size="small" label= {shipping?.label}/>
          </Col>
          </Row>
        <p><i class="ri-phone-fill"></i> {shipping?.phone}</p>

        <p><i class="ri-map-pin-2-fill"></i> {shipping?.pincode}</p>

        <p> {shipping?.address}</p>

        
  
     
    </>
  );
};
export default Address;
