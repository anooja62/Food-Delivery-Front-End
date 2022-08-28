import React,{useEffect} from 'react'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Container, Row, Col } from 'react-bootstrap'
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import dineout1 from '../../assets/images/dineout1.jpg'
import dineout2 from '../../assets/images/dineout2.jpg'
import dineout3 from '../../assets/images/dineout3.jpg'
import dineout4 from '../../assets/images/dineout4.jpg'
import dineout5 from '../../assets/images/dineout5.jpg'
import dineout6 from '../../assets/images/dineout6.jpg'
import '../../styles/restaurantui.css'
import { getMenus } from "../../store/shopping-cart/menuSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Menu from './Menu/Menu';
import Combo from './Combo/Combo';
import { getCombos } from '../../store/shopping-cart/comboSlice';

 const RestaurantUI = () => {

  
  const menuLIst = useSelector((state) => state.menu.list);
  const comboLIst = useSelector((state) => state.combo.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenus());
    dispatch(getCombos());
  }, []);
    
  return (
    <div>
        <section className='first__sec'>
            <h2>Name of the Restaurant</h2>
            <p className='text-muted'>Address of Restaurant</p>
         <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={dineout1} alt=""/></SwiperSlide>
        <SwiperSlide><img src={dineout2} alt=""/></SwiperSlide>
        <SwiperSlide><img src={dineout3} alt=""/></SwiperSlide>
        <SwiperSlide><img src={dineout4} alt=""/></SwiperSlide>
        <SwiperSlide><img src={dineout5} alt=""/></SwiperSlide>
        <SwiperSlide><img src={dineout6} alt=""/></SwiperSlide>
        
      </Swiper>
      </section>
      <div className='emenu'>
      
      <Tabs>
        <TabList>
          <Tab>
            <p><LocalDiningOutlinedIcon/> E Menu Card</p>
          </Tab>
          <Tab>
            <p><FastfoodIcon/> Combos</p>
          </Tab>
          <Tab>
          <p><StarHalfIcon/> Reviews</p>
           
          </Tab>
          <Tab>
          <p><FoodBankIcon/> About Us</p>
          </Tab>
         
        </TabList>

        <TabPanel>
          
          <div className="panel-content">
          <h4>Order Now !</h4>
          {menuLIst.length !== 0 && (
            
            <>
              <div className="row d-flex justify-content-between align-items-center mt-4">
                {menuLIst.map((u) => (
                  
                  <Menu key={u.id} menu={u} />
                ))}
              </div>
            </>
          )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
          {comboLIst.length !== 0 && (
            <>
              <div className="row d-flex justify-content-between align-items-center mt-4">
                {comboLIst.map((u) => (
                  <Combo key={u.id} combo={u} />
                ))}
              </div>
            </>
          )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2 className='text-center'>Add review</h2>
            <form>
              <div className='new__register'>
                <label>Your Name</label>
                <input type="text" name='name' placeholder='Your name'></input>
              </div>
              <div className='new__register'>
              <label>Review</label>
              <div className='new__register'>
                <textarea rows={5} placeholder='Review....'></textarea>
              </div>
              </div>
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 4</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 5</h2>
          </div>
        </TabPanel>
      </Tabs>
      </div>
      
            </div>
    
  )
}

export default RestaurantUI
