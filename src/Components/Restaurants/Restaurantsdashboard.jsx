import React, { useState, useRef, useEffect } from "react";
import Top from "./Top/Top";
import { Stack } from "@mui/material";
import ReviewDisplay from "../Admin/ReviewDisplay/ReviewDisplay";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import WhereToVoteOutlinedIcon from "@mui/icons-material/WhereToVoteOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import RateReviewIcon from "@mui/icons-material/RateReview";
import axios from "../../axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ComboUI from "./Combo/ComboUI";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Row, Col } from "react-bootstrap";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { storage } from "../../Pages/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../../schemas";
import { useFormik } from "formik";
import AddMenu from "./Menu/AddMenu";
import ContactDeliorder from "./ContactDeliorder/ContactDeliorder";
import Reply from "./ContactDeliorder/Reply";
import { getFoodreviews } from "../../store/shopping-cart/reviewSlice";
import { getReply } from "../../store/shopping-cart/messageSlice";
import Orders from "./Orders/Orders";
import { restaurantOrder } from "../../store/shopping-cart/ordersSlice";
import {
  deliveryOrder,
  deliveredOrder,
} from "../../store/shopping-cart/ordersSlice";
import PrintIcon from "@mui/icons-material/Print";
import DescriptionIcon from "@mui/icons-material/Description";
import RestaurantBarcode from "./RestaurantBarcode/RestaurantBarcode";
import RestaurantExcel from "./RestaurantExcel/RestaurantExcel";

import Recommendation from "../Recommendation/Recommendation";
const initialValues = {
  name: "",
  phone: "",

  address: "",
  license: "",
};

