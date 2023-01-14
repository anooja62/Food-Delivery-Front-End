import React, { useState, useEffect } from "react";
import axios from 'axios';

const UserLocation = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState([]);
  const [locationInfo, setLocationInfo] = useState({});
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
 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const response = await axios.get(
        `https://us1.locationiq.com/v1/reverse.php?key=pk.de89a66c75d2c7e2838b70033a082722&lat=${latitude}&lon=${longitude}&format=json`
      );

      setLocationInfo(response.data);
    });
  }, []);
  return (
    <div>
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
         <div>
      <p>Your current address is:</p>
      <p>
        {locationInfo.address &&
          `${locationInfo.address.road}, ${locationInfo.address.city}, ${locationInfo.address.state}, ${locationInfo.address.postcode}`}
      </p>
    </div>
    </div>
  );
};

export default UserLocation;