/** @format */

import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import PrintIcon from "@mui/icons-material/Print";
import Button from "react-bootstrap/Button";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { deliveredOrder } from "../../../store/shopping-cart/ordersSlice";
const Reports = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deliveredOrder());
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const deliveredOrderss = useSelector((state) => state.order?.deliveredOrders);
  const numPages = Math.ceil(deliveredOrderss.length / rowsPerPage);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const paginationButtons = [];
  for (let i = 1; i <= numPages; i++) {
    paginationButtons.push(
      <Button
        key={i}
        variant={i === currentPage ? "primary" : "outline-primary"}
        onClick={() => handlePageClick(i)}
        style={{ marginRight: "5px" }}
      >
        {i}
      </Button>
    );
  }

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
      <button
        onClick={generatePDF}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "9px",
          borderRadius: "5px",
          border: "none",
        }}
      >
        <PrintIcon />
        &nbsp; Download PDF
      </button>
      &nbsp;&nbsp;
      <CSVLink
        data={csvData}
        filename='RegisterUserData'
        className='btn btn-success '
      >
        Export Order Data
      </CSVLink>
      <div id='printableTable'>
        <h4 className='mt-3 mb-3'>Customer Order Details </h4>

        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Customer name and address</th>
              <th>Delivery Boy Details</th>
              <th>Food Items</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {deliveredOrderss
              .slice(startIndex, endIndex)
              .map((order, orderIndex) => {
                const lastIndex = order.length - 1;

                return (
                  <tr key={orderIndex}>
                    <td>{startIndex + orderIndex + 1}</td>

                    <td>
                      <span style={{ fontWeight: "bold" }}>
                        {order[lastIndex]?.address?.name}
                      </span>
                      <br />
                      {order[lastIndex]?.address?.address}
                      <br />
                      {order[lastIndex]?.address?.phone}
                    </td>

                    <td>
                      {order[lastIndex]?.deliveryBoyAddress?.name}
                      <br />
                      {order[lastIndex]?.deliveryBoyAddress?.email}
                      <br />
                      {order[lastIndex]?.deliveryBoyAddress?.phone}
                    </td>

                    <td>
                      <ul style={{ textAlign: "justify" }}>
                        {order.map((o, index) => {
                          return o.foodname ? (
                            <li key={index}>{o.foodname}</li>
                          ) : null;
                        })}
                      </ul>
                    </td>

                    <td>₹ {order[lastIndex]?.totalAmount} </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className='d-flex justify-content-center mt-4'>
          {paginationButtons}
        </div>
      </div>
    </>
  );
};

export default Reports;
