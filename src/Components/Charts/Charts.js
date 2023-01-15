/** @format */

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getRestaurants } from "../../store/shopping-cart/restaurantSlice";
const Charts = () => {
  const restaurantLIst = useSelector((state) => state.restaurant.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestaurants());
  }, []);
  const restNo = restaurantLIst.length;

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
        data: [restNo, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Charts;
