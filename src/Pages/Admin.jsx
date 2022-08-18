import React, { useEffect, useState } from 'react'

import Topbar from '../Components/Admin/Topbar/Topbar'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'

import Manage from '../Components/Admin/Manage/Manage'
import { getRestaurants } from "../store/shopping-cart/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";

import Tab from 'react-bootstrap/Tab';




const Admin = () => {
  const restaurantLIst = useSelector((state) => state.restaurant.list);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRestaurants());
  }, []);
  return (
    <div>

      <Container fluid>

        <Row>
          <Col> <Topbar /></Col>
        </Row>


      </Container>
      <br></br>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#home">
        <Row>
          <Col sm={2}>
            <ListGroup>
              <ListGroup.Item action href="#home">
                <i class="ri-home-2-line"></i>  Home
               
              </ListGroup.Item>
              <ListGroup.Item action href="#restaurant">
                <i class="ri-edit-box-line"></i> Restaurant Manage
                
              </ListGroup.Item>
              <ListGroup.Item action href="#deliveryboy">
                <i class="ri-edit-box-line"></i> Delivery Boy Manage
                
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#home">
             Page under construction
              </Tab.Pane>
              <Tab.Pane eventKey="#restaurant">
                <div>
                  <table className='table table-bordered'>
                    <thead>
                      <tr>

                        <th>Restaurant Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>FSSAI License</th>
                        <th>Trade License</th>
                        <th>Fire and Safety License</th>
                        <th>Certificate Of Environmental Clearance</th>
                        <th>Kitchen Image</th>
                       
                        <th>Action</th>
                      </tr>
                    </thead>

                    {restaurantLIst.map((u) => (
                      <Manage key={u.id} restaurant={u} />

                    ))}


                  </table>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="#deliveryboy">
                Page under construction
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

    </div>

  )

}
export default Admin
