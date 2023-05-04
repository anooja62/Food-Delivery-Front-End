import React from "react";
import CommonSection from "../Components/UI/common-section/CommonSection";
import Helmet from "../Components/Helmet/Helmet";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
const PaymentSuccess = () => {
  const [cookies, setCookie] = useCookies(null);
  const navigate = useNavigate();
  const userId = cookies.userId;
  if (!userId) {
    navigate("/login");
  }
  return (
    <Helmet title="Success">
      <Header/>
      <CommonSection />
      <section>
        <Container>
          <Row>
            <Col>
              <h1 style={{ color: "#1C4E04" }}>Payment Successfull !!!</h1>
            </Col>
            <Col>
              {" "}
              <div className="cart__page-btn">
                <button className="addToCart__btn me-4">
                  <Link to="/ordernow">Grab your favourite foods</Link>
                </button>
                <button className="addToCart__btn">
                  <Link to="/orders">View Orders</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer/>
      </section>
    </Helmet>
  );
};

export default PaymentSuccess;
