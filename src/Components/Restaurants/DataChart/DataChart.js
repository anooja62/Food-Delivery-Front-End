/** @format */

import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { useCookies } from "react-cookie";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const DataChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("order/by-month")
      .then(response => {
        setData(response.data);
      });
  }, []);
  const options = {
    chart: {
      type: "column"
    },
    title: {
      text: "Orders by Month and Restaurant"
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: "Orders"
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: data.map(d => d._id.restaurantId),
        data: data.map(d => {
          let month = d._id.month - 1;
          return { y: d.totalOrders, x: month };
        })
      }
    ]
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default DataChart;
