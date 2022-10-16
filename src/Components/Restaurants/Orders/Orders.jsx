import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "@mui/material/Button";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useCookies } from "react-cookie";
import {
  restaurantOrder,
  orderReady,
} from "../../../store/shopping-cart/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
const Orders = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  const restaurantOrders = useSelector((state) => state.order.restaurantOrders);
  // console.log(restaurantOrders);
  const dispatch = useDispatch();
  const handleFoodReady = (id) => {
    dispatch(orderReady({ id, restaurantId }));
    // dispatch(restaurantOrder(restaurantId));
  };

  return (
    <>
      {restaurantOrders.map((orders) => {
        // console.log(orders, "orders");
        let orderId = orders[orders.length - 1];
        // console.log(orderId);

        return (
          <Card style={{ width: "18rem" }}>
            <Card.Header>Order id : {orderId}</Card.Header>
            <ListGroup variant="flush">
              {orders.map((order) => {
                console.log(order);
                return (
                  <>
                    <ListGroup.Item>
                      {order.foodname} {order.quantity}
                    </ListGroup.Item>
                  </>
                );
              })}
              <ListGroup.Item>
                <Button
                  variant="contained"
                  onClick={() => handleFoodReady(orderId)}
                >
                  <ThumbUpAltIcon />
                  &nbsp; FOOD READY
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        );
      })}
    </>
  );
};

export default Orders;
