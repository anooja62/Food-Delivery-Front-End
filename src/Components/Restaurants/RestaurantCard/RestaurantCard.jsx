import React from "react";

import { useDispatch } from "react-redux";

import { getRestaurantdetails } from "../../../store/shopping-cart/restaurantSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import {useNavigate} from 'react-router-dom'
const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

 

  const handleSingleRestaurent = (id) =>{
    
    navigate("/ui/"+id)
  }

  return (
    <>
  
      <Card sx={{ maxWidth: 345 }} className='mt-5'>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            src={restaurant.restImg}
            alt="restaurant images"
            onClick={()=>handleSingleRestaurent(restaurant._id)}
          />
          <CardContent>
            <Typography variant="h5" component="div" onClick={()=>handleSingleRestaurent(restaurant._id)}>
              {restaurant.name}
            </Typography>
            
          </CardContent>
        </CardActionArea>
      </Card>
      
    </>
  );
};

export default RestaurantCard;
