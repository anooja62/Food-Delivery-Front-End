import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CommonSection from "../Components/UI/common-section/CommonSection";
import Helmet from "../Components/Helmet/Helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import "../styles/formerror.css";
import { useNavigate } from "react-router-dom";
import axios from ".././axios";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const steps = [
  {
    label: " Registeration",
    description: `Restaurant name, address, contact no., email`,
  },
  {
    label: "Upload documents for verification",
    description: "FSSAI license copy",
  },
  {
    label: "Register for online ordering",
    description: `After the verification process our team will register your restaurant for online orders`,
  },
];

const initialValues = {
  name: "",
  phone: "",
  email: "",
  license: "",
  restname: "",
};

const RestaurantRegister = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState("");
  const imageListRef = ref(storage, "images/");

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const navigate = useNavigate();
  const signupNameRef = useRef();
  const restaurantOwnernameRef = useRef();
  const restaurantOwnerphoneRef = useRef();
  const signupPhoneRef = useRef();

  const signupEmailRef = useRef();
  const signupAddressRef = useRef();
  const signupLicenseRef = useRef();

  const handleClick = async (e) => {
    e.preventDefault();

    const restaurant = {
      name: signupNameRef.current.value,
      phone: signupPhoneRef.current.value,
      email: signupEmailRef.current.value,
      address: signupAddressRef.current.value,
      license: signupLicenseRef.current.value,
      ownername: restaurantOwnernameRef.current.value,
      ownerphone: restaurantOwnerphoneRef.current.value,
    };
    console.log(imageList);
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then(async (imgUrl) => {
        setImageList(imgUrl);
        await axios.post("/rest/add-restaurent", { ...restaurant, imgUrl });
        navigate("/home");
      });

      toast.success("Registeration Success", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  return (
    <Helmet title="Restaurant-Register">
      <CommonSection title="Register your resturant on Deliorder" />
      <section>
        <Container>
          <Row>
            <Col sm={4}>
              <h4>How it works?</h4>
              <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        optional={index === 2 ? <p>Last step</p> : null}
                      >
                        <p style={{ fontWeight: 500, fontSize: 15 }}>
                          {" "}
                          {step.label}
                        </p>
                      </StepLabel>
                      <StepContent>
                        <p className=" feature__text">{step.description}</p>
                        <Box sx={{ mb: 2 }}>
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === steps.length - 1
                                ? "Finish"
                                : "Continue"}
                            </Button>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <p style={{ fontSize: "1.2rem" }}>
                      All steps completed - you&apos;re finished
                    </p>
                  </Paper>
                )}
              </Box>
            </Col>
            <Col sm={8}>
              <h1 className="text-center">Restaurant Information</h1>

              <Paper elevation={3}>
                <form onSubmit={handleClick}>
                  <Row>
                    <Col>
                      <div className="new__register">
                        <label>* Restaurant Name</label>
                        <input
                          type="text"
                          placeholder="Restaurant name"
                          name="restname"
                          required
                          ref={signupNameRef}
                          value={values.restname}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="error_container">
                        {errors.restname && touched.restname && (
                          <p className="form_error text-center">
                            {errors.restname}
                          </p>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div className="new__register">
                        <label>* Restaurant Phone number</label>
                        <input
                          type="tel"
                          placeholder="Phone"
                          required
                          ref={signupPhoneRef}
                          name="phone"
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
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="new__register">
                        <label>* Email ID</label>
                        <input
                          type="email"
                          placeholder="Email"
                          name="email"
                          required
                          ref={signupEmailRef}
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="error_container">
                        {errors.email && touched.email && (
                          <p className="form_error">{errors.email}</p>
                        )}
                      </div>
                    </Col>
                    <Col>
                      {" "}
                      <div className="new__register">
                        <label>* Restaurant Address</label>
                        <textarea
                          rows="3"
                          placeholder="Address"
                          required
                          ref={signupAddressRef}
                        ></textarea>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="new__register">
                        <label>* Food Safety License (FSSAI License)</label>

                        <input
                          type="file"
                          name="upload"
                          accept="application/pdf,application/vnd.ms-excel"
                          required
                          onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                          }}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="new__register">
                        <label>* FSSAI License Number</label>

                        <input
                          type="text"
                          name="license"
                          ref={signupLicenseRef}
                          required
                          value={values.license}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="License No."
                        />
                      </div>
                      <div className="error_container">
                        {errors.license && touched.license && (
                          <p className="form_error">{errors.license}</p>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <br></br>

                  <div className="text-center">
                    <button
                      className="addToCart__btn "
                      disabled={
                        errors.name || errors.phone || errors.email
                          ? true
                          : false
                      }
                    >
                      Register
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
                </form>
                <br></br>
              </Paper>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default RestaurantRegister;
