import React from 'react'
import Slider from "react-slick";


import '../../../styles/slider.css'

const TestimonialSlider = () => {
    const settings={
        dots:true,
        autoplay:true,
        infinite:true,
        speed:1000,
        autoplaySpeed:3000,
        swipeToSlide:true,
        slidesToShow:1,
        slidesToScroll:1
    }
  return <Slider{...settings}>
<div className='slider__content d-flex align-items-center gap-3'>
           <p className="review__text">"In publishing and graphic design, 
           Lorem ipsum is aplaceholder text commonly used to demonstrate 
           the visual form of a document or a typeface without relying on"</p>
           <div>
           
            <h6>John Doe</h6>
           </div>
          </div>

          <div className='slider__content d-flex align-items-center gap-3'>
            <p className="review__text">"In publishing and graphic design, 
           Lorem ipsum is aplaceholder text commonly used to demonstrate
           the visual form of a document or a typeface without relying on
           "</p>
           <div>
           
            <h6>Reign</h6>
           </div>
          </div>
          <div className='slider__content d-flex align-items-center gap-3'>
            <p className="review__text">"In publishing and graphic design, 
           Lorem ipsum is aplaceholder text commonly used to demonstrate
           the visual form of a document or a typeface without relying on 
           "</p>
           <div>
            
            <h6>Micky</h6>
           </div>
          </div>
  </Slider>
    
  
}

export default TestimonialSlider