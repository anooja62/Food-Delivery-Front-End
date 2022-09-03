import React from "react";

import { Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

import "../../../styles/product-card.css";
import { deleteMenu } from "../../../store/shopping-cart/menuSlice";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {cartActions} from '../../../store/shopping-cart/cartSlice'

const Menu = ({ menu, url }) => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    dispatch(deleteMenu(id));
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }} className='mt-5'>
        <CardMedia
          component="img"
          height="140"
          src={menu.imgUrl}
          alt="product"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {menu.foodname}
          </Typography>
        </CardContent>

        <p>{menu.category}</p>

        <Row>
          <Col>
            <span className="product__price">₹{menu.price}</span>
          </Col>
          <Col>
            {window.location.href.includes("admin-res") ? (
              <Button
                variant="danger"
                className=" text-center"
                onClick={() => handleDelete(menu._id)}
              >
                Delete
              </Button>
            ) : (
              <button
                className="addToCart__btn"
                onClick={() => dispatch(cartActions.addItem(menu))}
              >
                Add to Cart
              </button>
            )}
          </Col>
        </Row>
        <br></br>
      </Card>
      <br></br>
    </>
  );
};
export default Menu;
