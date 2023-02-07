/** @format */

import React, { useEffect, useState } from "react";
import axios from '../../axios'
import { useCookies } from "react-cookie";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const PieChart = () => {
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
      text: "Orders by Month "
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
     
    },
    yAxis: {
     
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
        name: "Monthly Orders Count",
        data: data.map(d => {
        
          return { y: d.totalOrders };
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

export default PieChart;
