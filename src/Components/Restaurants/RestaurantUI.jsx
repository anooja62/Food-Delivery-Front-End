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



 const RestaurantUI = () => {
    const [tab, setTab] = useState('desc');
  return (
    <div>
        <section className='first__sec'>
            <h2>DineOut</h2>
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
        <SwiperSlide><img src={dineout1}/></SwiperSlide>
        <SwiperSlide><img src={dineout2}/></SwiperSlide>
        <SwiperSlide><img src={dineout3}/></SwiperSlide>
        <SwiperSlide><img src={dineout4}/></SwiperSlide>
        <SwiperSlide><img src={dineout5}/></SwiperSlide>
        <SwiperSlide><img src={dineout6}/></SwiperSlide>
        
      </Swiper>
      
      <div className="tabs d-flex align-items-center gap-5 py-3 mt-3">
              <h6 className={`${tab === 'desc' ? 'tab__active' : ''}`} onClick={() => setTab('desc')}>Order Online</h6>
              <h6 className={`${tab === 'rev' ? 'tab__active' : ''}`} onClick={() => setTab('rev')}>Reviews</h6>
            </div>
            {
              tab === 'desc' ? <div className="tab__content"> <p>hvszx</p></div> : <div className="tab__form mb-3">
                <div className="review pt-5">
                  <p className="user__name mb-0">
                    John Doe
                  </p>
                 
                  <p className='feedback__text'>
                    Great Product
                  </p>
                </div>

              
                <Col lg='6' md='6' sm='12' className='m-auto '>
                
                </Col>
              </div>
            }
            </section>
      
    </div>
  )
}

export default RestaurantUI
