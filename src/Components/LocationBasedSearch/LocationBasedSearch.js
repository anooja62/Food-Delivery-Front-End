import React,{useState,useEffect} from 'react'
import axios from '../../axios';
import '../Location/Location.css'

import RestaurantCard from '../Restaurants/RestaurantCard/RestaurantCard';
import { getLocationRestaurant } from '../../store/shopping-cart/restaurantSlice';
import { useDispatch, useSelector } from "react-redux";
const LocationBasedSearch = () => {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState([]);
 
  const [restaurants, setRestaurants] = useState([]);
  const restaurantList = useSelector((state) => state.restaurant.location);
  const dispatch = useDispatch();
  useEffect(() => {
   
    dispatch(getLocationRestaurant())
  },[]);
 ;
    

    const fetchSuggestions = async (address) => {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=pk.de89a66c75d2c7e2838b70033a082722&q=${address}&format=json`
      );
      setSuggestions(response.data);
    };
  
    useEffect(() => {
      if (address) {
        fetchSuggestions(address);
      } else {
        setSuggestions([])
      }
    }, [address]);
  
    const handleInputChange = (e) => {
      setAddress(e.target.value);
    };
  
    const handleSuggestionSelection = (suggestion) => {
      setAddress(suggestion.display_name);
      setSuggestions([]);
      setLocation([suggestion.lat,suggestion.lon]);
    };
    const getRestaurants = async (e) => {
      e.preventDefault();
      const res = await axios.get(`/rest/search/${address}`);
     console.log('yess')
     
    };
   
  return (
    <div>    <form onSubmit={getRestaurants}>
    <input type="text" value={address} onChange={handleInputChange} />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionSelection(suggestion)}>
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
        <input type="submit" value="Search" />
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
  )
}

export default LocationBasedSearch