/** @format */

import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { useCookies } from "react-cookie";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Row, Col, Form } from "react-bootstrap";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Wages = () => {
  const [wages, setWages] = useState({});
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [cookies, setCookies] = useCookies(null);
  const deliveryboyId = cookies.deliveryboyId;
  const [selectedPeriod, setSelectedPeriod] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchWages = async () => {
      try {
        const response = await axios.get(
          `order/deliveryboy-wages/${deliveryboyId}`
        );
        setWages(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWages();

    const fetchDeliveredOrders = async () => {
      try {
        const response = await axios.get(
          `order/deliveryboy-delivered-orders/${deliveryboyId}?deliveryDate=${format(
            selectedDate,
            "yyyy-MM-dd"
          )}`
        );
        setDeliveredOrders(response.data.count);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDeliveredOrders();
  }, [selectedPeriod, selectedDate]);

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const options = {
    title: {
      text: "Wages Chart",
    },
    xAxis: {
      categories: ["Daily Wage", "Weekly Wage", "Monthly Wage"],
    },
    yAxis: {
      title: {
        text: "Amount (in Rs.)",
      },
    },
    series: [
      {
        name: "Wages",
        data: [wages.dailyWage, wages.weeklyWage, wages.monthlyWage],
      },
    ],
  };

  return (
    <div>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId='formPeriod'>
              <Form.Label>Select Period</Form.Label>
              <Form.Control
                as='select'
                value={selectedPeriod}
                onChange={handlePeriodChange}
              >
                <option value='daily'>Daily</option>
                <option value='weekly'>Weekly</option>
                <option value='monthly'>Monthly</option>
              </Form.Control>
            </Form.Group>
            {selectedPeriod === "daily" && (
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat='dd/MM/yyyy'
                maxDate={new Date()}
              />
            )}
          </Form>
          <table
            className='table table-bordered mt-4'
            style={{ border: "2px solid black" }}
          >
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th>Delivered orders</th>
                <th>Daily wage</th>
                <th>Weekly wage</th>
                <th>Monthly wage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{deliveredOrders}</td>
              </tr>
              <tr>
                <td> {wages.deliveredOrders}</td>
                <td> ₹ {wages.dailyWage}</td>
                <td> ₹ {wages.weeklyWage}</td>
                <td> ₹ {wages.monthlyWage}</td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col>
          <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Wages;
