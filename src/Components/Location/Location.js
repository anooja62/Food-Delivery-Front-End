import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from '../../axios'
const RestaurantsMap = () => {
  
  const [address, setAddress] = useState('');
  const [restaurants, setRestaurants] = useState([]);

 
    const getRestaurants = async (e) => {
      const res = await axios.get(`/rest/search/${address}`);
     
      setRestaurants(res);
    };
    getRestaurants();
 
  console.log(address)
  return (
    <div>
          <input
        type="text"
        placeholder="Enter a location..."
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
         <button onClick={getRestaurants}>Find Restaurants</button>
      {restaurants.map(restaurant => (
        <div key={restaurant._id}>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.address}</p>
        </div>
      ))}
    </div>
  );
};

export default RestaurantsMap;