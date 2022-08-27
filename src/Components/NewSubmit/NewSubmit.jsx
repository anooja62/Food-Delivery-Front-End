import React, { useRef } from "react";
import CommonSection from "../UI/common-section/CommonSection";
import Helmet from "../Helmet/Helmet";
import Paper from "@mui/material/Paper";
import { Row, Col } from "react-bootstrap";
import axios from "../../axios"
import { useNavigate } from "react-router-dom";
const NewSubmit = (props) => {
  const resetOtpRef = useRef();
  const resetPasswordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = () => {
    
    axios.post('auth/submit-otp',
        {
            otp: resetOtpRef.current.value,
            password: resetPasswordRef.current.value,
        })
        .then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
                navigate('/login')
                alert('Password Updated.')
            } else {
                alert('server err / wrong OTP')
            }
        }).catch(err => {
            console.log(err)
        })
}

  return (
    <Helmet title="reset-password">
    <CommonSection title="Create new Password!" />
    <div>
      <Row>
        <Col lg="6" md="6" sm="12" className="m-auto mt-5 ">
          <Paper elevation={3}>
            <br></br>
            <form onSubmit={handleSubmit}>
              <div className="new__register">
                <label>OTP</label>
                <input
                  type="tel"
                  placeholder="OTP"
                  required
                  ref={resetOtpRef}
                />
              </div>
              <div className="new__register">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  ref={resetPasswordRef}
                />
              </div>

              <br></br>
              <div className="text-center">
                {" "}
                <button type="submit" className="addToCart__btn ">
                  CHANGE PASSWORD
                </button>
              </div>
              <br></br>
            </form>
          </Paper>
        </Col>
      </Row>
    </div>
    </Helmet>
  );
};

export default NewSubmit;
