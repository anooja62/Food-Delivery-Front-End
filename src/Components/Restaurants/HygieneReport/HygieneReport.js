/** @format */

import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "../../../axios";
import { Row, Col } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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

  const overallExperienceData = featuresData["overallExperience"];

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Overall Experience",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    series: [
      {
        name: "Overall Experience",
        data: [
          {
            name: "Excellent",
            y: overallExperienceData?.excellent,
            percentage: (
              (overallExperienceData?.excellent /
                overallExperienceData?.totalResponses) *
              100
            ).toFixed(1),
          },
          {
            name: "Good",
            y: overallExperienceData?.good,
            percentage: (
              (overallExperienceData?.good /
                overallExperienceData?.totalResponses) *
              100
            ).toFixed(1),
          },
          {
            name: "Average",
            y: overallExperienceData?.average,
            percentage: (
              (overallExperienceData?.average /
                overallExperienceData?.totalResponses) *
              100
            ).toFixed(1),
          },
          {
            name: "Poor",
            y: overallExperienceData?.poor,
            percentage: (
              (overallExperienceData?.poor /
                overallExperienceData?.totalResponses) *
              100
            ).toFixed(1),
          },
          {
            name: "Very Poor",
            y: overallExperienceData?.veryPoor,
            percentage: (
              (overallExperienceData?.veryPoor /
                overallExperienceData?.totalResponses) *
              100
            ).toFixed(1),
          },
        ],
      },
    ],
  };

  return (
    <div>
      <Row>
        <Col>
          <table className='table table-bordered mt-4' style={{ border: '2px solid black' }}>
          <thead style={{ backgroundColor: '#f0f0f0' }}>
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
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Col>
      </Row>
    </div>
  );
};

export default HygieneReport;
