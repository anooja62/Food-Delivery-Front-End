import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CommonSection from "../Components/UI/common-section/CommonSection";
import Helmet from "../Components/Helmet/Helmet";
import { useNavigate } from "react-router-dom";
import axios from ".././axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import "../styles/login.css";
import Paper from "@mui/material/Paper";
import Header from "../Components/Header/Header";

const DeliveryboyLogin = () => {
    const [cookies, setCookie] = useCookies(null);
    const [error, setError] = useState("");
    const loginEmailRef = useRef();
    const loginPasswordRef = useRef();
    const navigate = useNavigate();

    
  const handleClick = async (e) => {
    e.preventDefault();

    const deliveryboy = {
      email: loginEmailRef.current.value,
      password: loginPasswordRef.current.value,
    };
    try {
        const response = await axios.post("/deli/delivery-login", deliveryboy);
        console.log(response);
        if (response.status === 200) {
          setCookie("deliveryboyId", response.data._id);
          setCookie("deliveryboyName", response.data.name);
          setCookie("deliveryboyEmail", response.data.email);
          setCookie("deliveryboyPhone", response.data.phone);
          setCookie("deliveryboyProfileImg", response.data.profileImg);
          setCookie("deliveryboyLocation", response.data.location);
        
          navigate("/admin-staff");
         
        }
      } catch (err) {
        console.log(err);
        setError(err.response.data, "user response");
      }
    };
  return (
    <div>
 <Helmet title="Deliveryboy Login">
  <Header/>
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
                <Link to="/home">
                  New to Deliorder ? Create an account
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer/>
      </section>
    </Helmet>
  
    </div>
  )
}

export default DeliveryboyLogin