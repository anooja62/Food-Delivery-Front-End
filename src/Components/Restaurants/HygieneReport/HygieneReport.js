/** @format */

import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "../../../axios";
import {Row,Col} from 'react-bootstrap'
const HygieneReport = () => {
  const [cookies, setCookie] = useCookies(null);
  const [featuresData, setFeaturesData] = useState({});
  const restaurantId = cookies.restaurantId;

  useEffect(() => {
    const fetchHygieneData = async () => {
      try {
        const response = await axios.get(`/feed/hygienereport/${restaurantId}`);
        setFeaturesData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHygieneData();
  }, []);

  return (
    <div>
        <Row>
            <Col>
            <table className='table table-bordered mt-4'>
        <thead >
          <tr>
            <th>Feature</th>
            <th>Value</th>
            <th>User response Percentage</th>
          </tr>
        </thead>
        <tbody className='table table-bordered'>
          {Object.keys(featuresData).map((featureName) => (
            <>
              <tr key={`${featureName}-0`}>
                <td rowSpan={Object.keys(featuresData[featureName]).length}>
                  {featureName}
                </td>
                <td>{Object.entries(featuresData[featureName])[0][0]}</td>
                <td>{Object.entries(featuresData[featureName])[0][1]}</td>
              </tr>
              {Object.entries(featuresData[featureName])
                .slice(1)
                .map(([value, count], index) => (
                  <tr key={`${featureName}-${index}`}>
                    <td>{value}</td>
                    <td>{count}</td>
                  </tr>
                ))}
            </>
          ))}
        </tbody>
      </table>
            </Col>
            <Col>
            </Col>
        </Row>
     
    </div>
  );
};

export default HygieneReport;
