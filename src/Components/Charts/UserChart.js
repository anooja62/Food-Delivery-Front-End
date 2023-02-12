import React, { useEffect, useState } from "react";
import axios from "../../axios";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const UserChart = () => {
  const [monthlyUserCount, setMonthlyUserCount] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchMonthlyUserCount = async () => {
      try {
        const response = await axios.get(`auth/total-registered-users-per-month?year=${selectedYear}`);
        setMonthlyUserCount(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMonthlyUserCount();
  }, [selectedYear]);

  const options = {
    xAxis: {
      categories: monthlyUserCount.map((entry) => entry.month),
    },
    yAxis: {
      title: {
        text: "Number of Users",
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
      <label htmlFor="year-select">Select year:</label>
      <select id="year-select" value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)}  style={{ width: 200, height: 30, fontSize: 16, marginBottom: 20 }}>
        {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i).map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default UserChart;

