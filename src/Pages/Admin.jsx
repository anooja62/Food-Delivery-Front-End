import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Topbar from '../Components/Admin/Topbar/Topbar'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import Deliveryboy from '../Components/Admin/Deliveryboy/Deliveryboy'
import Manage from '../Components/Admin/Manage/Manage'
import Review from '../Components/Admin/Review/Review'
import User from '../Components/Admin/User/User'
import { getRestaurants } from "../store/shopping-cart/restaurantSlice";
import { getDeliveryboys } from "../store/shopping-cart/deliverySlice";
import { getFoodreviews } from "../store/shopping-cart/reviewSlice";
import { getUsers } from "../store/shopping-cart/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import emailjs from '@emailjs/browser';
import {useNavigate} from "react-router-dom"

function MyVerticallyCenteredModal(props) {
const navigate = useNavigate()
  const handleClick =async (e) => {

   console.log(e.target.value)

    e.preventDefault()
   

   emailjs.sendForm("service_pp7cxbu","template_jx2i0sl",e.target,"3HARonvI0a5SrbOi6")

}
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>Add restaurant for online ordering</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      <Form onSubmit={handleClick}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='to' />
        <Form.Text className="text-muted">
         Double check restaurant email for avoiding errors
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" naem='Confirm Password'/>
      </Form.Group>
      
      <Button variant="primary" type="submit" > Submit
      </Button>

    </Form>
      </Modal.Body>
   
    </Modal>
  );
}

const Admin = () => {

  const navigate = useNavigate()
  const [modalShow, setModalShow] = React.useState(false);
  const restaurantLIst = useSelector((state) => state.restaurant.list);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRestaurants());
    dispatch(getDeliveryboys());
    dispatch(getFoodreviews());
    dispatch(getUsers());
  }, []);

  const deliveryboyLIst = useSelector((state) => state.deliveryboy.list);
  const foodreviewLIst = useSelector((state) => state.foodreview.list);
  const userLIst = useSelector((state) => state.user.list);


const handleLogout=() => {
navigate('/login')
}

  return (

    <div>

      <Container fluid>

        <Topbar />



      </Container>
      <br></br>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#" className='tab'>
        <Row>
          <Col sm={2}>
            <ListGroup>
              <ListGroup.Item action href="#">
                <i class="ri-home-2-line"></i>  Home

              </ListGroup.Item>
              <ListGroup.Item action href="#users">
                <i class="ri-user-line"></i> Users

              </ListGroup.Item>
              <ListGroup.Item action href="#restaurant">
                <i class="ri-store-2-line"></i> Restaurants

              </ListGroup.Item>
              <ListGroup.Item action href="#deliveryboy">
                <i class="ri-e-bike-2-line"></i> Delivery

              </ListGroup.Item>
              <ListGroup.Item action href="#reviews">
                <i class="ri-star-line"></i> Reviews

              </ListGroup.Item>
              <ListGroup.Item action href="#logout" onClick={()=>handleLogout()}>
                <i class="ri-logout-box-line" />  Logout

              </ListGroup.Item>


            </ListGroup>
          </Col>

          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#">
                <div>
                 
                <div className="row mb-3">
                  <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card bg-success text-white h-100">
                      <div className="card-body bg-success" >
                        <div className="rotate">
                          <i class="ri-user-3-fill"></i>
                        </div>
                        <h6 className="text-uppercase">Users</h6>
                        <h1 className="display-4" style={{ color: "#fff" }}>{userLIst.length}</h1>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card bg-orange text-white h-100">
                      <div className="card-body bg-info" >
                        <div className="rotate">
                          <i class="ri-shopping-cart-2-fill"></i>
                        </div>
                        <h6 className="text-uppercase">Orders</h6>
                        <h1 className="display-4" style={{ color: "#fff" }}>13</h1>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-danger h-100">
                      <div className="card-body bg-danger">
                        <div className="rotate">
                          <i class="ri-store-2-fill"></i>
                        </div>
                        <h6 className="text-uppercase">Restaurants</h6>
                        <h1 className="display-4" style={{ color: "#fff" }}>5</h1>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-warning h-100">
                      <div className="card-body">
                        <div className="rotate">
                          <i class="ri-e-bike-2-fill"></i>
                        </div>
                        <h6 className="text-uppercase">Delivery Staff</h6>
                        <h1 className="display-4" style={{ color: "#fff" }}>5</h1>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="#users">

              <div>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th> Name</th>
                      <th>Phone Number</th>
                      <th>Email</th>

                      <th>Action</th>
                    </tr>
                  </thead>


                  {userLIst.map((u) => (
                    <User key={u.id} user={u} />

                  ))}
                </table>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="#restaurant">
              <div>
              

      <Fab color="primary" aria-label="add">
  <AddIcon onClick={() => setModalShow(true)}/>
</Fab>
<br></br>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <br></br>
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
              
              <div>
                <table className='table table-bordered'>
                  <thead>
                    <tr>

                      <th> Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>City</th>
                      <th> License</th>
                      <th>PAN Card</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {deliveryboyLIst.map((u) => (
                    <Deliveryboy key={u.id} deliveryboy={u} />

                  ))}
                </table>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="#reviews">
              <div>
                <table className='table table-bordered'>
                  <thead>
                    <tr>

                      <th> Name</th>
                      <th>Review</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {foodreviewLIst.map((u) => (
                    <Review key={u.id} foodreview={u} />

                  ))}
                </table>
              </div>
            </Tab.Pane>

          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>

    </div >

  )

}
export default Admin

//Math.random().toString(36).slice(-8)