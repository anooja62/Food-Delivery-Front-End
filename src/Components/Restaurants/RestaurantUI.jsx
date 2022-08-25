import React,{useState} from 'react'

import { Container, Row, Col } from 'react-bootstrap'



import dineout1 from '../../assets/images/dineout1.jpg'
import dineout2 from '../../assets/images/dineout2.jpg'
import dineout3 from '../../assets/images/dineout3.jpg'
import dineout4 from '../../assets/images/dineout4.jpg'
import dineout5 from '../../assets/images/dineout5.jpg'
import dineout6 from '../../assets/images/dineout6.jpg'
import '../../styles/restaurantui.css'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

 const RestaurantUI = () => {
    
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
      <h3 className='mt-5'>E Menu Card</h3>
      <Tabs>
        <TabList>
          <Tab>
            <p>Recommended</p>
          </Tab>
          <Tab>
          <p>Special</p>
           
          </Tab>
          <Tab>
          <p>Burgers</p>
          </Tab>
          <Tab>
            <p>Snacks</p>
          </Tab>
          <Tab>
            <p>Salads</p>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="panel-content">
            <h2>Any content 1</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 2</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 3</h2>
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
