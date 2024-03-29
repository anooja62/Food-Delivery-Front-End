import React, { useRef, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import logo from "../../assets/images/deliorderlogo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import { useSelector, useDispatch } from "react-redux";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import { useCookies } from "react-cookie";

import userimg from "../../assets/images/userimg.png";
import userpic from "../../assets/images/userpic.png";
import useredit from "../../assets/images/useredit.png";
import logout from "../../assets/images/logout.png";
import bag from "../../assets/images/bag.png";
import {
  userCart,
  cartActions,
  addCart,
} from "../../store/shopping-cart/cartSlice";
const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const toggleMenu = () => menuRef?.current?.classList?.toggle("show__menu");
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const user = cookies.name;
  const isAdmin = cookies.isAdmin;
  const userId = cookies.userId;
  const [toggle, setToggle] = useState(false);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();
  const apiCallRequired = useSelector((state) => state.cart.apiCallRequired);

 
  const cartDbUpdated = useSelector((state) => state.cart.dbUpdated);

  useEffect(() => {
    dispatch(userCart(userId));
  }, []);
  useEffect(() => {
    dispatch(cartActions.calculations());
  }, [cartProducts]);

  let arr = [
    {
      userId: userId,
      products: [],
    },
  ];

  const objForApi = (cart) => {
    for (let i = 0; i < cart.length; i++) {
      let obj = {
        products: {
          ProductId: "",
          quantity: "",
        },
      };
      obj.products.ProductId = cartProducts[i]._id;
      obj.products.quantity = cartProducts[i].quantity;
      arr[0].products.push(obj.products);
    }
  };
  useEffect(() => {
    
    objForApi(cartProducts);
    if (apiCallRequired) {
      dispatch(addCart(arr[0]));
    }
  }, [cartProducts, totalAmount]);

  
  const clearCookies = () => {
    removeCookie("name");
    removeCookie("email");
    removeCookie("phone");
    removeCookie("isAdmin");
    removeCookie("userId");
    navigate("/home");
  };

  if (!user) {
    var nav__links = [
      {
        display: "Home",
        path: "/home",
      },

      {
        display: "Add restaurant",
        path: "/restaurant",
      },

      {
        display: "Login",
        path: "/login",
      },
      {
        display: "Sign Up",
        path: "/register",
      },
    
    ];
  } else {
    nav__links = [
      {
        display: "Home",
        path: "/home",
      },
      

      {
        display: "Cart",
        path: "/cart",
      },
      {
        display: "Add restaurant",
        path: "/restaurant",
      },
      {
        display: "Orders",
        path: "/orders",
      },
      {
        display: "Profile",
        path: "/profile",
      },
    ];
  }

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
 
  useEffect(() => {
   
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef?.current?.classList?.add("header__shrink");
      } else {
        headerRef?.current?.classList?.remove("header__shrink");
      }
    });
    return () => window.removeEventListener("scroll", null);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo ">
            <img src={logo} alt="logo" />
          </div>
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
              {user && (
                <NavLink
                  to="/login"
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                  onClick={() => clearCookies()}
                >
                  Sign Out
                </NavLink>
              )}
            </div>
          </div>
          <div className="navbar__right d-flex align-items-center gap-4">
            {user && (
              <div className="user">
                <span >
                  <img src={userimg} alt=""></img> {user}{" "}
                </span>
              </div>
            )}
         

            <span className="cart_icon" onClick={toggleCart}>
              <i class="ri-shopping-basket-fill"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
