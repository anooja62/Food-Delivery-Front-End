/** @format */

import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {Row,Col} from 'react-bootstrap';
const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    axios
      .get("/pay/total-amount-per-month")
      .then((res) => {
        if (res.status === 200) {
          setSalesData(res.data.payments);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const filteredSalesData = salesData.filter(
    (sale) => !selectedYear || Number(sale.year) === Number(selectedYear)
  );
  const chartOptions = {
    title: {
      text: `Sales Data for ${selectedYear || "All Years"}`,
    },
    xAxis: {
      categories: filteredSalesData.map((sale) => sale.month),
    },
    yAxis: {
      title: {
        text: "Sales Amount",
      },
    },
    series: [
      {
        name: "Sales Amount",
        data: filteredSalesData.map((sale) => sale.totalAmount),
      },
    ],
  };
  return (
    <div>
      <select
        onChange={handleYearChange}
        style={{ width: 200, height: 30, fontSize: 16, marginBottom: 20 }}
      >
        <option value={null}>Select Year</option>
        {Array.from(new Set(salesData.map((sale) => sale.year))).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <Row>
        <Col>
        <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Month</th>
            <th>Sales Amount</th>
            <th>Change in sales</th>
          </tr>
        </thead>
        <tbody>
          {salesData
            .filter(
              (sale) =>
                !selectedYear || Number(sale.year) === Number(selectedYear)
            )
            .map((sale, index, filteredData) => {
              const previousMonthData =
                index > 0 ? filteredData[index - 1] : null;

              let changePercent = 0;
              if (previousMonthData) {
                changePercent =
                  ((sale.totalAmount - previousMonthData.totalAmount) * 100) /
                  previousMonthData.totalAmount;
              }

              return (
                <tr key={sale.month + sale.year}>
                  <td>{sale.month}</td>
                  <td>₹ {sale.totalAmount}</td>
                  <td>
                    {previousMonthData ? (
                      <>
                        {previousMonthData.totalAmount !== 0 ? (
                          changePercent > 0 ? (
                            <p style={{ color: "green", fontWeight: 600 }}>
                              {changePercent.toFixed(2)}% Increase
                            </p>
                          ) : (
                            <p style={{ color: "red", fontWeight: 600 }}>
                              {Math.abs(changePercent).toFixed(2)}% Decrease
                            </p>
                          )
                        ) : (
                          "Insufficient data"
                        )}
                      </>
                    ) : (
                      "Insufficient data"
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
        </Col>
        <Col>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Col>
      </Row>
     
     
    </div>
  );
};

export default Sales;
