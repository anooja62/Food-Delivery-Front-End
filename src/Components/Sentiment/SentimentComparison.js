import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useCookies } from "react-cookie";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const SentimentComparison = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [averageData, setAverageData] = useState(null);
  const [cookies, setCookie] = useCookies(null);
  const restaurantId = cookies.restaurantId;

  useEffect(() => {
    async function fetchRestaurantData() {
      try {
        const response = await axios.get(`rest/restaurants/${restaurantId}/sentiment-score`);
        const restaurantScore = response.data.sentimentScore;
        setRestaurantData(restaurantScore);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchAverageData() {
      try {
        const response = await axios.get("rest/sentiment-score-average");
        const averageScore = response.data.averageSentimentScore;
        setAverageData(averageScore);
      } catch (error) {
        console.log(error);
      }
    }

    fetchRestaurantData();
    fetchAverageData();
  }, []);

  if (!restaurantData || !averageData) {
    return <div>Loading...</div>;
  }

  const chartData = {
    title: {
      text: "Review Score Comparison Chart"
    },
    xAxis: {
      categories: ["Restaurant Score", "Average Score"]
    },
    yAxis: {
      title: {
        text: "Review Scores"
      }
    },
    series: [{
      name: "Review Scores",
      data: [restaurantData, averageData]
    }]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartData} />
    </div>
  );
};

export default SentimentComparison;
