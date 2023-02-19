import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "../Location/Location.css";
import {Row,Col} from 'react-bootstrap'
import RestaurantCard from "../Restaurants/RestaurantCard/RestaurantCard";
import { getLocationRestaurant } from "../../store/shopping-cart/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
const LocationBasedSearch = () => {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState([]);

  const restaurantList = useSelector((state) => state.restaurant.location);
  const dispatch = useDispatch();

  const fetchSuggestions = async (address) => {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=pk.de89a66c75d2c7e2838b70033a082722&q=${address}&format=json`
    );
    setSuggestions(response.data.slice(0, 4));
  };

  useEffect(() => {
    if (address) {
      fetchSuggestions(address);
    } else {
      setSuggestions([]);
    }
  }, [address]);

  const handleInputChange = (e) => {
    setAddress(e.target.value);
    
  };

  const handleSuggestionSelection = (suggestion) => {
    setAddress(suggestion.display_name);
    setSuggestions([]);
    setLocation([suggestion.lat, suggestion.lon]);
  };
  
  
  const getRestaurants = async (e) => {
    e.preventDefault();
    dispatch(getLocationRestaurant(address.split(",")[0]));
  };

  return (
    <div>
      {" "}
      <form onSubmit={getRestaurants}>
        <Row><Col> <div className='search-main'> 
        <div className='search'>  <input type="text" value={address} onChange={handleInputChange} placeholder='Search location....'/>
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionSelection(suggestion)}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
       </div></div></Col><Col> <button type="submit"  className="addToCart__btn" >Search</button></Col></Row>
       
      
       
      </form>
      {restaurantList.length !== 0 && (
        <>
          <div className="row d-flex justify-content-between ">
            {restaurantList.map((u) => (
              <RestaurantCard key={u._id} restaurant={u} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LocationBasedSearch;
