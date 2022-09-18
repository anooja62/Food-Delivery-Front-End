import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { getMessages } from "../../../store/shopping-cart/messageSlice";
import Modal from "react-bootstrap/Modal";
import {  Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import { getSingleMessage } from "../../../store/shopping-cart/messageSlice";
const MessageDetails = ({ message }) => {
  
  const dispatch = useDispatch();

 const handleSingleMessage =(id)=>{
  dispatch(getSingleMessage(id))
 }
 const singleMessage = useSelector(
  (state) => state.message.singleMessage
);
  return (
    <>
   
      
    <Card sx={{ maxWidth: 345 }} className='mt-1'>
        <CardActionArea>
         
          <CardContent>
            <Typography variant="h5" component="div" onClick={()=>handleSingleMessage(message._id)}>
              {message.restaurantname}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">{message.requestFor}</Typography>
            <Typography variant="body2">{message.msg}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      
      
    
   
    </>
  );
};
export default MessageDetails;
