import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from "react-redux";
import { mostPopularFood } from '../../../store/shopping-cart/ordersSlice';
function HighDemandingFoods() {

  const [cookies, setCookie] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  const mostPopularFoodList = useSelector((state) => state.order.mostPopularFoods) 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mostPopularFood(restaurantId));
  }, []);
console.log(mostPopularFoodList,"modt")
  return (
    <div>
      <h2>Highest Demanding Foods</h2>
      <ul>
        {mostPopularFoodList.map((u) => (
          <li key={u?.id}> {u}</li>
        ))}
      </ul>
    </div>
  );
}

export default HighDemandingFoods;
