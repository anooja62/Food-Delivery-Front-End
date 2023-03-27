import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CommonSection from "../Components/UI/common-section/CommonSection";
import Helmet from "../Components/Helmet/Helmet";
import { useNavigate } from "react-router-dom";
import axios from ".././axios";
import { useCookies } from "react-cookie";

import { Link } from "react-router-dom";

import "../styles/login.css";
import Paper from "@mui/material/Paper";
const RestaurantLogin = () => {
  const [cookies, setCookie] = useCookies(['restaurantId', 'restaurantName', 'restaurantEmail', 'restaurantPhone', 'restaurantLicense', 'restaurantimgUrl', 'restaurantAbout', 'restaurantOwnername', 'restaurantOwnerphone'], '/')
  const [error, setError] = useState("");
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const restaurant = {
      email: loginEmailRef.current.value,
      password: loginPasswordRef.current.value,
    };

    try {
      const response = await axios.post("/rest/rest-login", restaurant);
      console.log(response);
      if (response.status === 200) {
        setCookie("restaurantId", response.data._id,{ secure: true });
        setCookie("restaurantName", response.data.name,{ secure: true });
        setCookie("restaurantEmail", response.data.email,{ secure: true });
        setCookie("restaurantPhone", response.data.phone,{ secure: true });
        setCookie("restaurantLicense", response.data.license,{ secure: true });
        setCookie("restaurantimgUrl", response.data.imgUrl,{ secure: true });
        setCookie("restaurantAbout", response.data.about,{ secure: true });
        setCookie("restaurantOwnername", response.data.ownername,{ secure: true });
        setCookie("restaurantOwnerphone", response.data.ownerphone,{ secure: true });
        navigate("/admin-res");
       
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data, "user response");
    }
  };

  return (
    <Helmet title="Login">
      <CommonSection title="Welcome back!" />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto ">
              <Paper elevation={3}>
                <br></br>
                <form onSubmit={handleClick}>
                  <div className="new__register">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      ref={loginEmailRef}
                    />
                  </div>

                  <div className="new__register">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      ref={loginPasswordRef}
                    />
                  </div>
                  <p className="error__txt text-center">{error}</p>
                  <div className="text-center">
                    {" "}
                    <button type="submit" className="addToCart__btn ">
                      Login
                    </button>
                  </div>
                  <br></br>
                </form>
              </Paper>
              <br></br>
              <div className="text-center">
                <Link to="/restaurantregister">
                  New to Deliorder ? Create an account
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default RestaurantLogin;
