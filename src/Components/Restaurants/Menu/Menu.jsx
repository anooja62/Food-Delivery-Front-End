import React from "react";

import { Card, Button,Row,Col } from "react-bootstrap";
import { useDispatch } from "react-redux";


import { deleteMenu } from "../../../store/shopping-cart/menuSlice";
import { cartActions } from '../../../store/shopping-cart/cartSlice'

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Menu = ({ menu, url }) => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    dispatch(deleteMenu(id));
  };


   


  return (
    <>
      <Card style={{ maxWidth: "18rem", height:"20rem"}} className="mb-3">
        <Card.Img
          variant="top"
          
          src={menu.imgUrl}
          
        />
        <Card.Body className="text-center">
          <Card.Title> {menu.foodname}</Card.Title>
          <p>{menu.category}</p>
         <Row>
            <Col><p style={{fontWeight:600}}><CurrencyRupeeIcon/> {menu.price}</p></Col>
            <Col>
       {window.location.href.includes("admin-res")  ? <Button variant="danger" className=" text-center"  onClick={() => handleDelete(menu._id)}>
            Delete
          </Button>
          : <Button variant="danger" className=" text-center"  onClick={() => console.log("added")}>
         Add to Cart
        </Button>}

          </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
export default Menu;
