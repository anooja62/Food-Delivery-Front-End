import React, { useState } from 'react';
import axios from '../../axios';
import { useCookies } from 'react-cookie'
function Recommendations() {
    const [cookies, setCookie] = useCookies(null)
    const userId = cookies.userId
  const [recommendations, setRecommendations] = useState([]);

 

  const handleGetRecommendations = async () => {
    try {
      const response = await axios.get(`order/recommendations/${userId}`);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
     
      <button onClick={handleGetRecommendations}>Get Recommendations</button>
      {recommendations.length > 0 && (
        <ul>
          {recommendations.map((recommendation) => (
            <li key={recommendation.productId}>{recommendation.foodname}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recommendations;
