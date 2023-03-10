/** @format */

import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "../../../axios";
import { Row, Col } from "react-bootstrap";
const Forecast = () => {
  const [salesData, setSalesData] = useState([]);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("pay/total-amount-per-month");
        setSalesData(response.data.payments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const chartOptions = {
      title: {
        text: "Sales Forecast",
      },
      xAxis: {
        categories: salesData
          .map((sale) => sale.month)
          .concat(forecast ? forecast.map((fc) => fc.month) : []),
      },
      yAxis: {
        title: {
          text: "Sales",
        },
      },
      series: [
        {
          name: "Actual Sales",
          data: salesData.map((sale) => sale.totalAmount),
        },
        {
          name: "Forecasted Sales",
          data: forecast ? forecast.map((fc) => fc.totalAmount) : [],
        },
      ],
    };

    Highcharts.chart("chart", chartOptions);
  }, [salesData, forecast]);

  const calculateForecast = (numMonths) => {
    const salesDataLength = salesData.length;

    if (salesDataLength >= 2) {
      const averageGrowthRate =
        (salesData[salesDataLength - 1].totalAmount -
          salesData[0].totalAmount) /
        (salesDataLength - 1);

      let nextMonthForecast = salesData[salesDataLength - 1].totalAmount;
      let forecastData = [];
      for (let i = 1; i <= numMonths; i++) {
        nextMonthForecast += averageGrowthRate;
        forecastData.push({
          month: `Forecast ${i}`,
          totalAmount: nextMonthForecast,
        });
      }

      setForecast(forecastData);
    } else {
      alert("Not enough data to calculate forecast");
    }
  };

  return (
    <div>
      <button
        onClick={() => calculateForecast(3)}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Calculate Forecast
      </button>
      <Row>
        <Col>
          <table className='table table-bordered mt-3'>
            <thead>
              <tr>
                <th>Month</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale) => (
                <tr key={sale.month}>
                  <td>{sale.month}</td>
                  <td>{sale.totalAmount}</td>
                </tr>
              ))}
              {forecast &&
                forecast.map((fc) => (
                  <tr key={fc.month}>
                    <td>{fc.month}</td>
                    <td>{fc.totalAmount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Col>
        <Col>
          <div id='chart' style={{ height: "300px" }}></div>
        </Col>
      </Row>
    </div>
  );
};
export default Forecast;
