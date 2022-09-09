import React, { useEffect, useState } from "react";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Row, Col } from "react-bootstrap";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import Menu from "./Menu/Menu";

import "../../styles/restaurantui.css";
import { getMenus } from "../../store/shopping-cart/menuSlice";

import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import About from "./About/About";

import "react-toastify/dist/ReactToastify.css";
import Details from "./Details/Details";
import { useCookies } from "react-cookie";
import { addCart } from "../../store/shopping-cart/cartSlice";
const RestaurantUI = () => {
  let { id } = useParams();
  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  const menuLIst = useSelector((state) => state.menu.list);
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const cartDbUpdated = useSelector((state) => state.cart.dbUpdated);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenus(id));
  }, []);
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
    dispatch(addCart(arr[0]));
  }, [cartProducts, totalAmount]);

  console.log(arr);

  return (
    <div>
      <div style={{ marginLeft: 35 }}>
        <Details />
      </div>

      <div className="emenu mt-5">
        <Tabs>
          <TabList>
            <Tab>
              <p>
                <LocalDiningOutlinedIcon /> E Menu Card
              </p>
            </Tab>
            <Tab>
              <p>
                <FastfoodIcon /> Combos
              </p>
            </Tab>
            <Tab>
              <p>
                <StarHalfIcon /> Reviews
              </p>
            </Tab>
            <Tab>
              <p>
                <FoodBankIcon /> About Us
              </p>
            </Tab>
          </TabList>

          <TabPanel>
            <div className="panel-content">
              <h4>Order Now !</h4>
              <Row>
                <Col lg="6" md="6" sm="6" xs="12">
                  <div className="search__widget d-flex align-items-center justify-content-between">
                    <input type="text" placeholder="I'm looking for....." />
                    <span>
                      <i class="ri-search-line"></i>
                    </span>
                  </div>
                </Col>
              </Row>

              <div className="row d-flex justify-content-between ">
                {menuLIst.map((u) => {
                  return <Menu key={u.id} menu={u} />;
                })}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content"></div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2 className="text-center">Add review</h2>
              <form>
                <div className="new__register">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                  ></input>
                </div>
                <div className="new__register">
                  <label>Review</label>
                  <div className="new__register">
                    <textarea rows={5} placeholder="Review...."></textarea>
                  </div>
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <About />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default RestaurantUI;
