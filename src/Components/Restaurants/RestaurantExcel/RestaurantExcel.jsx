import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import { deliveredOrder } from "../../../store/shopping-cart/ordersSlice";
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import Button from '@mui/material/Button';
const RestaurantExcel = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deliveredOrder());
  }, []);

  const deliveredOrderss = useSelector((state) => state.order?.deliveredOrders);

  const print = () => {
    let printContents = document.getElementById("printableTable").innerHTML;
    document.body.innerHTML = printContents;
    window.print();
  };

  const handleBack = () => {
    window.location.reload();
  };

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
      <Button variant="contained" onClick={print}><PrintRoundedIcon/>&nbsp;Print PDF</Button>&nbsp;&nbsp;
      <CSVLink
        data={csvData}
        filename="RegisterUserData"
        className="btn btn-success"
      >
        Export Order Data
      </CSVLink>
      <div id="printableTable">
        <Container>
          <div className="row">
            <div className="col-sm-8">
              <h4 className="mt-3 mb-3">Customer Order Details </h4>

              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Customer name and address</th>
                    <th scope="col">Delivery Boy Details</th>
                    <th scope="col">Food Items</th>
                    <th scope="col">Total Amount</th>
                  </tr>
                </thead>

                {deliveredOrderss.map((order) => {
                  return (
                    <tbody>
                      {order.map((item, index) => {
                        const lastIndex = order.length - 1;
                        return (
                          <>
                            {index !== lastIndex && (
                              <tr key={index}>
                                {index === 0 && (
                                  <td> {order[lastIndex]?.orderId}</td>
                                )}

                                {index === 0 && (
                                  <td>
                                    {order[lastIndex]?.address?.name} <br />
                                    {order[lastIndex]?.address?.address}
                                    <br />
                                    {order[lastIndex]?.address?.pincode}
                                    <br />
                                    {order[lastIndex]?.address?.phone}
                                  </td>
                                )}
                                 {index === 0 && (
                                  <td>
                                    {order[lastIndex]?.deliveryBoyAddress?.name}
                                    <br />
                                    {
                                      order[lastIndex]?.deliveryBoyAddress
                                        ?.email
                                    }
                                    <br />
                                    {
                                      order[lastIndex]?.deliveryBoyAddress
                                        ?.phone
                                    }
                                  </td>
                                )}
                                {index === 0 && (
                                  <td>
                                    {order.map((o, index) => {
                                      return (
                                        <>
                                          {o.foodname && <li>{o.foodname}</li>}
                                        </>
                                      );
                                    })}
                                  </td>
                                )}
                                {index === 0 && (
                                  <td>₹ {order[lastIndex]?.totalAmount} </td>
                                )}
                              </tr>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default RestaurantExcel;
