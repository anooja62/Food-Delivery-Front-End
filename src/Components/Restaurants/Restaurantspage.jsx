/** @format */

import React from "react";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import LocationBasedSearch from "../LocationBasedSearch/LocationBasedSearch";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Restaurantspage = () => {
  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  const navigate = useNavigate();
  if (!userId) {
    navigate("/login");
  }

  return (
    <>
    <Header/>
      <div style={{ marginLeft: 80, marginRight: 80 }}>
        <h3 className='mt-2'>Order food from your favourite restaurants</h3>
        <LocationBasedSearch />
      </div>
      <Footer/>
    </>
  );
};

export default Restaurantspage;
