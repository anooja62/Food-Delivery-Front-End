

import React,{useEffect} from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";

import { getRestaurants } from "../../store/shopping-cart/restaurantSlice";
import { getUsers } from "../../store/shopping-cart/userSlice";
import { getDeliveryboys } from "../../store/shopping-cart/deliverySlice";
const PieChart = () => {
  const restaurantLIst = useSelector((state) => state.restaurant.list);
  const userList = useSelector((state) => state.user.list);
  const deliveryboyLIst = useSelector((state) => state.deliveryboy.list);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestaurants());
    dispatch(getUsers());
    dispatch(getDeliveryboys());
  }, []);
  const restNo = restaurantLIst.length;
  const userNo = userList.length;
  const deliveryNo = deliveryboyLIst.length;

const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Overall Statistics'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Restaurants',
          y: restNo,
          sliced: true,
          selected: true
        }, {
          name: 'Users',
          y: userNo
        }, {
          name: 'Delivery Boys',
          y: deliveryNo
        },  
     ]
      }]
    }
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    );
  }

export default PieChart;