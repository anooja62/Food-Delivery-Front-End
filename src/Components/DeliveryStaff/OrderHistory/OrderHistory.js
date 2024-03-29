/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderHistoryForDeliveryBoy } from "../../../store/shopping-cart/ordersSlice";
import { useCookies } from "react-cookie";
import Button from "react-bootstrap/Button";
const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
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
      <table
        className='table table-bordered mt-4'
        style={{ border: "2px solid black" }}
      >
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>SL.No</th>
            <th>Customer Name</th>
            <th>Food Items</th>

            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {OrderHistorys.slice(startIndex, endIndex).map((data, index) => {
            const orderID = data[0].orderId;
            const customerName = data[2]?.address?.name;
            const address = data[2]?.address?.address;

            return (
              <React.Fragment key={`${orderID}-header`}>
                {data.map((item, subIndex) => (
                  <tr key={`${orderID}-${subIndex}`}>
                    {subIndex === 0 && (
                      <>
                        <td rowSpan={data.length}>{startIndex + index + 1}</td>
                        <td rowSpan={data.length}>{customerName}</td>
                        <td>{item.foodname}</td>
                        <td rowSpan={data.length}>{address}</td>
                      </>
                    )}
                    {subIndex > 0 && (
                      <>
                        <td>{item.foodname}</td>
                      </>
                    )}
                  </tr>
                ))}
              </React.Fragment>
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
