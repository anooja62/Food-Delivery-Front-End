/** @format */
import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { loacationBasedOrder } from "../../../store/shopping-cart/ordersSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewOrders = () => {
  const [cookies, removeCookie] = useCookies(null);
  const deliveryboyId = cookies.deliveryboyId;
  const deliveryboyLocation = cookies.deliveryboyLocation;
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState([]);
  const deliveryboyLocationRef = useRef();
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
    dispatch(loacationBasedOrder(suggestion));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const deliveryboy = {
      location: deliveryboyLocationRef.current.value,
    };
    try {
      const deliveryboys = await axios.put(
        `/deli/update-delivery/${deliveryboyId}`,
        deliveryboy
      );
      toast.success("Location Saved Successully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='new__register'>
        <label style={{ marginRight: "10px" }}>Save your location</label>
      </div>

      <div
        className='new__register'
        style={{ display: "flex", flexDirection: "row" }}
      >
        <form>
          <div
            className='search-main'
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className='search'>
              <input
                type='text'
                value={address}
                onChange={handleInputChange}
                placeholder='Search location....'
                ref={deliveryboyLocationRef}
                style={{ marginRight: "10px" }}
              />
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
            </div>

            <button
              type='submit'
              onClick={handleClick}
              style={{
                padding: "21px 10px",
                backgroundColor: "#E67E22",
                color: "white",
                fontWeight: "600",
                borderRadius: "5px",
              }}
            >
              Save Location
              <ToastContainer
                position='top-center'
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </button>
          </div>
        </form>
      </div>
      <div className='new__register'>
        <label>
          Selected location :{" "}
          <p style={{ color: "green", fontWeight: "600" }}>
            {deliveryboyLocation}
          </p>{" "}
        </label>
      </div>
    </>
  );
};

export default NewOrders;
