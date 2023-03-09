/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderHistoryForDeliveryBoy } from "../../../store/shopping-cart/ordersSlice";
import { useCookies } from "react-cookie";
import Button from "react-bootstrap/Button";
const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [cookies, removeCookie] = useCookies(null);
  const deliveryboyId = cookies.deliveryboyId;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(OrderHistoryForDeliveryBoy(deliveryboyId));
  }, []);
  const OrderHistorys = useSelector(
    (state) => state.order.orderHistoryDeliveryBoy
  );
  const numPages = Math.ceil(OrderHistorys.length / rowsPerPage);

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
      >
        {i}
      </Button>
    );
  }
  return (
    <div>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>SL.No</th>
            <th>Customer Name</th>
            <th>Food Items</th>

            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {OrderHistorys.slice(startIndex, endIndex).map((data, index) => {
            return (
              <tr key={data[0].orderId}>
                <td>{startIndex + index + 1}</td>
                <td>{data[2]?.address?.name}</td>
                <td>{data[1]?.foodname}</td>

                <td>{data[2]?.address?.address}</td>
                <td style={{ fontWeight: 600, color: "green" }}>Completed</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='d-flex justify-content-center mt-4'>
        {paginationButtons}
      </div>
    </div>
  );
};

export default OrderHistory;