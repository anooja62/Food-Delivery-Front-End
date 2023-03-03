/** @format */

import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import {
  deliveredOrder,
  OrderHistoryForRestaurant,
} from "../../../store/shopping-cart/ordersSlice";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import Button from "@mui/material/Button";
import { useCookies } from "react-cookie";
const RestaurantExcel = () => {
  const [cookies, setCookie] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deliveredOrder());
    dispatch(OrderHistoryForRestaurant(restaurantId));
  }, []);

  const deliveredOrderss = useSelector((state) => state.order?.deliveredOrders);

  const orderHistoryRestaurant = useSelector(
    (state) => state.order?.orderHistoryRestaurant
  );

  const csvData = [
    [
      "Order ID",
      "Customer Address",
      "Delivery Agent Adddress",
      "Food Items",
      "Total Amount",
    ],
  ];
  const convertJsonIntoArray = () => {
    deliveredOrderss.map((order, ind) => {
      order.map((item, index) => {
        let temp = [];
        const lastIndex = order.length - 1;
        if (index === 0) {
          temp.push(
            order[lastIndex]?.orderId,
            [
              order[lastIndex]?.address?.name,
              order[lastIndex]?.address?.address,
              order[lastIndex]?.address?.phone,
              order[lastIndex]?.address?.pincode,
            ],
            [
              order[lastIndex]?.deliveryBoyAddress?.name,
              order[lastIndex]?.deliveryBoyAddress?.email,
              order[lastIndex]?.deliveryBoyAddress?.phone,
            ],
            order.map((o, index) => o.foodname),
            order[lastIndex]?.totalAmount
          );

          csvData.push(temp);
        }
      });
    });
  };
  convertJsonIntoArray();

  return (
    <>
      <Button variant='contained'>
        <PrintRoundedIcon />
        &nbsp;Print PDF
      </Button>
      &nbsp;&nbsp;
      <CSVLink
        data={csvData}
        filename='RegisterUserData'
        className='btn btn-success'
      >
        Export Order Data
      </CSVLink>
      <div id='printableTable'>
        <Container>
          <div className='row'>
            <div className='col-sm-8'>
              <h4 className='mt-3 mb-3'>Customer Order Details </h4>

              <table className='table table-bordered '>
                <thead>
                  <tr>
                    <th scope='col'>SL.No</th>

                    <th scope='col'>Food Items</th>
                    <th scope='col'>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistoryRestaurant.map((order, index) => {
                    console.log(order);
                    return (
                      <tr key={order[0].orderId}>
                        <td>{index + 1}</td>
                        <td>
                          {order.map((o, index) => {
                            return <>{o.foodname && <li>{o.foodname} </li>}</>;
                          })}
                        </td>
                        <td>
                          {order.map((o, index) => {
                            return <>{o.foodname && <li> {o.quantity}</li>}</>;
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default RestaurantExcel;
