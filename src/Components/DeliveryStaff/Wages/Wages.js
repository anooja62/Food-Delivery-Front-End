/** @format */

import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { useCookies } from "react-cookie";
import { Row, Col, Table } from "react-bootstrap";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";

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

  return (
    <div>
   
      <Row>
        <Col>
          <Table bordered hover striped className='mt-4'>
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th>Month</th>
                <th>Total Orders Delivered</th>
                <th>Total Order Amount</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
             
              {  monthlySalary.map((salary) => (
                  <tr key={salary._id}>
                    <td>{salary.month}</td>
                    <td>{salary.totalOrdersDelivered}</td>
                    <td>{salary.totalOrderAmount}</td>
                    <td>{salary.salary}</td>
                  </tr>
                ))}
            
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Wages;
