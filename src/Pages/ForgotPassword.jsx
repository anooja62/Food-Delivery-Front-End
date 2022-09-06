import React, { useRef } from "react";
import axios from ".././axios";
import { Row, Col } from "react-bootstrap";
import CommonSection from "../Components/UI/common-section/CommonSection";
import Helmet from "../Components/Helmet/Helmet";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
const ForgotPassword = () => {
  const forgotEmailRef = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      email: forgotEmailRef.current.value,
    };

    try {
      const res = await axios.put("/auth/send-otp", user);
      if (res.status === 200) {
        navigate("/newsubmit");
      } else {
        alert("Email / Server Error.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Helmet title="forgot-password">
      <CommonSection title="Reset your Password!" />

      <section>
        <div>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto ">
              <Paper elevation={3}>
                <br></br>
                <form onSubmit={handleClick}>
                  <div className="new__register">
                    <label>Your Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      ref={forgotEmailRef}
                    />
                  </div>

                  <br></br>
                  <div className="text-center">
                    {" "}
                    <button type="submit" className="addToCart__btn ">
                      SEND OTP
                    </button>
                  </div>
                  <br></br>
                </form>
              </Paper>
            </Col>
          </Row>
        </div>
      </section>
    </Helmet>
  );
};

export default ForgotPassword;
