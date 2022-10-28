/** @format */

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Barcode from "react-barcode";
import { Row, Col } from "react-bootstrap";

const RestaurantBarcode = () => {
  
  const [barcode, setBarcode] = useState();
  const generateBarcode = () => {
    setBarcode("orderid");
  };
  return (
    <div>
      <Row>
        <Col>
          <table className='table table-bordered mt-4'>
            <thead>
              <tr>
                <th>No</th>
                <th>Order id</th>
                <th>Food Name</th>
                <th>Bill</th>
              </tr>
            </thead>
            <tbody className='text-center' style={{ paddingTop: "2%" }}>
              <tr>
                <td>1</td>
                <td>iddddd</td>
                <td>biriyani</td>
                <td>
                  {" "}
                  <Button variant="contained" onClick={generateBarcode}>Generate Bill</Button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>iddddd</td>
                <td>biriyani</td>
                <td>
                  {" "}
                  <Button variant="contained" onClick={generateBarcode}>Generate Bill</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col>
          {" "}
          <div className="mt-3 text-center" style={{border:"2px solid black"}}>
            <h3 >Customer Bill</h3>
            <Barcode value={barcode} />
            <h4>Food item 1</h4>
            <h4>Food item 2</h4>
            <h2>ThankYou!!!!!</h2>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default RestaurantBarcode;
