import React, { useRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import MopedIcon from '@mui/icons-material/Moped';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Row, Col } from "react-bootstrap";

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
import Card from "react-bootstrap/Card";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useDispatch, useSelector } from "react-redux";
import {
  deliveryOrder,
  outForDelivery,
  deliveredOrder,makeDeliverd
} from "../../store/shopping-cart/ordersSlice";
import { getParsedRestaurants } from "../../store/shopping-cart/restaurantSlice";
import { useEffect } from "react";

const DeliveryStaff = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deliveryOrder(restaurantId));
    dispatch(getParsedRestaurants());
    dispatch(deliveredOrder())
  }, []);
  const [show, setShow] = useState(false);
  const items = JSON.parse(sessionStorage.getItem("items"));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deliveryboyPasswordRef = useRef();
  const deliveryboyEmailRef = useRef();
  const deliveryboyNameRef = useRef();
  const deliveryboyPhoneRef = useRef();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState("");
  const imageListRef = ref(storage, "deliveryboyimages/");

  const [cookies, removeCookie] = useCookies(null);
  const deliveryboyId = cookies.deliveryboyId;
  const deliveryboyName = cookies.deliveryboyName;
  const deliveryboyPhone = cookies.deliveryboyPhone;
  const deliveryboyEmail = cookies.deliveryboyEmail;
  const deliveryboyProfileImg = cookies.deliveryboyProfileImg;

  const restaurantId = cookies.restaurantId;
  const deliveryOrderData = useSelector((state) => state.order.deliveryOrder);
  const deliveredOrders = useSelector((state) => state.order.deliveredOrders);
  const parsedRestaurents = useSelector(
    (state) => state.restaurant.parsedRestaurant
  );

  const foundRestaurant = (id) => {
    const name = parsedRestaurents.filter((item) => item.value === id)?.[0]

    return name || "";
  };
  
 
  

  const handleClick = async (e) => {
    e.preventDefault();

    const deliveryboy = {
      name: deliveryboyNameRef.current.value,
      phone: deliveryboyPhoneRef.current.value,
      email: deliveryboyEmailRef.current.value,
      password: deliveryboyPasswordRef.current.value,
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

    navigate("/delivery-login");
  };
  const handleOutForDelivery = (orderId) => {
    dispatch(outForDelivery({ orderId: orderId, restaurantId: restaurantId }));
  };
  const handleDeclineUsingSession = (orderId) => {
    if (items) {
      items.push(orderId);
      console.log(items);
      sessionStorage.setItem("items", JSON.stringify(items));
      return;
    }
    sessionStorage.setItem("items", JSON.stringify([orderId]));
  };
 const  handleDelivered = (orderId) =>{
  dispatch(makeDeliverd({ orderId: orderId}))
 }
  
  return (
    <div>
      <DeliveryTopbar />
      <Tabs>
        <TabList>
          <Tab>
            <p>
              <PendingActionsIcon /> New Orders
            </p>
          </Tab>

          <Tab>
            <p>
              <MopedIcon /> Delivery
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
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={clearCookies}>
                Logout Now
              </Button>
            </Modal.Footer>
          </Modal>
        </TabList>

        <TabPanel>
          <div className="panel-content">
            <h2>Orders</h2>
            {deliveryOrderData.map((data) => {
             
              const lastIndex = data.length - 1;
             
              return (
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    {data.map((item) => {
                     
                      return (
                        <>
                         
                          <Card.Text>{item.foodname}  </Card.Text>
                          <Card.Text>
                            {foundRestaurant(item.restaurantId).label}
                            <br/>
                            {foundRestaurant(item.restaurantId).address}
                          </Card.Text>
                        
                        </>
                      );
                    })}
                    <Card.Subtitle className="mb-2 text-muted">
                     Customer Address
                    </Card.Subtitle>

                    <Card.Title>{data[lastIndex]?.address?.name}</Card.Title>
                    <Card.Title>{data[lastIndex]?.address?.phone}</Card.Title>
                    <Card.Title>{data[lastIndex]?.address?.pincode}</Card.Title>
                   
                    <Row>
                      <Col>
                        <Button
                          onClick={() =>
                            handleOutForDelivery(data[lastIndex].orderId)
                          }
                        >
                          Accept Order
                        </Button>
                      </Col>
                      
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Delivery details</h2>
            { deliveredOrders.map((data) => {
              
              const lastIndex = data.length - 1;
             
              return (
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    {data.map((item) => {
                     
                      return (
                        <>
                         
                        
                        </>
                      );
                    })}
                    <Card.Subtitle className="mb-2 text-muted">
                     Customer Address
                    </Card.Subtitle>

                    <Card.Title>{data[lastIndex]?.address?.name}</Card.Title>
                    <Card.Title>{data[lastIndex]?.address?.phone}</Card.Title>
                    <Card.Title>{data[lastIndex]?.address?.pincode}</Card.Title>
                   
                    <Row>
                     {data[lastIndex].isDelivered === 0 ? 
                     <><Col>
                        <Button
                          onClick={() =>
                            handleDelivered(data[lastIndex].orderId)
                          }
                        >
                          Delivery Completed
                        </Button>
                      </Col></>:<p>Delivered</p>}
                     
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </TabPanel>
        
       
        <TabPanel>
          <div className="panel-content">
            <div style={{ marginLeft: 150, marginRight: 200 }}>
              <h3 className="text-center">Profile Details</h3>
              <Paper elevation={3}>
                <form className="mt-3" onSubmit={handleClick}>
                  <Row>
                    <Col>
                      <div className="new__register ">
                        <label for="ownername"> Name</label>
                        <input
                          type="text"
                          name="ownername"
                          placeholder="owner name"
                          ref={deliveryboyNameRef}
                          defaultValue={deliveryboyName}
                        ></input>
                      </div>
                    </Col>
                    <Col>
                      <div className="new__register">
                        <label> Phone Number </label>
                        <input
                          type="tel"
                          placeholder=" Phone Number"
                          name="number"
                          ref={deliveryboyPhoneRef}
                          defaultValue={deliveryboyPhone}
                        ></input>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="new__register mt-5">
                        <label> Profile Picture </label>
                        <input
                          type="file"
                          onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                          }}
                          name="photo"
                          placeholder=""
                        />
                      </div>
                    </Col>
                    <Col></Col>
                  </Row>

                  <br></br>

                  <h3 className="text-center mt-4">Account Settings </h3>

                  <Row>
                    <Col>
                      <div className="new__register ">
                        <label for="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          ref={deliveryboyEmailRef}
                          defaultValue={deliveryboyEmail}
                          disabled
                        ></input>
                      </div>
                    </Col>
                    <Col>
                      <div className="new__register">
                        <label>Change Password </label>
                        <input
                          type="password"
                          placeholder="Change Password"
                          name="password"
                          ref={deliveryboyPasswordRef}
                        ></input>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-4 text-center">
                    <button className="addToCart__btn" type="submit">
                      Submit
                    </button>
                    <ToastContainer
                      position="top-center"
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
    </div>
  );
};

export default DeliveryStaff;
