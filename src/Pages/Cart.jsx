import React from 'react'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import {useSelector} from 'react-redux'
import {Container,Row,Col} from 'react-bootstrap'
import '../styles/cart-page.css'

function Cart() {
  return <Helmet title='Cart'>
    <CommonSection title='Your Cart'/>
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Delete</th>
                </tr>
              </thead>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Cart