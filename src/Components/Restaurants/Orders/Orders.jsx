/** @format */

import React, { useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import jsPDF from "jspdf";

import "jspdf-autotable";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  restaurantOrder,
  orderReady,
} from "../../../store/shopping-cart/ordersSlice";

const Orders = () => {
  const [cookies, setCookie] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  const restaurantName = cookies.restaurantName;
  const restaurantOrders = useSelector((state) => state.order.restaurantOrders);

  const dispatch = useDispatch();
  const tableRef = useRef(null);

  useEffect(() => {
    dispatch(restaurantOrder(restaurantId));
  }, []);

  const handleFoodReady = (id) => {
    dispatch(orderReady({ id, restaurantId }));
  };

  const handleGenerateBill = (orders) => {
    const doc = new jsPDF();
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.text(`${restaurantName}`, doc.internal.pageSize.width / 2, 30, {
      align: "center",
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      `Order #${orders[orders.length - 1]}`,
      doc.internal.pageSize.width / 2,
      42,
      { align: "center" }
    );
    doc.setFontSize(9);
    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      doc.internal.pageSize.width / 2,
      50,
      { align: "center" }
    );
    

    doc.autoTable({
      startY: doc.internal.pageSize.height / 3,

      head: [["Food Name", "Quantity", "Price"]],
      body: orders.map((order) => [
        order.foodname,
        order.quantity,
        order.price,
      ]),
      theme: "plain",
      styles: {
        font: "helvetica",
        fontStyle: "normal",
        overflow: "linebreak",
        textColor: 0,
        lineWidth: 0,
      },
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        fontSize: 14,
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        fontSize: 12,
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 60, halign: "center" },
        2: { cellWidth: 60, halign: "right" },
      },
    });

    const totalAmount = orders.reduce((total, order) => {
      return total + (order.price || 0) * (order.quantity || 0);
    }, 0);

    doc.setFontSize(14);
    doc.text(
      `Total Amount: ${totalAmount}`,
      doc.internal.pageSize.width - 14,
      doc.autoTable.previous.finalY + 10,
      { align: "right" }
    );

    doc.save(`Order_${orders[orders.length - 1]}.pdf`);
  };

  return (
    <table ref={tableRef} className='table table-bordered '>
      <thead>
        <tr>
          <th>Sl No.</th>
          <th>Food Items</th>
          <th>Total Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {restaurantOrders.map((orders, index) => {
          const slNo = index + 1;
          const orderId = orders[orders.length - 1];

          const totalAmount = orders.reduce((total, order) => {
            return total + (order.price || 0) * (order.quantity || 0);
          }, 0);

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
              <td>₹ {totalAmount}</td>
              <td className='text-center'>
                <Button
                  variant='contained'
                  onClick={() => handleGenerateBill(orders)}
                >
                  <LocalPrintshopIcon />
                  &nbsp; Generate Bill
                </Button>{" "}
                <Button
                  variant='contained'
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
