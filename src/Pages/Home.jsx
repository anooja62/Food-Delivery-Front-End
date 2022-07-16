import React from 'react'
import Helmet from '../Components/Helmet/Helmet.js'
import {Container,Row,Col, Button} from 'react-bootstrap'
import heroImg from '../assets/images/hero.png'
import '../styles/maincontent.css'
import {Link} from 'react-router-dom'
const Home=()=> {
  return <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
<h5 className='mb-3'>Deliorder</h5>
<h1 className='mb-4 hero__title' ><span>Hungry ? </span>just wait <br/>food at <span> your door</span></h1>
<p>In publishing and graphic design, Lorem ipsum is a placeholder text </p>
<div className="hero__btns d-flex align-items-center gap-5 mt-4">
  <button className='order__btn d-flex align-items-center justify-content-between'>Order now<i class="ri-arrow-right-s-line"></i></button>
  <button className='all__foods-btn'><Link to='/foods'>See all food menu</Link></button>
</div>
<div className='d-flex align-items-center gap-5'>
  <p className='d-flex align-items-center gap-2'><span className='delivery__icon'><i class="ri-car-line"></i></span>No delivery charge</p>
  <p className='d-flex align-items-center gap-2'><span className='delivery__icon'><i class="ri-shield-check-line"></i></span>100 % Secure checkout</p>
</div>
              </div>

            </Col>
            <Col lg='6' md='6'>
              <div className="hero__img">
                <img src={heroImg} alt='mainpic' className='w-100'/>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>;
  
};

export default Home