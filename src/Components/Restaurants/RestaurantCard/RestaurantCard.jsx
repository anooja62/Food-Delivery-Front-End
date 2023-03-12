/** @format */

import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSingleRestaurent = (id) => {
    navigate("/ui/" + id);
  };
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

 
  getRating(restaurant.sentimentScore);
  const rating = getRating(restaurant.sentimentScore);
  const mostRatedLabel = restaurant.sentimentScore > 10 && (
    <p style={{ color: "green", fontWeight: "600" }}>Highest rated</p>
  );
  return (
    <>
      <Card sx={{ maxWidth: 345 }} className='mt-5'>
        <CardActionArea>
          <CardMedia
            component='img'
            height='200'
            src={restaurant.restImg}
            alt='restaurant images'
            onClick={() => handleSingleRestaurent(restaurant._id)}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{mostRatedLabel}</Typography>
              <div style={{ marginLeft: "auto" }}>
                <Box component='fieldset' borderColor='transparent'>
                  <Rating name='read-only' value={rating} readOnly />
                </Box>
              </div>
            </Box>

            <Typography
              variant='h5'
              component='div'
              onClick={() => handleSingleRestaurent(restaurant._id)}
            >
              {restaurant.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default RestaurantCard;
