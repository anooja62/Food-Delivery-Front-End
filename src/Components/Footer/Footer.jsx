import React from 'react'
import logo from '../../assets/images/deliorderlogo.png'
import {Container,Row,Col,ListGroup,ListGroupItem} from 'react-bootstrap'
import '../../styles/footer.css'
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
            <Col lg='3' md='4' sm='6'></Col>
            <h5 className='footer_title'>Delivery Time</h5>
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
            <Col lg='3' md='4' sm='6'>
            <h5 className='footer_title'>Contact</h5>
            <ListGroup className='delivery__time-list'>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Phone : </span>
                
              </ListGroupItem>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Saturday - Sunday</span>
                <p>9:00am - 11:00pm</p>
              </ListGroupItem>
            </ListGroup>
            </Col>
            <Col lg='3' md='4' sm='6'>
            </Col>
          </Row>
        </Container>
      </footer>
      </div>
  )
}

export default Footer