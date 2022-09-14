import React, { useState, useRef, useEffect } from "react";
import Helmet from "../Components/Helmet/Helmet";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/formerror.css";
import CommonSection from "../Components/UI/common-section/CommonSection";
import ProfileCard from "../Components/Profile/ProfileCard";
import axios from "../axios";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";
import Address from "../Components/UI/Address/Address";
import {
  getShippings,
  addShippingAddress,
} from "../store/shopping-cart/addressSlice";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import {Chip,Stack} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DomainIcon from '@mui/icons-material/Domain';
import LockIcon from '@mui/icons-material/Lock';
const initialValues = {
  name: "",
  phone: "",
  pincode: "",
  address: "",
};
const Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userId = cookies.userId;
  const user = cookies.name;
  const phone = cookies.phone;
  const email = cookies.email;
 const [labelAdd, setLabelAdd] = useState('')
  const [show, setShow] = useState(false);
  const data = useSelector((state) => state.shipping.list);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const clearCookies = () => {
    removeCookie("name");
    removeCookie("email");
    removeCookie("phone");
    navigate("/home");
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShippings(userId));
  }, []);
  const addressNameRef = useRef();
  const addressPhoneRef = useRef();
  const addressPincodeRef = useRef();
  const addressAddressRef = useRef();

  
  const handleClick = async (e) => {
    e.preventDefault();
    const shipping = {
      label:labelAdd,
      name: addressNameRef.current.value,
      phone: addressPhoneRef.current.value,
      pincode: addressPincodeRef.current.value,
      address: addressAddressRef.current.value,
      userId: userId,
    };

    try {
      dispatch(addShippingAddress(shipping));
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  const signupNameRef = useRef();
  const signupPhoneRef = useRef();

  const signupEmailRef = useRef();
  const signupPasswordRef = useRef();
  const signupConfirmPasswordRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name: signupNameRef.current.value,
      phone: signupPhoneRef.current.value,
      email: signupEmailRef.current.value,
      password: signupPasswordRef.current.value,
    };

    try {
      await axios.put(`/auth/update/${userId}`, user);
      alert("Details Updated")
    } catch (err) {
      console.log(err);
    }
  };
  const handleChip = (label) => {
    console.log(label)
    setLabelAdd(label)
  }

  return (
    <Helmet title="Profile">
      <CommonSection title={cookies.name} />

      <section>
        <Container>
          <div className="emenu">
            <Tabs>
              <TabList>
                <Tab>
                  <span >
                  <PersonIcon/> Profile
                  </span>
                </Tab>
                <Tab>
                  <span >
                  <EditIcon/> Edit Profile
                  </span>
                </Tab>
                <Tab>
                  <span >
                    <AddLocationAltOutlinedIcon /> Saved Addresses
                  </span>
                </Tab>
                <Tab>
                  <span  onClick={() => clearCookies()}>
                    <LockIcon /> Sign Out
                  </span>
                </Tab>
              </TabList>

              <TabPanel>
              <Row>
        <Col></Col>
              <Col xs={6}>
                    <ProfileCard />
                    </Col>
                    <Col></Col>
                    </Row>
                 

                 
                
              </TabPanel>

              <TabPanel>
                <Row >
                <div style={{paddingLeft:90,paddingRight:90}}>
                  <Col >
                    
                    <Paper elevation={3}>
                      <form onSubmit={handleSubmit}>
                        <div className="new__register">
                          <label>Name</label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Name   (Eg. John Doe)"
                            ref={signupNameRef}
                            defaultValue={user}
                          />
                        </div>

                        <div className="new__register">
                          <label>Phone Number</label>
                          <input
                            type="tel"
                            placeholder="Mobile Number"
                            name="phone"
                            ref={signupPhoneRef}
                            defaultValue={phone}
                          />
                        </div>

                        <div className="new__register">
                          <label>Email</label>
                          <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            ref={signupEmailRef}
                            defaultValue={email}
                          />
                        </div>

                        <div className="new__register">
                          <label>Password</label>
                          <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            ref={signupPasswordRef}
                          />
                        </div>

                        <div className="new__register">
                          <label>Confirm password</label>
                          <input
                            type="password"
                            placeholder="Confirm Password"
                            name="cpassword"
                            ref={signupConfirmPasswordRef}
                          />
                        </div>

                        <br></br>
                        <div className="text-center">
                          <button type="submit" className="addToCart__btn">
                            UPDATE CHANGES
                          </button>

                        </div>
                        <br></br>
                      </form>
                    </Paper>
                  </Col>
                  </div>
                </Row>
              </TabPanel>
              <TabPanel>
                <Row>
                <Col>
                    <button className="address__btn" onClick={handleShow}>
                      <span>
                        <i class="ri-edit-box-line"></i> Add New Address
                      </span>
                    </button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Enter Your Address</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Stack direction="row" spacing={1}>
      <Chip icon={<HomeIcon />} label="Home" onClick={()=>handleChip("Home")}/>
      <Chip icon={<DomainIcon />} label="Work" variant="outlined" onClick={()=>handleChip("Work")} />
    </Stack>
                        <form onSubmit={handleClick}>

                          <div className="new__register">
                            <label>Name</label>
                            <div className="new__register">
                              <input
                                type="text"
                                placeholder="(Eg. John Doe)"
                                name="name"
                                required
                                ref={addressNameRef}
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="error_container">
                              {errors.name && touched.name && (
                                <p className="form_error">{errors.name}</p>
                              )}
                            </div>
                          </div>
                          <div className="new__register">
                          <label>Phone Number</label>
                            <input
                              type="tel"
                              placeholder="Mobile Number"
                              name="phone"
                              required
                              ref={addressPhoneRef}
                              value={values.phone}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="error_container">
                            {errors.phone && touched.phone && (
                              <p className="form_error">{errors.phone}</p>
                            )}
                          </div>
                          <div className="new__register">
                          <label>Pincode</label>
                            <input
                              type="text"
                              placeholder="Pincode"
                              name="pincode"
                              required
                              ref={addressPincodeRef}
                              value={values.pincode}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="error_container">
                            {errors.pincode && touched.pincode && (
                              <p className="form_error">{errors.pincode}</p>
                            )}
                          </div>
                          <div className="new__register">
                          <label>Address</label>
                            <textarea
                              placeholder="House name and address"
                              name="address"
                              required
                              ref={addressAddressRef}
                              value={values.address}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="error_container">
                            {errors.address && touched.address && (
                              <p className="form_error">{errors.address}</p>
                            )}
                          </div>
                          <div className="text-center">
                          <button type="submit" className="addToCart__btn ">
                            Save  Address
                          </button>
                          </div>
                        </form>
                      </Modal.Body>
                    </Modal>
                  </Col>
                 
                  <Col className="mt-5">
                    {data.length === 0 && (
                      <>
                        <div className="addresscard">
                          <h6> No Address Found</h6>
                        </div>
                      </>
                    )}
                    {data.length !== 0 && (
                      <>
                      <Stack direction="row" spacing={3}>
                        {data.map((u) => (
                           
                           <div className="addresscard">
                          <Address key={u.id} shipping={u} />
                          </div>
                         
                        
                         
                        ))}
                         </Stack>
                      </>
                    )}
                  </Col>
                 
                  
                </Row>
              </TabPanel>
            </Tabs>
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default Profile;
