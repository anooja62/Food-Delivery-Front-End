import React from "react";

import {  Button,Row,Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { deleteCombo } from "../../../store/shopping-cart/comboSlice";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { useCookies } from "react-cookie";


const Combo = ({ combo, url }) => {
  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  const cartProducts = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    dispatch(deleteCombo(id));
  };

  let arr = [
    {
      userId: userId,
      products: [],
    },
  ];

  
  const handleAddItem = (combo, arr, cartProducts) => {
 
    dispatch(cartActions.addItem(combo));
    toast.success("Item Added to cart", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };

  return (
    <>
      <Card style={{ maxWidth: 345}} className="mt-5">
      <CardMedia
          component="img"
          height="140"
          src={combo.imgUrl}
          alt="product"
        />
        <CardContent>
        <Typography gutterBottom variant="h6" component="div">
            {combo.foodname}
          </Typography>
        </CardContent>
          <p>{combo.category}</p>
         <Row>
         <Col>
            <span className="product__price">₹{combo.price}</span>
          </Col>
          <Col>
            {window.location.href.includes("admin-res") ? (
              <Button
                variant="danger"
                className=" text-center"
                onClick={() => handleDelete(combo._id)}
              >
                Delete
              </Button>
            ) : (
              <button
                className="addToCart__btn"
                onClick={() => handleAddItem(combo, arr, cartProducts)}
              >
                Add to Cart
                <ToastContainer
position="bottom-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
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
export default Combo;
