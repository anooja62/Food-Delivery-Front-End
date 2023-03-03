/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderHistoryForDeliveryBoy } from "../../../store/shopping-cart/ordersSlice";
import { useCookies } from "react-cookie";
const OrderHistory = () => {
  const [cookies, removeCookie] = useCookies(null);
  const deliveryboyId = cookies.deliveryboyId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(OrderHistoryForDeliveryBoy(deliveryboyId));
  }, []);
  const OrderHistorys = useSelector(
    (state) => state.order.orderHistoryDeliveryBoy
  );
  return (
    <div>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>SL.No</th>
            <th>Customer Name</th>
            <th>Food Items</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {OrderHistorys.map((data, index) => {
            console.log(data);
            // const lastIndex = data.length - 1;

            return (
              <tr key={data[0].orderId}>
                <td>{index + 1}</td>
                <td>{data[2]?.address?.name}</td>
                <td>{data[1]?.foodname}</td>
                <td>{data[2]?.address?.phone}</td>
                <td>{data[2]?.address?.address}</td>
                <td style={{ fontWeight: 600, color: "green" }}>Completed</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
