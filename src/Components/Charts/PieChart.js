
import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    axios.get('/rest/top-restaurants')
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const chartOptions = {
    title: {
      text: 'Top 4 Performing Restaurants'
    },
    xAxis: {
      categories: restaurants.map(r => r.name)
    },
    yAxis: {
      title: {
        text: 'Sentiment Score'
      }
    },
    series: [{
      name: 'Sentiment Score',
      data: restaurants.map(r => r.sentimentScore)
    }]
  };

  return (
    
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  )
}

export default PieChart