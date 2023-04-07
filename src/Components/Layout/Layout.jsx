import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routes from "../../routes/Routers";
import Carts from "../UI/cart/Carts";
import { useSelector } from "react-redux";

function Layout() {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);

  // Check if the current URL includes "admin"
  const isAdminPage = window.location.pathname.includes("admin");

  return (
    <div role="parent">
      {!isAdminPage && <Header />}

      {showCart && <Carts />}

      <div>
        <Routes /> 
      </div>

      {!isAdminPage && <Footer />}
    </div>
  );
}

export default Layout;
