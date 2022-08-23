import React, { useRef, useState,useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CommonSection from "../Components/UI/common-section/CommonSection";
import Helmet from "../Components/Helmet/Helmet";

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
import {storage} from './firebase';
import {ref, uploadBytes,listAll,getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid'


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
};

const RestaurantRegister = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList,setImageList]= useState("");
  const imageListRef = ref(storage,"images/")


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

  const signupPhoneRef = useRef();

  const signupEmailRef = useRef();
  const signupAddressRef = useRef();

  const handleClick = async (e) => {
    e.preventDefault();

    const restaurant = {
      name: signupNameRef.current.value,
      phone: signupPhoneRef.current.value,
      email: signupEmailRef.current.value,
      address: signupAddressRef.current.value,
    
    };
    console.log(imageList)
    if(imageUpload === null) return;
    const imageRef =ref(storage,`images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef,imageUpload).then((snaphsot)=>{
      getDownloadURL(snaphsot.ref).then(async(imgUrl)=>{
        setImageList(imgUrl)
        await axios.post("/rest/add-restaurent", {...restaurant,imgUrl});
        navigate("/login");
       
      })
      
      alert("image uploaded")
    })
// setTimeout(async()=>{
//   try {
   
//     
//   } catch (err) {
//     console.log(err);
//   }
// },3000)


  
  };

  // useEffect(()=>{
  //      listAll(imageListRef).then((response)=>{
  //      response.items.forEach((item)=>{
  //       getDownloadURL(item).then((url)=>{
  //         setImageList((prev)=>[...prev,url])
  //       })

  //      })
  //      })
  // },[])

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
                        {step.label}
                      </StepLabel>
                      <StepContent>
                        <p>{step.description}</p>
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
                  <div className="new__register">
                    <label> Restaurant Name</label>
                    <input
                      type="text"
                      placeholder="Restaurant name"
                      name="name"
                      required
                      ref={signupNameRef}
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="error_container">
                    {errors.name && touched.name && (
                      <p className="form_error text-center">{errors.name}</p>
                    )}
                  </div>
                  <div className="new__register">
                    <label> Restaurant Phone number</label>
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
                  <div className="new__register">
                    <label>Email ID</label>
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
                  <div className="new__register">
                    <label> Restaurant Address</label>
                    <textarea
                      rows="3"
                      placeholder="Address"
                      required
                      ref={signupAddressRef}
                    ></textarea>
                  </div>

                  <div className="new__register">
                    <label> Food Safety License (FSSAI License)</label>

                    <input
                      type="file"
                      name="upload"
                     
                      required
                      onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                      }}
                    />
                  </div>

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
                    </button>
                    {/* {
                      imageList.map((url)=>{
                        return <img src={url}/>

                        })} */}
                    

                      

                      
                    
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
