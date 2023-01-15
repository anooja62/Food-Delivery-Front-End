import React,{useState,useEffect} from 'react'
import axios from '../../axios';
import '../Location/Location.css'
const LocationBasedSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState([]);
  const [address, setAddress] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const handleLocationChange = (e) => {
    setAddress(e.target.value);
  };
    // handle search request
    const handleSearch = (e) => {
      e.preventDefault();
  
      // make GET request to Swiggy API
      axios
        .get(`/restaurant/search${query}`)
        .then((res) => {
          // set restaurants state
          setRestaurants(res.data.restaurants);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const fetchSuggestions = async (query) => {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=pk.de89a66c75d2c7e2838b70033a082722&q=${query}&format=json`
      );
      setSuggestions(response.data);
    };
  
    useEffect(() => {
      if (query) {
        fetchSuggestions(query);
      } else {
        setSuggestions([])
      }
    }, [query]);
  
    const handleInputChange = (e) => {
      setQuery(e.target.value);
    };
  
    const handleSuggestionSelection = (suggestion) => {
      setQuery(suggestion.display_name);
      setSuggestions([]);
      setLocation([suggestion.lat,suggestion.lon]);
    };
   
  return (
    <div>    <form onSubmit={handleSearch}>
    <input type="text" value={query} onChange={handleInputChange} />
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
  <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>
  </div>
  )
}

export default LocationBasedSearch