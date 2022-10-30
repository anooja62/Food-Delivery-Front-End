/** @format */

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Barcode from "react-barcode";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deliveredOrder } from "../../../store/shopping-cart/ordersSlice";
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
const RestaurantBarcode = () => {
  const dispatch = useDispatch();
  const [barcode, setBarcode] = useState();
  const [orders, setOrders] = useState([]);
  const deliveredOrderss = useSelector((state) => state.order?.deliveredOrders);

  useEffect(() => {
    dispatch(deliveredOrder());
  }, []);
  const generateBarcode = (orderId, order) => {
    setBarcode(orderId);
    setOrders(order);
    console.log(order);
  };
  const print = () => {
    let printContents = document.getElementById("printableTable").innerHTML;
    document.body.innerHTML = printContents;
    window.print();
  };
  return (
    <div>
      <Row>
        <Col>
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Food Name</th>
                <th>Total</th>
                <th>Generate Bill</th>
              </tr>
            </thead>

            {deliveredOrderss.map((item) => {
              return (
                <tbody className="text-center" style={{ paddingTop: "2%" }}>
                  {item.map((order, index) => {
                    const lastIndex = item.length - 1;
                    console.log(item[lastIndex]);
                    return (
                      <>
                        {index === 0 && (
                          <tr>
                           
                            <td>{item[lastIndex]?.orderId}</td>

                            <td>
                              {item.map((o) => {
                                return <p>{o.foodname}</p>;
                              })}
                            </td>
                            <td>{item[lastIndex]?.totalAmount}</td>
                            <td>
                              <Button
                                variant="contained"
                                onClick={() =>
                                  generateBarcode(
                                    item[lastIndex]?.orderId,
                                    item
                                  )
                                }
                              >
                                Generate Bill
                              </Button>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              );
            })}
          </table>
        </Col>
        <Col>
          {" "}
          <Button variant="contained" color="success" onClick={print}><PrintRoundedIcon/> &nbsp;Print Bill</Button>
          
          <div
            className="mt-3 text-center"
            style={{ border: "2px solid black" }}
          >
            <div id="printableTable">
              <h3>Customer Bill</h3>
              <Barcode value={barcode} />
              {orders.map((item) => {
                return(
                  <>
                  <h4>{item.foodname} </h4>
               
                  </>
                 

                )
                
              })}
               <h6>Payment Mode: Online</h6>
              <h2>ThankYou!!!!!</h2>
            </div>
          </div>
        </Col>
       
      </Row>
    </div>
  );
};

export default RestaurantBarcode;
