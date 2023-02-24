import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { useCookies } from "react-cookie";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SavingsIcon from "@mui/icons-material/Savings";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
const Payments = () => {
  const [cookies, setCookies] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  const [totalOrderAmount, setTotalOrderAmount] = useState(0);
  const [restaurantSalary, setRestaurantSalary] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const handlePaySalary = async () => {
      try {
        const response = await axios.put(`/salary/pay-salary/${restaurantId}`);
        setTotalOrderAmount(response.data.totalOrderAmount);
        setRestaurantSalary(response.data.restaurantSalary);
        setStatusMessage(response.data.message);
      } catch (error) {
        console.log(error);
        setStatusMessage("Error occurred while paying salary");
      }
    };
    handlePaySalary();
  }, [restaurantId]);

  return (
    <div>
      <div className='row mb-3'>
        <div className='col-xl-3 col-sm-6 py-2'>
          <div className='card bg-success text-white h-100'>
            <div className='card-body bg-success'>
              <div className='rotate'>
                <CurrencyRupeeIcon fontSize="large"/>
              </div>
              <h6 className='text-uppercase'>Total Order Amount</h6>
              <h1 className='display-4' style={{ color: "#fff" }}>
                {totalOrderAmount}
              </h1>
            </div>
          </div>
        </div>
        <div className='col-xl-3 col-sm-6 py-2'>
          <div className='card bg-success text-white h-100'>
            <div className='card-body bg-danger'>
              <div className='rotate'>
                <SavingsIcon fontSize="large"/>
              </div>
              <h6 className='text-uppercase'>Total earnings</h6>
              <h1 className='display-4' style={{ color: "#fff" }}>
                {restaurantSalary}
              </h1>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Payments;
