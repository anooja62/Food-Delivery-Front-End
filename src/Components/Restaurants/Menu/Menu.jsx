import React from "react";

import { Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import "../../../styles/product-card.css";
import { deleteMenu } from "../../../store/shopping-cart/menuSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { useCookies } from "react-cookie";


const Menu = ({ menu, url }) => {
  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const cartDbUpdated = useSelector((state) => state.cart.dbUpdated);

  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    dispatch(deleteMenu(id));
  };
  
  let arr = [
    {
      userId: userId,
      products: [],
    },
  ];

  
  const handleAddItem = (menu, arr, cartProducts) => {
 
    dispatch(cartActions.addItem(menu));
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }} className="mt-5">
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
                onClick={() => handleAddItem(menu, arr, cartProducts)}
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
