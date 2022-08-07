import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
import Topbar from '../Components/Admin/Topbar/Topbar'
import { Container, Row, Col } from 'react-bootstrap'
import Adminhome from '../Components/Admin/Adminhome/Adminhome'
import Manage from '../Components/Admin/Manage/Manage'
import { getRestaurants } from "../store/shopping-cart/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";

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
          <Row>
            <Col> <Topbar /></Col>
          </Row>
          <Row>
            <Col xs lg="2"> <Sidebar /></Col>

            <Col>
              <div>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      
                      <th>Restaurant Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  {restaurantLIst.map((u) => (
                    <Manage key={u.id} restaurant={u} />

                  ))}


                </table>
              </div>
            </Col>

          </Row>
        </Row>
      </Container>



    </div>

  )

}
export default Admin
