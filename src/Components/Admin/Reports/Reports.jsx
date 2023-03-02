import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { deliveredOrder } from "../../../store/shopping-cart/ordersSlice";
const Reports = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deliveredOrder());
  }, []);
  
  const deliveredOrderss = useSelector((state) => state.order?.deliveredOrders);

 

  function generatePDF() {
    const doc = new jsPDF();
    doc.text("Delivered Orders Report", 14, 16);

    let tableData = [];
    deliveredOrderss.map((order, ind) => {
      order.map((item, index) => {
        let temp = [];
        const lastIndex = order.length - 1;
        if (index === 0) {
          let row = [];
          row.push(
            ind + 1,
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

          tableData.push(row);
        }
      });
    });

    doc.autoTable({
      head: [
        [
          "Sl No",
          "Customer Address",
          "Delivery Agent Details",
          "Food Items",
          "Total Amount",
        ],
      ],
      body: tableData,
      startY: 26,
    });

    doc.save("delivered-orders.pdf");
  }

  const csvData = [
    [
      "Sl No",
      "Customer Address",
      "Delivery Agent Details",
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
            ind + 1,
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
      <Button variant='contained' onClick={generatePDF}>
        <PrintIcon />
        &nbsp; Download PDF
      </Button>
      &nbsp;&nbsp;
      <CSVLink
        data={csvData}
        filename='RegisterUserData'
        className='btn btn-success '
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
                    <th scope='col'>Sl No</th>
                    <th scope='col'>Customer name and address</th>
                    <th scope='col'>Delivery Boy Details</th>
                    <th scope='col'>Food Items</th>
                    <th scope='col'>Total Amount</th>
                  </tr>
                </thead>

                {deliveredOrderss
                 
                  .map((order, orderIndex) => {
                    return (
                      <tbody>
                        {order.map((item, index) => {
                          const lastIndex = order.length - 1;
                          return (
                            <>
                              {index !== lastIndex && (
                                <tr key={index}>
                                  {index === 0 && <td>{orderIndex + 1}</td>}

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
                                      {
                                        order[lastIndex]?.deliveryBoyAddress
                                          ?.name
                                      }
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
                                            {o.foodname && (
                                              <li>{o.foodname}</li>
                                            )}
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
              <div>           
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Reports;
