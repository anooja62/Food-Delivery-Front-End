import React, { useEffect, useRef } from "react";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Row, Col } from "react-bootstrap";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import Menu from "./Menu/Menu";
import Combo from "./Combo/Combo";

import "../../styles/restaurantui.css";
import { getMenus } from "../../store/shopping-cart/menuSlice";
import { getCombos } from "../../store/shopping-cart/comboSlice";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

import { useParams,useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import About from "./About/About";
import Details from "./Details/Details";

import AddReview from "./Review/AddReview";


const RestaurantUI = () => {
  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  const navigate = useNavigate()
  if(!userId){
    navigate('/login')
   }
  let { id } = useParams();

  const menuLIst = useSelector((state) => state.menu.list);
  const comboList = useSelector((state) => state.combo.list);
  
  const cartProducts = useSelector((state) => state.cart.cartItems);
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenus(id));
    dispatch(getCombos(id));
   
  }, []);

  

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
             
              <div className="row d-flex justify-content-between ">
                {menuLIst.map((u) => {
                  return <Menu key={u.id} menu={u} />;
                })}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content ">
              <div className="row d-flex justify-content-between ">
                {comboList.map((u) => {
                  return <Combo key={u.id} combo={u} />;
                })}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              
              <div style={{ marginLeft: 150, marginRight: 200 }}>
         
              </div>
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
