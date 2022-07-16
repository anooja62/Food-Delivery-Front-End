import React from 'react'
import logo from '../../assets/images/deliorderlogo.png'
import {Container,Row,Col,ListGroup,ListGroupItem} from 'react-bootstrap'
import '../../styles/footer.css'
import {Link} from 'react-router-dom'
function Footer() {
  return (
    <div>
      <footer className="footer">
        <Container>
          <Row>
            <Col lg='3' md='4' sm='6'>
              <div className=' footer__logo text-start'>
                <img src={logo} alt='logo'/>
                      <p>it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.  </p>
                
              </div>

            </Col>
            <Col lg='3' md='4' sm='6'>
            <h5 className='footer_title' >Delivery Time</h5>
            <ListGroup className='delivery__time-list'>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Monday - friday</span>
                <p>10:00am - 11:00pm</p>
              </ListGroupItem>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Saturday - Sunday</span>
                <p>9:00am - 11:00pm</p>
              </ListGroupItem>
            </ListGroup>
            </Col>
            <Col lg='3' md='4' sm='6'>
            <h5 className='footer_title'>Contact</h5>
            <ListGroup className='delivery__time-list'>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Phone : 9876543210</span>
                
              </ListGroupItem>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Email : deliorder@gmail.com</span>
                
              </ListGroupItem>
            </ListGroup>
            </Col>
            <Col lg='3' md='4' sm='6'><h5 className='footer_title d-flex '>Newsletter</h5>
            <p>Subscribe for our Newsletter</p>
            <div className="newsletter">
              <input type="email" placeholder='Enter your Email'/>
              <span><i class="ri-send-plane-line"></i></span>
            </div>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col lg='6' md='6'><p className='copyright__text'>Copyright - 2022 Deliorder All Rights Reserved</p></Col>
            <Col lg='6' md='6'>
              <div className="social__links d-flex align-items-center gap-4 justify-content-end">
                <p className='m-0'>Follow: </p>
                <span><Link to='wwww.facebook.com'><i class="ri-facebook-line"></i></Link></span>
                <span><Link to='wwww.instagram.com'><i class="ri-instagram-line"></i></Link></span>
               <span><Link to='www.youtube.com'> <i class="ri-youtube-line"></i></Link></span>
               <span><Link to='www.twitter.com'> <i class="ri-twitter-line"></i></Link></span>
              </div>

            </Col>
            <Col lg='6' md='6'></Col>
          </Row>
        </Container>
      </footer>
      </div>
  )
}

export default Footer