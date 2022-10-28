import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CommonSection from "../Components/UI/common-section/CommonSection";
import Helmet from "../Components/Helmet/Helmet";
import { useNavigate } from "react-router-dom";
import axios from ".././axios";
import { useCookies } from "react-cookie";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import "../styles/login.css";
import Paper from "@mui/material/Paper";
const Login = () => {
  const [cookies, setCookie] = useCookies(null);
  const [error, setError] = useState("");
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();
  const navigate = useNavigate();
  const isAdmin = cookies.isAdmin;

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      email: loginEmailRef.current.value,
      password: loginPasswordRef.current.value,
    };

    try {
      const response = await axios.post("/auth/login", user);
      const success = response.status === 200;

      if (success) {
        setCookie("userId", response.data._id);
        setCookie("name", response.data.name);
        setCookie("phone", response.data.phone);
        setCookie("email", response.data.email);
        setCookie("isAdmin", response.data.isAdmin);

        setTimeout(() => {
          if (response.data.isAdmin) {
            navigate("/admin");
            window.location.reload();
          } else {
            navigate("/home");
          }
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data, "user response");
    }
  };
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setCookie("name", result.user.displayName);
        navigate("/home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Helmet title="Login" >
      <CommonSection title="Welcome back!" />

      <section>
        <Container>
          <Row>
            <div className="g__btn">
              <GoogleButton type="dark" onClick={signIn} />
            </div>
          </Row>
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
                <p className="text-center">
                  {" "}
                  <Link to="/forgot">Forgot Password ? </Link>
                </p>
              </Paper>
              <br></br>
              <div className="text-center">
                <Link to="/register">New to Deliorder ? Create an account</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
