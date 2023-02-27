/** @format */

import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { useCookies } from "react-cookie";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SavingsIcon from "@mui/icons-material/Savings";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  paySalary,
  getSalaryDetails,
} from "../../../store/shopping-cart/salarySlice";
const Payments = () => {
  const [cookies, setCookies] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  const salaryDetailss = useSelector((state) => state.salary.paysalarydetails);

  const monthlySalary = useSelector(
    (state) => state.salary.monthlysalarydetails.salaryData
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(paySalary(restaurantId));
    dispatch(getSalaryDetails(restaurantId));
  }, []);

  return (
    <div>
      <div className='row mb-3'>
        <div className='col-xl-3 col-sm-6 py-2'>
          <div className='card bg-success text-white h-100'>
            <div className='card-body bg-success'>
              <div className='rotate'>
                <CurrencyRupeeIcon fontSize='large' />
              </div>
              <h6 className='text-uppercase'>Total Order Amount</h6>
              <h1 className='display-4' style={{ color: "#fff" }}>
                {salaryDetailss.totalOrderAmount}
              </h1>

              {!salaryDetailss.totalOrderAmount ? (
                <p>No salary details available.</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className='col-xl-3 col-sm-6 py-2'>
          <div className='card bg-success text-white h-100'>
            <div className='card-body bg-danger'>
              <div className='rotate'>
                <SavingsIcon fontSize='large' />
              </div>
              <h6 className='text-uppercase'>Total Earnings</h6>
              <h1 className='display-4' style={{ color: "#fff" }}>
                {salaryDetailss.restaurantSalary}
              </h1>

              {!salaryDetailss.restaurantSalary ? (
                <p>No salary details available.</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Row>
          <Col>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Total Order Amount</th>
                  <th>Total Earnings</th>
                </tr>
              </thead>
              <tbody>
                {monthlySalary?.map((data) => {
                  // Convert month number to month name
                  const monthName = new Date(0, data.month - 1).toLocaleString(
                    "default",
                    {
                      month: "long",
                    }
                  );

                  return (
                    <tr key={data._id}>
                      <td>{monthName}</td>
                      <td>{data.totalOrderAmount || "No order"}</td>
                      <td>{data.salary || "No earnings"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </div>
  );
};

export default Payments;
