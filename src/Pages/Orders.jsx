import React from 'react'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import { Container,Row,Col } from 'react-bootstrap'

const Orders = () => {
  return <Helmet title='Orders'>
  <CommonSection title='Your Orders'/>
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
                <th>Status</th>
              </tr>
            </thead>
            </table>

            </Col>
            </Row>
            

            </Container>
            </section>
            </Helmet>
}

export default Orders
