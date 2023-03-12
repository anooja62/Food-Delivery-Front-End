/** @format */

import React from "react";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import LocationBasedSearch from "../LocationBasedSearch/LocationBasedSearch";

const Restaurantspage = () => {
  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  const navigate = useNavigate();
  if (!userId) {
    navigate("/login");
  }

  return (
    <>
      <div style={{ marginLeft: 80, marginRight: 80 }}>
        <h3 className='mt-2'>Order food from your favourite restaurants</h3>
        <LocationBasedSearch />
      </div>
    </>
  );
};

export default Restaurantspage;
