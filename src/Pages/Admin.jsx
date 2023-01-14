import React, { useEffect, useState,useRef } from "react";
import axios from '../axios';
import Topbar from "../Components/Admin/Topbar/Topbar";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Deliveryboy from "../Components/Admin/Deliveryboy/Deliveryboy";
import Manage from "../Components/Admin/Manage/Manage";
import { ToastContainer, toast } from "react-toastify";
import PrintIcon from '@mui/icons-material/Print';
import "react-toastify/dist/ReactToastify.css";
import User from "../Components/Admin/User/User";
import { getRestaurants } from "../store/shopping-cart/restaurantSlice";
import { getDeliveryboys } from "../store/shopping-cart/deliverySlice";
import { getFoodreviews } from "../store/shopping-cart/reviewSlice";
import { getUsers } from "../store/shopping-cart/userSlice";
import { useDispatch, useSelector } from "react-redux";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import { getMessages } from "../store/shopping-cart/messageSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import Tab from "react-bootstrap/Tab";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import MessageReply from "../Components/Admin/MessageReply/MessageReply";
import Button from 'react-bootstrap/Button';
import MessageDetails from "../Components/Restaurants/ContactDeliorder/MessageDetails";
import Paper from "@mui/material/Paper";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import Reports from "../Components/Admin/Reports/Reports";
import Charts from "../Components/Charts/Charts";

import PieChart from "../Components/Charts/PieChart";

const Admin = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  
  const singleMessage = useSelector(
    (state) => state.message.singleMessage
  );
  const restaurantLIst = useSelector((state) => state.restaurant.list);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getDeliveryboys());
    dispatch(getRestaurants());
   
    dispatch(getUsers());
    dispatch(getMessages());
   
  },[])
  const deliveryboyLIst = useSelector((state) => state.deliveryboy.list);
  
  const userLIst = useSelector((state) => state.user.list);
  const messageList = useSelector((state) => state.message.list);

  const [cookies, removeCookie] = useCookies(null);

  const isAdmin = cookies.isAdmin;
  const messageReplyRef = useRef();
  const clearCookies = () => {
    
    removeCookie("name");
    removeCookie("email");
    removeCookie("phone");
    removeCookie("isAdmin");

    navigate("/login");
  };
 const restaurantId = singleMessage._id

  const handleClick = async (e) => {
    e.preventDefault();  
      const message= {
       reply:messageReplyRef.current.value,
     
       
      };

      try {
        await axios.put(`/msg/reply/${restaurantId}`, message);
        toast.success("Reply sent Successfully", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (err) {
        console.log(err);
      }
    };
  return (
    <div>
      <Container fluid>
        <Topbar />
      </Container>
      <br></br>
      <Tab.Container
        id="list-group-tabs-example"
        defaultActiveKey="#"
        className="tab"
      >
        <Row>
          <Col sm={2}>
            <ListGroup>
              <ListGroup.Item action href="#">
                <DashboardOutlinedIcon /> Dashboard
              </ListGroup.Item>
              <ListGroup.Item action href="#users">
                <PeopleAltOutlinedIcon /> Users
              </ListGroup.Item>
              <ListGroup.Item action href="#restaurant">
                <StorefrontOutlinedIcon /> Restaurants
              </ListGroup.Item>
             
              <ListGroup.Item action href="#deliveryboy">
                <DeliveryDiningOutlinedIcon /> Delivery
              </ListGroup.Item>
             
              <ListGroup.Item action href="#messages">
                <MarkEmailUnreadOutlinedIcon /> Messages
              </ListGroup.Item>
              <ListGroup.Item action href="#reports">
                <PrintIcon /> Reports
              </ListGroup.Item>
              <ListGroup.Item action onClick= {handleShow}>
                <LockOutlinedIcon /> Logout
              </ListGroup.Item>
            </ListGroup>
           
            <Modal show={show} onHide={handleClose}>
            <Modal.Header >
          <Modal.Title><br></br></Modal.Title>
        </Modal.Header>
        <Modal.Body><h5>Do you really want to logout ? </h5></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={clearCookies}>
            Logout Now
          </Button>
        </Modal.Footer>
      </Modal>
          </Col>

          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#">
                <div>
                
                  <div className="row mb-3">
                    <div className="col-xl-3 col-sm-6 py-2">
                      <div className="card bg-success text-white h-100">
                        <div className="card-body bg-success">
                          <div className="rotate">
                            <i class="ri-user-3-fill"></i>
                          </div>
                          <h6 className="text-uppercase">Users</h6>
                          <h1 className="display-4" style={{ color: "#fff" }}>
                            {userLIst.length}
                          </h1>
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
                          <h1 className="display-4" style={{ color: "#fff" }}>
                            {restaurantLIst.length}
                          </h1>
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
                          <h1 className="display-4" style={{ color: "#fff" }}>
                            {deliveryboyLIst.length}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Row><Col> <Charts/>
                  </Col>
                  <Col><PieChart/></Col></Row>
                 
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="#users">
                <div>
                  <table className="table table-bordered">
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
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Restaurant Name</th>
                        <th>Contact Info.</th>
                        
                        <th>Address</th>
                        <th>FSSAI License</th>

                        <th>Send Mail</th>
                        

                       
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
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th> Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>City</th>
                        <th>Driving License</th>
                        <th>Send Mail</th>
                       
                      </tr>
                    </thead>
                    {deliveryboyLIst.map((u) => (
                      <Deliveryboy key={u.id} deliveryboy={u} />
                    ))}
                  </table>
                </div>
              </Tab.Pane>
             
              <Tab.Pane eventKey="#messages">
               <div>
               <Row><Col>
                {messageList.map((u) => (
              <MessageDetails key={u._id} message={u} />
            ))}
          </Col><Col>
      <Paper elevation={3}>
        <form className="mt-3" onSubmit={handleClick}>
          <div className="new__register">
            <label>Restaurant Name</label>
            <input type="text" name="foodname" placeholder="" defaultValue={singleMessage.restaurantname} disabled></input>
           
          </div>
          <div className="new__register">
          <label>Query</label>
                        <input type='text' defaultValue={singleMessage.requestFor} disabled></input>
                      </div>
          <div className="new__register">
            <label>Message</label>
           
          </div>
          <div className="new__register">
          <textarea rows={3} placeholder="Your Message" defaultValue={singleMessage.msg} disabled ></textarea>
          </div>
          <div className="new__register">
            <label>Reply</label>
           
          </div>
          <div className="new__register">
          <textarea rows={3} placeholder="Reply" required ref={messageReplyRef}></textarea>
          </div>

          <div className="mt-4 text-center">
            <button className="addToCart__btn" type="submit">
             <ReplyOutlinedIcon/> Send Reply 
            </button>
            <ToastContainer
                        position="top-center"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                      />
          </div>
          <br></br>
        </form>
      </Paper>
      </Col>
      </Row>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="#reports">
                <div>
                 <Reports/>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};
export default Admin;
