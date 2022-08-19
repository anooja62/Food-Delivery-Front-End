import React, { useEffect } from 'react'

import Topbar from '../Components/Admin/Topbar/Topbar'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import Deliveryboy from '../Components/Admin/Deliveryboy/Deliveryboy'
import Manage from '../Components/Admin/Manage/Manage'
import Review from '../Components/Admin/Review/Review'
import { getRestaurants } from "../store/shopping-cart/restaurantSlice";
import { getDeliveryboys } from "../store/shopping-cart/deliverySlice";
import { getFoodreviews } from "../store/shopping-cart/reviewSlice";
import { useDispatch, useSelector } from "react-redux";
import '../styles/admin.css'

import Tab from 'react-bootstrap/Tab';



const Admin = () => {


  const restaurantLIst = useSelector((state) => state.restaurant.list);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRestaurants());
  }, []);

  const deliveryboyLIst = useSelector((state) => state.deliveryboy.list);
  const dispatchk = useDispatch()
  useEffect(() => {
    dispatchk(getDeliveryboys());
  }, []);
  const foodreviewLIst = useSelector((state) => state.foodreview.list);
  const dispatchf = useDispatch()
  useEffect(() => {
    dispatchf(getFoodreviews());
  }, []);

  return (
    <div>

      <Container fluid>

        <Topbar />



      </Container>
      <br></br>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#home" className='tab'>
        <Row>
          <Col sm={2}>
            <ListGroup>
              <ListGroup.Item action href="#home">
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


            </ListGroup>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#home">
               <div>
                <div className="row mb-3">
                <div className="col-xl-3 col-sm-6 py-2">
                <div className="card bg-success text-white h-100">
                    <div className="card-body bg-success" style={{backgroundColor:"#57b960"}}>
                        <div className="rotate">
                        <i class="ri-user-3-fill"></i>
                        </div>
                        <h6 className="text-uppercase">Users</h6>
                        <h1 className="display-4" style={{color:"#fff"}}>134</h1>
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
                        <h1 className="display-4" style={{color:"#fff"}}>5</h1>
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
                        <h1 className="display-4" style={{color:"#fff"}}>5</h1>
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
                        <th>Email</th>
                        <th>Phone Number</th>              
                        <th>Action</th>
                      </tr>
                    </thead>

                  </table>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="#restaurant">
                <div>
                  <table className='table table-bordered'>
                    <thead>
                      <tr>
                        <th>SI NO.</th>
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

    </div>

  )

}
export default Admin