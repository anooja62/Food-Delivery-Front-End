/** @format */

import React, { useState, useEffect } from "react";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector, useDispatch } from "react-redux";
import { deliveredOrder } from "../../../store/shopping-cart/ordersSlice";

function NewReports() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deliveredOrder());
  }, []);
  const deliveredOrderss = useSelector((state) => state.order?.deliveredOrders);

  function generatePDF() {
    const doc = new jsPDF();
    doc.text("Delivered Orders Report", 14, 16);

    let tableData = [];
    deliveredOrderss.forEach((order) => {
      let row = [];
      row.push(order[0]?.orderId);
      row.push(order[0].address?.name);
      row.push(order[0].address?.address);
      row.push(order[0].address?.phone);

      row.push(order[0].deliveryBoyAddress?.name);
      row.push(order[0].deliveryBoyAddress?.email);
      row.push(order[0].deliveryBoyAddress?.phone);
      row.push(order[0]?.foodname);
      row.push(order[0]?.totalAmount);
      row.push(order[0]?.isDelivered ? "Yes" : "No");
      tableData.push(row);
    });

    doc.autoTable({
      head: [
        [
          "Order ID",
          "Customer Name",
          "Delivery Address",
          "Customer Phone",
          "Delivery Boy Name",
          "Delivery Boy Email",
          "Delivery Boy Phone",
          "Food Item",
          "Total Amount",
          "Delivered?",
        ],
      ],
      body: tableData,
      startY: 26,
    });

    doc.save("delivered-orders.pdf");
  }

  return (
    <div>
      <button
        onClick={generatePDF}
        disabled={!deliveredOrderss || deliveredOrderss.length === 0}
      >
        Generate PDF
      </button>
      {deliveredOrderss && deliveredOrderss.length > 0 && (
         
        <table className='table table-bordered '>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Delivery Address</th>
              <th>Customer Phone</th>
              <th>Delivery Boy Name</th>
              <th>Delivery Boy Email</th>
              <th>Delivery Boy Phone</th>
              <th>Food Item</th>
              <th>Total Amount</th>
              <th>Delivered?</th>
            </tr>
          </thead>
          <tbody>
            {deliveredOrderss.map((order, index) => (
              
              <tr key={index}>
                
                <td>{order[0]?.orderId}</td>
                <td>{order[0].address?.name}</td>
                <td>{order[0].address?.address}</td>
                <td>{order[0].address?.phone}</td>

                <td>{order[0].deliveryBoyAddress?.name}</td>
                <td>{order[0].deliveryBoyAddress?.email}</td>
                <td>{order[0].deliveryBoyAddress?.phone}</td>
                <td>
                  {order.map((item, index) => (
                      
                    <div key={index}>
                      {item.foodname} ({item.quantity})
                    </div>
                  ))}
                </td>
                <td>{order[0]?.totalAmount}</td>
                <td>{order[0]?.isDelivered ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default NewReports;
