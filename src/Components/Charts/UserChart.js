/** @format */

import React, { useEffect, useState } from "react";
import axios from "../../axios";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const UserChart = () => {
  const [monthlyUserCount, setMonthlyUserCount] = useState([]);

  useEffect(() => {
    const fetchMonthlyUserCount = async () => {
      try {
        const response = await axios.get("/auth/monthly-user-count");
        setMonthlyUserCount(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMonthlyUserCount();
  }, []);

  const options = {
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
        "Dec",
      ],
    },
    yAxis: {
      title: {
        text: "Number of Users ",
      },
    },
    title: {
      text: "Users Statistics",
    },
    series: [
      {
        name: "Monthly User Count",
        data: monthlyUserCount.map((entry) => entry.count),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default UserChart;
