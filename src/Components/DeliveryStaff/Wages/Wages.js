import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { useCookies } from "react-cookie";
import Highcharts from "highcharts";
import { Row, Col, Table } from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";

const Wages = () => {
  const [cookies, setCookies] = useCookies(null);
  const deliveryboyId = cookies.deliveryboyId;
  const [monthlySalary, setMonthlySalary] = useState([]);

  useEffect(() => {
    const fetchMonthlySalary = async () => {
      try {
        const response = await axios.get(
          `salary/delivery-salary/${deliveryboyId}`
        );
        console.log(response.data);
        setMonthlySalary(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMonthlySalary();
  }, []);

  // Extract the data needed for the chart
  const chartData = monthlySalary.map((salary) => ({
    name: `${salary.month} ${salary.year}`,
    y: salary.salary,
  }));

  // Define the Highcharts configuration options
  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Monthly Salary",
    },
    xAxis: {
      categories: monthlySalary.map((salary) => `${salary.month} ${salary.year}`),
    },
    yAxis: {
      title: {
        text: "Salary (Rupee)",
      },
    },
    series: [
      {
        name: "Monthly Salary",
        data: chartData,
      },
    ],
  };

  return (
    <div>
      <Row>
        <Col>
          <Table bordered hover striped className="mt-4">
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th>SL.No</th>
                <th>Month</th>
                <th>Year</th>
                <th>Total Orders Delivered</th>
                <th>Total Order Amount</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {monthlySalary.map((salary, index) => (
                <tr key={salary._id}>
                  <td>{index + 1}</td>
                  <td>{salary.month}</td>
                  <td>{salary.year}</td>
                  <td>{salary.totalOrdersDelivered}</td>
                  <td>{salary.totalOrderAmount}</td>
                  <td>{salary.salary}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
     
     
        <Col>
          <HighchartsReact highcharts={Highcharts}  options={chartOptions}/>
        </Col>
      </Row>
    </div>
  );
};

export default Wages;
