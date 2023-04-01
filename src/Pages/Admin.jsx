/** @format */

import React, { useEffect, useState, useRef } from "react";
import axios from "../axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Topbar from "../Components/Admin/Topbar/Topbar";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Deliveryboy from "../Components/Admin/Deliveryboy/Deliveryboy";
import Manage from "../Components/Admin/Manage/Manage";
import { ToastContainer, toast } from "react-toastify";
import PrintIcon from "@mui/icons-material/Print";
import "react-toastify/dist/ReactToastify.css";
import User from "../Components/Admin/User/User";
import { getRestaurants } from "../store/shopping-cart/restaurantSlice";
import { getDeliveryboys } from "../store/shopping-cart/deliverySlice";
import { getUsers } from "../store/shopping-cart/userSlice";
import { useDispatch, useSelector } from "react-redux";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import { getMessages } from "../store/shopping-cart/messageSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import Tab from "react-bootstrap/Tab";

import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import SanitizerIcon from "@mui/icons-material/Sanitizer";
import Button from "react-bootstrap/Button";
import MessageDetails from "../Components/Restaurants/ContactDeliorder/MessageDetails";
import Paper from "@mui/material/Paper";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import Reports from "../Components/Admin/Reports/Reports";
import UserChart from "../Components/Charts/UserChart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PieChart from "../Components/Charts/PieChart";
import Sales from "../Components/Restaurants/Sales/Sales";
import Forecast from "../Components/Restaurants/Sales/Forecast";
import ChecklistAutomation from "../Components/Admin/ChecklistAutomation/ChecklistAutomation";
import Hygiene from "../Components/Admin/Hygiene/Hygiene";
import Inspection from "../Components/Admin/Inspection/Inspection";

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const singleMessage = useSelector((state) => state.message.singleMessage);
  const restaurantLIst = useSelector((state) => state.restaurant.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeliveryboys());
    dispatch(getRestaurants());

    dispatch(getUsers());
    dispatch(getMessages());
  }, []);
  const deliveryboyLIst = useSelector((state) => state.deliveryboy.list);

  const userLIst = useSelector((state) => state.user.list);
  const messageList = useSelector((state) => state.message.list);

  const [cookies, removeCookie] = useCookies(null);
  const navigate = useNavigate();
  const isAdmin = cookies.isAdmin;
  if (!isAdmin) {
    navigate("/login");
  }
  const messageReplyRef = useRef();
  const clearCookies = () => {
    removeCookie("name");
    removeCookie("email");
    removeCookie("phone");
    removeCookie("isAdmin");

    navigate("/login");
  };
  const restaurantId = singleMessage._id;

  const handleClick = async (e) => {
    e.preventDefault();
    const message = {
      reply: messageReplyRef.current.value,
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
  const numPages = Math.ceil(userLIst.length / rowsPerPage);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const paginationButtons = [];
  for (let i = 1; i <= numPages; i++) {
    paginationButtons.push(
      <Button
        key={i}
        variant={i === currentPage ? "primary" : "outline-primary"}
        onClick={() => handlePageClick(i)}
        style={{ marginRight: "5px" }}
      >
        {i}
      </Button>
    );
  }
  return (
    <div>
      <Topbar />

      <section>
        <Container>
          <Tab.Container
            id='list-group-tabs-example'
            defaultActiveKey='#'
            className='tab'
          >
            <Row>
              <Col>
                <ListGroup>
                  <ListGroup.Item action href='#'>
                    <DashboardOutlinedIcon /> Dashboard
                  </ListGroup.Item>
                  <ListGroup.Item action href='#sales'>
                    <CurrencyRupeeIcon /> Sales Analytics
                  </ListGroup.Item>
                  <ListGroup.Item action href='#forecast'>
                    <TrendingUpIcon /> Sales Forecast
                  </ListGroup.Item>
                  <ListGroup.Item action href='#users'>
                    <PeopleAltOutlinedIcon /> Users
                  </ListGroup.Item>
                  <ListGroup.Item action href='#restaurant'>
                    <StorefrontOutlinedIcon /> Restaurants
                  </ListGroup.Item>
                  <ListGroup.Item action href='#hygiene'>
                    <SanitizerIcon /> Hygiene Monitoring
                  </ListGroup.Item>
                  <ListGroup.Item action href='#Inspection'>
                    <CalendarMonthIcon /> Scheduled Inspection
                  </ListGroup.Item>

                  <ListGroup.Item action href='#deliveryboy'>
                    <DeliveryDiningOutlinedIcon /> Delivery
                  </ListGroup.Item>

                  <ListGroup.Item action href='#messages'>
                    <MarkEmailUnreadOutlinedIcon /> Messages
                  </ListGroup.Item>
                  <ListGroup.Item action href='#reports'>
                    <PrintIcon /> Reports
                  </ListGroup.Item>
                  <ListGroup.Item action onClick={handleShow}>
                    <LockOutlinedIcon /> Logout
                  </ListGroup.Item>
                </ListGroup>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title>
                      <br></br>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5>Do you really want to logout ? </h5>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant='primary' onClick={clearCookies}>
                      Logout Now
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>

              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey='#'>
                    <div>
                      <div className='row mb-3'>
                        <div className='col-xl-3 col-sm-6 py-2'>
                          <div className='card bg-success text-white h-100'>
                            <div className='card-body bg-success'>
                              <div className='rotate'>
                                <i class='ri-user-3-fill'></i>
                              </div>
                              <h6 className='text-uppercase'>Users</h6>
                              <h1
                                className='display-4'
                                style={{ color: "#fff" }}
                              >
                                {userLIst.length}
                              </h1>
                            </div>
                          </div>
                        </div>

                        <div className='col-xl-3 col-sm-6 py-2'>
                          <div className='card text-white bg-danger h-100'>
                            <div className='card-body bg-danger'>
                              <div className='rotate'>
                                <i class='ri-store-2-fill'></i>
                              </div>
                              <h6 className='text-uppercase'>Restaurants</h6>
                              <h1
                                className='display-4'
                                style={{ color: "#fff" }}
                              >
                                {restaurantLIst.length}
                              </h1>
                            </div>
                          </div>
                        </div>
                        <div className='col-xl-3 col-sm-6 py-2'>
                          <div className='card text-white bg-warning h-100'>
                            <div className='card-body'>
                              <div className='rotate'>
                                <i class='ri-e-bike-2-fill'></i>
                              </div>
                              <h6 className='text-uppercase'>Delivery Staff</h6>
                              <h1
                                className='display-4'
                                style={{ color: "#fff" }}
                              >
                                {deliveryboyLIst.length}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Row>
                        <Col>
                          {" "}
                          <UserChart />
                        </Col>
                        <Col>
                          <PieChart />
                        </Col>
                      </Row>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey='#sales'>
                    <div>
                      <Sales />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey='#forecast'>
                    <div>
                      <Forecast />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey='#users'>
                    <div>
                      <table className='table table-bordered'>
                        <thead>
                          <tr>
                            <th>SL.No</th>
                            <th> Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>

                            <th>Action</th>
                          </tr>
                        </thead>

                        {userLIst
                          .slice(startIndex, endIndex)
                          .map((u, index) => (
                            <User
                              key={u.id}
                              slNo={startIndex + index + 1}
                              user={u}
                            />
                          ))}
                      </table>
                      <div className='d-flex justify-content-center mt-4'>
                        {paginationButtons}
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey='#restaurant'>
                    <div>
                      <table className='table table-bordered'>
                        <thead>
                          <tr>
                            <th>SL.NO</th>
                            <th>Restaurant Name</th>
                            <th>Contact Info.</th>

                            <th>Address</th>
                            <th>FSSAI License</th>

                            <th>Send Mail</th>
                          </tr>
                        </thead>

                        {restaurantLIst.map((u, index) => (
                          <Manage key={u.id} slNo={index + 1} restaurant={u} />
                        ))}
                      </table>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey='#hygiene'>
                    <div>
                      <Hygiene />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey='#Inspection'>
                    <div>
                      <Inspection />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey='#deliveryboy'>
                    <div>
                      <table className='table table-bordered'>
                        <thead>
                          <tr>
                            <th>SL.No</th>
                            <th> Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Driving License</th>
                            <th>Send Mail</th>
                          </tr>
                        </thead>
                        {deliveryboyLIst.map((u, index) => (
                          <Deliveryboy
                            key={u.id}
                            slNo={index + 1}
                            deliveryboy={u}
                          />
                        ))}
                      </table>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey='#messages'>
                    <div>
                      <Row>
                        <Col>
                          {messageList.map((u) => (
                            <MessageDetails key={u._id} message={u} />
                          ))}
                        </Col>
                        <Col>
                          <Paper elevation={3}>
                            <form className='mt-3' onSubmit={handleClick}>
                              <div className='new__register'>
                                <label>Restaurant Name</label>
                                <input
                                  type='text'
                                  name='foodname'
                                  placeholder=''
                                  defaultValue={singleMessage.restaurantname}
                                  disabled
                                ></input>
                              </div>
                              <div className='new__register'>
                                <label>Query</label>
                                <input
                                  type='text'
                                  defaultValue={singleMessage.requestFor}
                                  disabled
                                ></input>
                              </div>
                              <div className='new__register'>
                                <label>Message</label>
                              </div>
                              <div className='new__register'>
                                <textarea
                                  rows={3}
                                  placeholder='Your Message'
                                  defaultValue={singleMessage.msg}
                                  disabled
                                ></textarea>
                              </div>
                              <div className='new__register'>
                                <label>Reply</label>
                              </div>
                              <div className='new__register'>
                                <textarea
                                  rows={3}
                                  placeholder='Reply'
                                  required
                                  ref={messageReplyRef}
                                ></textarea>
                              </div>

                              <div className='mt-4 text-center'>
                                <button
                                  className='addToCart__btn'
                                  type='submit'
                                >
                                  <ReplyOutlinedIcon /> Send Reply
                                </button>
                                <ToastContainer
                                  position='top-center'
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
                  <Tab.Pane eventKey='#reports'>
                    <div>
                      <Reports />
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </section>
    </div>
  );
};
export default Admin;
