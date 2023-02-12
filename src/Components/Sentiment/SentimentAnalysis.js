/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFoodreviews } from "../../store/shopping-cart/reviewSlice";
import axios from '../../axios'
import {Col,Row} from 'react-bootstrap'
import Sentiment from "sentiment";
import { useCookies } from "react-cookie";
import SentimentComparison from "./SentimentComparison";
const SentimentAnalysis = () => {
  const sentiment = new Sentiment();
  const [cookies, setCookie] = useCookies(null);
  const [sentimentScore, setSentimentScore] = useState(0);
  const [sentimentType, setSentimentType] = useState("");

  const [error, setError] = useState(null);
  const restaurantId = cookies.restaurantId;
  const reviewList = useSelector((state) => state.foodreview.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodreviews(restaurantId));
  }, []);

  useEffect(() => {
    if (reviewList.length > 0) {
      try {
        const reviewsString = reviewList
          .map((review) => review.description)
          .join(" ");

        function analyzeSentiment(reviewsString) {
          const result = sentiment.analyze(reviewsString);
          return result.score;
        }

        const newSentimentScore = analyzeSentiment(reviewsString);
        if (newSentimentScore !== undefined) {
          setSentimentScore(newSentimentScore);
          if (newSentimentScore >= 10) {
            setSentimentType(
              "Excellent: A rating of 5 out of 5, indicating an exceptional experience, outstanding food and service. Keep Going!!"
            );
          } else if (newSentimentScore >= 5) {
            setSentimentType(
              "Good: a rating of 3 out of 5, indicating an average experience with decent food and service."
            );
          } else if (newSentimentScore >= 3) {
            setSentimentType("Neutral");
          } else {
            setSentimentType(
              "Negative: a rating of 1 out of 5, indicating a very negative experience with significant issues in food or service."
            );
          }
        }
        axios.put(`rest/restaurants/${restaurantId}/sentiment-score`, {
          sentimentScore: newSentimentScore,
        });
      } catch (error) {
        setError("Error calculating sentiment score");
      }
    }
    
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h5>Overall Performance Result based on Customer Reviews</h5>
      <div className='row mb-3'>
        <div className='col-xl-3 col-sm-6 py-2'>
          <div className='card bg-success text-white h-100'>
            <div className='card-body bg-success'>
              <div className='rotate'></div>
              <h6 className='text-uppercase mt-3'>Overall Score</h6>
              <h1 className='display-4' style={{ color: "#fff" }}>
                {sentimentScore}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: "1px solid black",
          paddingTop: "20px",
          paddingLeft: "5px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <p style={{ fontWeight: 600, fontSize: 18 }}> {sentimentType}</p>
      </div>
      <Row><Col> <SentimentComparison/></Col><Col></Col></Row>
     
    </div>
  );
};

export default SentimentAnalysis;