const Restaurantsdashboard = () => {
  const reviewList = useSelector((state) => state.foodreview.list);
  const messageList = useSelector((state) => state.message.list);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { handleBlur, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema: signupSchema,
  });
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  const restaurantName = cookies.restaurantName;
  const restaurantPhone = cookies.restaurantPhone;
  const restaurantEmail = cookies.restaurantEmail;
  const restaurantLicense = cookies.restaurantLicense;
  const restaurantimgUrl = cookies.restaurantimgUrl;

  const restaurantAbout = cookies.restaurantAbout;
  const restaurantOwnername = cookies.restaurantOwnername;
  const restaurantOwnerphone = cookies.restaurantOwnerphone;
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState("");
  const imageListRef = ref(storage, "restimages/");
  const [error, setError] = useState("");
  const restaurantPasswordRef = useRef();
  const restaurantEmailRef = useRef();
  const restaurantNameRef = useRef();
  const restaurantPhoneRef = useRef();
  const restaurantAboutRef = useRef();
  const restaurantLicRef = useRef();

  const restaurantOwnernameRef = useRef();
  const restaurantOwnerphoneRef = useRef();
  const restaurantLicensetypeRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodreviews(restaurantId));
    dispatch(getReply(restaurantId));
    dispatch(restaurantOrder(restaurantId));
    dispatch(deliveredOrder());
    dispatch(deliveryOrder(restaurantId));
  }, []);
  const clearCookies = () => {
    removeCookie("restaurantId");
    removeCookie("restaurantName");
    removeCookie("restaurantPhone");
    removeCookie("restaurantAbout");
    removeCookie("restaurantLicense");
    removeCookie("restaurantOwnername");
    removeCookie("restaurantOwnerphone");

    navigate("/res-login");
  };

  //update details
  const handleClick = async (e) => {
    e.preventDefault();

    const restaurants = {
      name: restaurantNameRef.current.value,
      phone: restaurantPhoneRef.current.value,
      email: restaurantEmailRef.current.value,
      password: restaurantPasswordRef.current.value,
      license: restaurantLicRef.current.value,
      about: restaurantAboutRef.current.value,

      ownername: restaurantOwnernameRef.current.value,
      ownerphone: restaurantOwnerphoneRef.current.value,
      
    };
    if (imageUpload === null) return;
    const imageRef = ref(storage, `restimages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then(async (restImg) => {
        setImageList(restImg);
        const res = await axios.put(`/rest/update-res/${restaurantId}`, {
          ...restaurants,
          restImg,
        });
        toast.success("Details Updated", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    });
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
  return (
    <div>
      <Top />
      <Tabs>
        <TabList>
          <Tab>
            <p>
              <DashboardOutlinedIcon /> Dashboard
            </p>
          </Tab>
          <Tab>
            <p>
              <LocalDiningOutlinedIcon /> Menu Card
            </p>
          </Tab>
          <Tab>
            <p>
              <FastfoodIcon /> Combos
            </p>
          </Tab>
          <Tab>
            <p>
              <LocalGroceryStoreOutlinedIcon /> Orders
            </p>
          </Tab>

          <Tab>
            <p>
              <StarHalfOutlinedIcon /> Reviews
            </p>
          </Tab>
          <Tab>
            <p>
              <ManageAccountsIcon /> Manage
            </p>
          </Tab>
          <Tab>
            <p>
              <RateReviewIcon /> Contact
            </p>
          </Tab>
          <Tab>
            <p>
              <MarkEmailUnreadIcon /> Messages
            </p>
          </Tab>
          <Tab>
            <p>
              <PrintIcon /> Bill
            </p>
          </Tab>
          <Tab>
            <p>
              <DescriptionIcon /> Reports
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
            <div className="row mb-3">
              <div className="col-xl-3 col-sm-6 py-2">
                <div className="card bg-success text-white h-100">
                  <div className="card-body bg-success">
                    <div className="rotate">
                      <WhereToVoteOutlinedIcon fontSize="large" />
                    </div>
                    <h6 className="text-uppercase mt-3">Orders Completed</h6>
                    <h1 className="display-4" style={{ color: "#fff" }}>
                      8
                    </h1>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-danger h-100">
                  <div className="card-body bg-danger">
                    <div className="rotate">
                      <PendingActionsOutlinedIcon fontSize="large" />
                    </div>
                    <h6 className="text-uppercase mt-3">Orders Pending</h6>
                    <h1 className="display-4" style={{ color: "#fff" }}>
                      6
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <Row><Col> <Recommendation/> </Col><Col></Col></Row>
          
          </div>
        </TabPanel>
        <TabPanel>
          <Col>
            <div style={{ marginLeft: 150, marginRight: 200 }}>
              <h1 className="text-center">Add Menu Item</h1>
              <AddMenu />
            </div>
          </Col>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <Col>
              <div style={{ marginLeft: 150, marginRight: 200 }}>
                <ComboUI />
              </div>
            </Col>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Orders</h2>
            <Orders />
          </div>
        </TabPanel>

        <TabPanel>
          <div
            className="panel-content"
            style={{ marginLeft: 150, marginRight: 200 }}
          >
            <h2>Reviews</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th> Name</th>
                  <th>Review</th>
                </tr>
              </thead>
              {reviewList.map((u) => (
                <ReviewDisplay key={u.id} foodreview={u} />
              ))}
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <div style={{ marginLeft: 150, marginRight: 200 }}>
              <h3 className="text-center">Restaurant Details</h3>
              <Paper elevation={3}>
                <form className="mt-3" onSubmit={handleClick}>
                  <Row>
                    <Col>
                      <div className="new__register">
                        <label>Restaurant Name</label>
                        <input
                          type="text"
                          name="foodname"
                          ref={restaurantNameRef}
                          placeholder="First Letter should be captial"
                          defaultValue={restaurantName}
                          disabled
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="new__register">
                        <label>LIC.NO</label>
                        <input
                          type="tel"
                          name="license"
                          ref={restaurantLicRef}
                          placeholder="License Number"
                          defaultValue={restaurantLicense}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled
                        />
                      </div>
                      <div className="error_container">
                        {errors.license && touched.license && (
                          <p className="form_error">{errors.license}</p>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="new__register">
                        <label>Upload Image of Restaurant</label>
                        <input
                          type="file"
                          onChange={handleImageUpload}
                          name="photo"
                          placeholder=""
                          required
                          accept="image/*"
                        />
                        <p style={{ color: "red", fontWeight: 600 }}>{error}</p>
                      </div>
                    </Col>
                    <Col>
                      <div className="new__register">
                        <label>Restaurant Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          ref={restaurantPhoneRef}
                          placeholder="Phone Number"
                          defaultValue={restaurantPhone}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="error_container">
                        {errors.phone && touched.phone && (
                          <p className="form_error">{errors.phone}</p>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <div className="new__register">
                    <label>About Restaurant</label>
                    <textarea
                      rows={4}
                      name="about"
                      ref={restaurantAboutRef}
                      placeholder="What Special about Restaurant..."
                      defaultValue={restaurantAbout}
                    ></textarea>
                  </div>

                  <br></br>
                  <h3 className="text-center mt-4">FSSAI License</h3>
                  <div className="text-center mt-4">
                    <a
                      href={restaurantimgUrl}
                      style={{ fontWeight: 600, color: "red" }}
                    >
                      View License
                    </a>
                  </div>

                  <h3 className="text-center mt-4">Owner Details</h3>

                  <Row>
                    <Col>
                      <div className="new__register ">
                        <label for="ownername">Owner Name</label>
                        <input
                          type="text"
                          name="ownername"
                          placeholder="owner name"
                          ref={restaurantOwnernameRef}
                          defaultValue={restaurantOwnername}
                          required
                        ></input>
                      </div>
                    </Col>
                    <Col>
                      <div className="new__register">
                        <label>Owner Phone Number </label>
                        <input
                          type="tel"
                          placeholder="Owner's Phone Number"
                          name="ownernumber"
                          ref={restaurantOwnerphoneRef}
                          defaultValue={restaurantOwnerphone}
                          required
                        ></input>
                      </div>
                    </Col>
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
                          ref={restaurantEmailRef}
                          defaultValue={restaurantEmail}
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
                          ref={restaurantPasswordRef}
                        ></input>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-4 text-center">
                    <button className="addToCart__btn" type="submit">
                      Submit
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
                    </button>
                  </div>
                  <br></br>
                </form>
              </Paper>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2 className="text-center">Contact Deliorder</h2>

            <ContactDeliorder />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <div>
              <h2 className="text-center">Messages From Deliorder</h2>
              <Stack direction="row" spacing={3}>
                {messageList.map((u) => (
                  <Reply key={u.id} message={u} />
                ))}
              </Stack>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <div>
              <h2 className="text-center">Bill Generation</h2>
              <RestaurantBarcode />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <div>
              <RestaurantExcel />
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Restaurantsdashboard;
