import React,{useEffect} from "react";
import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  restaurantOrder,
  orderReady,
} from "../../../store/shopping-cart/ordersSlice";

const Orders = () => {
  const [cookies, setCookie] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  const restaurantOrders = useSelector((state) => state.order.restaurantOrders);
  const dispatch = useDispatch();
useEffect(() => {
  dispatch(restaurantOrder(restaurantId));
}, [])
  const handleFoodReady = (id) => {
  
    dispatch(orderReady({ id, restaurantId }));
  };

  return (
    <table className='table table-bordered '>
      <thead>
        <tr>
        <th>Sl No.</th>
          <th>Food Items</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {restaurantOrders.map((orders,index) => {
          console.log(orders)
           const slNo = index + 1;
          const orderId = orders[orders.length - 1];
          const foodItems = orders.map((order) => (
            <tr key={order.id}>
              <td>{order.foodname}</td>
              <td>{order.quantity}</td>
            </tr>
          ));
          return (
            <tr key={slNo}>
            <td>{slNo}</td>
            <td>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Food Name</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>{foodItems}</tbody>
                </Table>
              </td>
              <td>
                <Button
                  variant="contained"
                  onClick={() => handleFoodReady(orderId)}
                >
                  <ThumbUpAltIcon />
                  &nbsp; FOOD READY
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Orders;
