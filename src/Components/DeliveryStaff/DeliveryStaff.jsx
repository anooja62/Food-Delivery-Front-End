/** @format */

import React, { useRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import HistoryIcon from "@mui/icons-material/History";
import MopedIcon from "@mui/icons-material/Moped";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Row, Col, Container } from "react-bootstrap";
import SavingsIcon from '@mui/icons-material/Savings';
import Paper from "@mui/material/Paper";
import { useCookies } from "react-cookie";
import { storage } from "../../Pages/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import DeliveryTopbar from "./DeliveryTopBar/DeliveryTopBar";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { useDispatch, useSelector } from "react-redux";
import {
  deliveryOrder,
  loacationBasedOrder,
  deliveryboyAcceptedOrder,
  deliveredOrder,
  makeDeliverd,
} from "../../store/shopping-cart/ordersSlice";
import { getParsedRestaurants } from "../../store/shopping-cart/restaurantSlice";
import { useEffect } from "react";
import "../Location/Location.css";
import NewOrders from "./NewOrders/NewOrders";
import OrderHistory from "./OrderHistory/OrderHistory";
import Wages from "./Wages/Wages";
const DeliveryStaff = () => {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState([]);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const items = JSON.parse(sessionStorage.getItem("items"));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deliveryboyPasswordRef = useRef();
  const deliveryboyEmailRef = useRef();
  const deliveryboyNameRef = useRef();
  const deliveryboyPhoneRef = useRef();
  const deliveryboyLocationRef = useRef();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState("");
  const imageListRef = ref(storage, "deliveryboyimages/");

  const [cookies, removeCookie] = useCookies(null);
  const deliveryboyId = cookies.deliveryboyId;
  const deliveryboyName = cookies.deliveryboyName;
  const deliveryboyLocation = cookies.deliveryboyLocation;
  const deliveryboyPhone = cookies.deliveryboyPhone;
  const deliveryboyEmail = cookies.deliveryboyEmail;
  const deliveryboyProfileImg = cookies.deliveryboyProfileImg;

  const restaurantId = cookies.restaurantId;
  const acceptedOrder = useSelector((state) => state.order.acceptedOrders);
  const deliveryOrderData = useSelector((state) => state.order.deliveryOrder);
  const deliveredOrders = useSelector((state) => state.order.deliveredOrders);
  const newOrderLength = deliveredOrders.length;
  const parsedRestaurents = useSelector(
    (state) => state.restaurant.parsedRestaurant
  );
  const deliveryOrder = useSelector((state) => state.order.locationOrder);
  useEffect(() => {
    dispatch(deliveryboyAcceptedOrder(deliveryboyId));
    dispatch(loacationBasedOrder(deliveryboyLocation));
    dispatch(getParsedRestaurants());
    dispatch(deliveredOrder());
  }, []);
  const foundRestaurant = (id) => {
    const name = parsedRestaurents.filter((item) => item.value === id)?.[0];

    return name || "";
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const deliveryboy = {
      name: deliveryboyNameRef.current.value,
      phone: deliveryboyPhoneRef.current.value,
      email: deliveryboyEmailRef.current.value,
      password: deliveryboyPasswordRef.current.value,
      location: deliveryboyLocationRef.current.value,
    };
    if (imageUpload === null) return;
    const imageRef = ref(
      storage,
      `deliveryboyimages/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then(async (profileImg) => {
        setImageList(profileImg);
        const deliveryboys = await axios.put(
          `/deli/update-delivery/${deliveryboyId}`,
          { ...deliveryboy, profileImg }
        );
      });

      toast.success("Details updated", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const navigate = useNavigate();
  const clearCookies = () => {
    removeCookie("deliveryboyId");
    removeCookie("deliveryboyName");
    removeCookie("deliveryboyPhone");
    removeCookie("deliveryboyProfileImg");
    removeCookie("deliveryboyLocation");
    navigate("/delivery-login");
  };

  const handleDelivered = (orderId) => {
    dispatch(makeDeliverd({ orderId: orderId, deliveryBoyId: deliveryboyId }));
  };
  const handleImageUpload = (event) => {
    console.log(event.target.files[0].name.includes("png"));
    if (
      event.target.files[0].name.includes("png") ||
      event.target.files[0].name.includes("jpg")
    ) {
      setImageUpload(event.target.files[0]);
      setError("");
    } else {
      setError("you can upload only images");
    }
  };

  const fetchSuggestions = async (address) => {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=pk.de89a66c75d2c7e2838b70033a082722&q=${address}&format=json`
    );
    setSuggestions(response.data);
  };

  useEffect(() => {
    if (address) {
      fetchSuggestions(address);
    } else {
      setSuggestions([]);
    }
  }, [address]);

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSuggestionSelection = (suggestion) => {
    setAddress(suggestion.display_name);
    setSuggestions([]);
    setLocation([suggestion.lat, suggestion.lon]);
  };
  return (
    <>
      <DeliveryTopbar orderCount={newOrderLength}/>
      <section>
        <Container>
          <Tabs>
            <TabList>
              <Tab>
                <p>
                  <PendingActionsIcon /> New Orders
                </p>
              </Tab>

              <Tab>
                <p>
                  <MopedIcon /> Accepted Orders
                </p>
              </Tab>
              <Tab>
                <p>
                  <SavingsIcon /> My Earnings
                </p>
              </Tab>
              <Tab>
                <p>
                  <HistoryIcon /> Order History
                </p>
              </Tab>
              <Tab>
                <p>
                  <ManageAccountsOutlinedIcon /> Profile
                </p>
              </Tab>
              <Tab>
                <p onClick={handleShow}>
                  <LockOutlinedIcon /> Log Out
                </p>
              </Tab>
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
            </TabList>

            <TabPanel>
              <div className='panel-content'>
                <h2>New Orders</h2>
                <NewOrders />
              </div>
            </TabPanel>
            <TabPanel>
              <div className='panel-content'>
                <h2>Accepted Order details</h2>
                <table className='table table-bordered mt-4' style={{ border: '2px solid black' }}>
                <thead style={{ backgroundColor: '#f0f0f0' }}>

                    <tr>
                      <th>SL.No</th>
                      <th>Customer Name</th>
                      <th>Phone Number</th>
                      <th>Food Items</th>
                      <th>Address</th>
                      <th>Delivery Done</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acceptedOrder.map((data, index) => {
                      const orderID = data[0]?.orderId;
                      const customerName = data[1]?.address?.name;
                      const address = data[1]?.address?.address;
                      const phone = data[1]?.address?.phone;

                      return (
                        <React.Fragment key={`${orderID}-header`}>
                          {data.map((item, subIndex) => (
                            <tr key={`${orderID}-${subIndex}`}>
                              {subIndex === 0 && (
                                <>
                                  <td rowSpan={data.length}>{index + 1}</td>
                                  <td rowSpan={data.length}>{customerName}</td>
                                  <td rowSpan={data.length}>{phone}</td>
                                </>
                              )}
                              <td>{item.foodname}</td>
                              {subIndex === 0 && (
                                <>
                                  <td rowSpan={data.length}>{address}</td>
                                  <td
                                    className='text-center'
                                    rowSpan={data.length}
                                  >
                                    <DomainVerificationIcon
                                      onClick={() => handleDelivered(orderID)}
                                    />
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='panel-content'>
                <h2>My Earnings</h2>
                <Wages/>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='panel-content'>
                <h2>Order History</h2>
                <OrderHistory />
              </div>
            </TabPanel>
            <TabPanel>
              <div className='panel-content'>
                <div >
                  <h3 className='text-center'>Profile Details</h3>
                  <Paper elevation={3}>
                    <form className='mt-3' onSubmit={handleClick}>
                      <Row>
                        <Col>
                          <div className='new__register '>
                            <label for='ownername'> Name</label>
                            <input
                              type='text'
                              name='ownername'
                              placeholder='owner name'
                              ref={deliveryboyNameRef}
                              defaultValue={deliveryboyName}
                              readOnly
                            ></input>
                          </div>
                        </Col>
                        <Col>
                          <div className='new__register'>
                            <label> Phone Number </label>
                            <input
                              type='tel'
                              placeholder=' Phone Number'
                              name='number'
                              ref={deliveryboyPhoneRef}
                              defaultValue={deliveryboyPhone}
                            ></input>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <div className='new__register mt-5'>
                          <label> Profile Picture </label>
                          <input
                            type='file'
                            onChange={handleImageUpload}
                            name='photo'
                            placeholder=''
                            required
                            accept='image/*'
                          />
                          <p>{error}</p>
                        </div>
                      </Row>
                      <Row>
                        <div className='new__register'>
                          <label> Save your location </label>
                          <form>
                            <div className='search-main'>
                              <div className='search'>
                                {" "}
                                <input
                                  type='text'
                                  value={address}
                                  onChange={handleInputChange}
                                  placeholder='Search location....'
                                  ref={deliveryboyLocationRef}
                                />
                                {suggestions.length > 0 && (
                                  <ul>
                                    {suggestions.map((suggestion, index) => (
                                      <li
                                        key={index}
                                        onClick={() =>
                                          handleSuggestionSelection(suggestion)
                                        }
                                      >
                                        {suggestion.display_name}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          </form>
                        </div>
                      </Row>

                      <br></br>

                      <h3 className='text-center mt-4'>Account Settings </h3>

                      <Row>
                        <Col>
                          <div className='new__register '>
                            <label for='email'>Email</label>
                            <input
                              type='email'
                              name='email'
                              placeholder='Email'
                              ref={deliveryboyEmailRef}
                              defaultValue={deliveryboyEmail}
                              disabled
                            ></input>
                          </div>
                        </Col>
                        <Col>
                          <div className='new__register'>
                            <label>Change Password </label>
                            <input
                              type='password'
                              placeholder='Change Password'
                              name='password'
                              ref={deliveryboyPasswordRef}
                            ></input>
                          </div>
                        </Col>
                      </Row>

                      <div className='mt-4 text-center'>
                        <button className='addToCart__btn' type='submit'>
                          Submit
                        </button>
                        <ToastContainer
                          position='top-center'
                          autoClose={3000}
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
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </Container>
      </section>
    </>
  );
};

export default DeliveryStaff;
