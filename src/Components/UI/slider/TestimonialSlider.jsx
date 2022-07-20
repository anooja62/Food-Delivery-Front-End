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
           <p className="review__text">"This has been a very easy and convenient application to use.
           I am pleased. Any time I have a question you guys respond so quickly and it's always helpful. 
           I love Deliorder!"</p>
           <div>
           
            <h6>John</h6>
           </div>
          </div>

          <div className='slider__content d-flex align-items-center gap-3'>
            <p className="review__text">"The system works really really good. It is very easy for the customer to use. 
            I am getting good feedback. Thank you!!
           "</p>
           <div>
           
            <h6>Reign</h6>
           </div>
          </div>
          <div className='slider__content d-flex align-items-center gap-3'>
            <p className="review__text">"It is a fantastic platform with sophisticated functions and high flexibility! It facilitates small businesses like us to receive online orders at zero cost during this difficult pandemic period. 
            Highly recommended!
           "</p>
           <div>
            
            <h6>Micky</h6>
           </div>
          </div>
  </Slider>
    
  
}

export default TestimonialSlider