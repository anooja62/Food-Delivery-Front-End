import React, { useState, useEffect, useRef } from "react";
import Helmet from "../Components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from ".././axios";
import deliverman from "../assets/images/deliverman.png";
import whyimg from "../assets/images/whyimg.png";
import "../styles/maincontent.css";
import { Link, useNavigate } from "react-router-dom";
import Category from "../Components/UI/category/Category.jsx";
import "../styles/home.css";
import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";

import products from "../assets/data/product.js";
import foodCategoryImg01 from "../assets/images/hamburger.png";
import foodCategoryImg02 from "../assets/images/pizza.png";
import foodCategoryImg03 from "../assets/images/bread.png";

import ProductCard from "../Components/UI/product-card/ProductCard.jsx";

import Button from "react-bootstrap/Button";

import review from "../assets/images/review.jpg";

import TestimonialSlider from "../Components/UI/slider/TestimonialSlider.jsx";

import Modal from "react-bootstrap/Modal";

import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import { useFormik } from "formik";
import { signupSchema } from "../schemas";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  city: "",
  password: "",
  cpassword: "",
};

const featureData = [
  {
    title: "Quick Delivery",
    imgUrl: featureImg01,
    desc: "Experience superfast delivery for food delivered fresh & on time ",
  },
  {
    title: "Self-Pick-Up",
    imgUrl: featureImg02,
    desc: "We provides you with a feature that you can order your food online pick it up from the restaurant by yourself ",
  },
  {
    title: "No Minimum Order",
    imgUrl: featureImg03,
    desc: "Order in for yourself or for the group, with no restrictions on order value ",
  },
];
const Home = () => {

  
 

  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [category, setCategory] = useState("ALL");
  const [allProducts, setAllProducts] = useState(products);

  useEffect(() => {
    if (category === "ALL") {
      setAllProducts(products);
    }
    if (category === "BURGER") {
      const filteredProducts = products.filter(
        (item) => item.category === "Burger"
      );
      setAllProducts(filteredProducts);
    }
    if (category === "PIZZA") {
      const filteredProducts = products.filter(
        (item) => item.category === "Pizza"
      );
      setAllProducts(filteredProducts);
    }
    if (category === "BREAD") {
      const filteredProducts = products.filter(
        (item) => item.category === "Bread"
      );
      setAllProducts(filteredProducts);
    }
  }, [category]);

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "deliveryboy/");

  const navigate = useNavigate();

  const signupNameRef = useRef();
  const signupPhoneRef = useRef();

  const signupEmailRef = useRef();
  const signupCityRef = useRef();

  const handleClick = async (e) => {
    e.preventDefault();

    const deliveryboy = {
      name: signupNameRef.current.value,
      phone: signupPhoneRef.current.value,
      email: signupEmailRef.current.value,
      city: signupCityRef.current.value,
    };
    if (imageUpload === null) return;
    const imageRef = ref(storage, `deliveryboy/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then(async (imgUrl) => {
        setImageList(imgUrl);
        await axios.post("deli/delivery", {...deliveryboy,imgUrl});
        setShow(false);
      });

      alert("Registeration successful");
    });
  };

  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <h5 className="mb-3">Deliorder</h5>
                <h1 className="mb-4 hero__title">
                  <span>HUNGRY ? </span>just wait <br />
                  food at <span> your door</span>
                </h1>
                <p>Order food from your favourite restaurants.</p>
                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                    <Link to="/ordernow">Order now</Link>
                    <i class="ri-arrow-right-s-line"></i>
                  </button>
                  <button className="all__foods-btn">
                    <Link to="/ui">See all food menu</Link>
                  </button>
                </div>
                <div className="hero__service d-flex align-items-center gap-5 mt-5">
                  <p className="d-flex align-items-center gap-2">
                    <span className="delivery__icon">
                      <i class="ri-car-line"></i>
                    </span>
                    No delivery charge
                  </p>
                  <p className="d-flex align-items-center gap-2">
                    <span className="delivery__icon">
                      <i class="ri-shield-check-line"></i>
                    </span>
                    100 % Secure checkout
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={deliverman} alt="mainpic" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Category />
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">What we serve</h5>
              <h2 className="feature__title">Just sit back at home</h2>
              <h2 className="feature__title">
                We will <span>take care</span>
              </h2>
              <p className="mb-1 mt-4 feature__text">
                Deliorder has lots of unique features that address customer
                needs.
                {""}
              </p>
            </Col>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3">
                  <img src={item.imgUrl} alt="features" className="w-25 mb-3" />
                  <h5 className="fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
            <Col lg="4" md="4"></Col>
            <Col lg="4" md="4"></Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2>Popular Foods</h2>
            </Col>
            <Col lg="12">
              <div className="food__category d-flex align-items-center justify-content-center gap-4">
                <button
                  className={`all__btn ${
                    category === "ALL" ? "foodBtnActive" : ""
                  }`}
                  onClick={() => setCategory("ALL")}
                >
                  All
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "BURGER" ? "foodBtnActive" : ""
                  }`}
                  onClick={() => setCategory("BURGER")}
                >
                  <img src={foodCategoryImg01} alt="product" />
                  Burger
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "PIZZA" ? "foodBtnActive" : ""
                  }`}
                  onClick={() => setCategory("PIZZA")}
                >
                  <img src={foodCategoryImg02} alt="product" />
                  Pizza
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "BREAD" ? "foodBtnActive" : ""
                  }`}
                  onClick={() => setCategory("BREAD")}
                >
                  <img src={foodCategoryImg03} alt="product" />
                  Bread
                </button>
              </div>
            </Col>

            {allProducts.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className="why__choose-us">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyimg} alt="deliorder" className="whyimg" />
            </Col>
            <Col lg="6" md="6">
              <div className="why__deliorder">
                <h2 className="deliorder__title mb-4">
                  Why <span> Deliorder ?</span>
                </h2>
                <p className="deliorder__desc">
                  we’ve been empowering our customers in discovering new tastes
                  and experiences across countries. By putting together
                  meticulous information for our customers, we enable them to
                  make an informed choice..
                </p>
                <ListGroup className="mt-4">
                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose_us-title d-flex align-items-center gap-2">
                      <i class="ri-checkbox-circle-line"></i>Fresh and tasty
                      foods
                    </p>
                    <p className="choose_us-desc">
                      Everyone loves to eat their favorite food. Deliorder
                      provides an option for foodies to order their favourite
                      food from nearby resturants.
                    </p>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose_us-title d-flex align-items-center gap-2">
                      <i class="ri-checkbox-circle-line"></i>Rating System for
                      Food and Restaurants
                    </p>
                    <p className="choose_us-desc">
                      The rating system bridges the bond between the on demand
                      food delivery and the user and the user is provided with
                      enhanced user experience.
                    </p>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose_us-title d-flex align-items-center gap-2">
                      <i class="ri-checkbox-circle-line"></i>Restaurant Profile
                    </p>
                    <p className="choose_us-desc">
                      The restaurant has full control over their profile in the
                      Deliorder. They can provide useful information to their
                      user to help them out.
                    </p>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose_us-title d-flex align-items-center gap-2">
                      <i class="ri-checkbox-circle-line"></i>Easy and Secure
                      Payment Options
                    </p>
                    <p className="choose_us-desc">
                      Our payment process highly efficient and easy to use, a
                      customer must have all the payment options available in
                      the market listed in the On-Demand Food Delivery App for
                      your business.
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2>Deliver with Deliorder</h2>
            </Col>

            <Col lg="6" md="6">
              <h5 className=" mb-4">No boss. Flexible schedule. Quick pay.</h5>
              <p className="choose_us-desc">
                Now you can make money by delivering food orders that people
                crave using Deliorder Application —all while exploring your
                city.
              </p>
              <Row>
                <Col>
                  <button className="addToCart__btn" onClick={handleShow}>
                    SignUp to Deliver{" "}
                  </button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Sign up now</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form className=" mb-5" onSubmit={handleClick}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Name   (Eg. John Doe)"
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
                            <p className="form_error">{errors.name}</p>
                          )}
                        </div>
                        <div className="form__group">
                          <input
                            type="tel"
                            placeholder="Mobile Number"
                            name="phone"
                            required
                            ref={signupPhoneRef}
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

                        <div className="form__group">
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
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="City"
                            name="city"
                            required
                            ref={signupCityRef}
                            value={values.city}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </div>

                        <Row>
                          <Col xs={6}>
                            <div>
                              <label> Driving License</label>
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
                        </Row>
                        <br></br>
                        <Row>
                          <Col sm={8}>
                            {" "}
                            <button
                              type="submit"
                              className="addToCart__btn"
                              disabled={
                                errors.name || errors.phone || errors.email
                                  ? true
                                  : false
                              }
                            >
                              Register{" "}
                            </button>
                          </Col>
                          <Col sm={4}>
                            {" "}
                            <Button
                              variant="outline-success"
                              onClick={handleClose}
                            >
                              Close
                            </Button>
                          </Col>
                        </Row>
                      </form>
                    </Modal.Body>
                  </Modal>
                </Col>
                <Col>
                  <Link to="/login">
                    <p className="choose_us-title d-flex align-items-center gap-2">
                      Already have an account ? Login here
                    </p>
                  </Link>
                </Col>
              </Row>
              <br></br>
              <br></br>
              <Row>
                <h3>Delivery Requirements*</h3>
                <p className=" mb-4 choose_us-desc">Two Wheeler Delivery: </p>
                <ul className=" choose_us-title req">
                  <li>Any make or model 2-wheel scooter</li>
                  <li>Valid Driving License</li>
                  <li>Registration Certificate of two wheeler</li>
                  <li>Valid insurance for two wheeler</li>
                  <li>PAN Card</li>
                </ul>
              </Row>
            </Col>
            <Col>
              <h3 className=" mb-4 text-center">How it Works</h3>
              <div class="timeline-container">
                <ul className="list-updates">
                  <li className="update">
                    <p className="choose_us-title">1. Log in</p>
                    <p className="choose_us-desc">
                      Get on the road and log in to the Driver app to begin
                      receiving delivery requests.
                    </p>
                  </li>
                  <li className="update">
                    <p className="choose_us-title">2. Deliver orders</p>
                    <p className="choose_us-desc">
                      Suggested navigation and information from restaurants and
                      your customers is provided in the app to help deliveries
                      run smoothly.
                    </p>
                  </li>

                  <li className="update">
                    <p className="choose_us-title">3. Earn money</p>
                    <p className="choose_us-desc">
                      You can track your earnings and cash out daily or weekly.
                    </p>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial">
                <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                <h2 className="testimonial__title mb-4">
                  {" "}
                  What our <span>customers </span>are saying
                </h2>
                <p className="testimonial__desc">
                  We provide access to a seemingly endless number of restaurant
                  options that you can order from with just a few clicks.{" "}
                </p>
                <TestimonialSlider />
              </div>
            </Col>
            <Col lg="6" md="6">
              <img src={review} alt="testimonial-img" className="review" />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;