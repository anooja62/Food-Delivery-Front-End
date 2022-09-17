import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import CommonSection from "../Components/UI/common-section/CommonSection";
import Helmet from "../Components/Helmet/Helmet";
import "../styles/checkout.css";
import axios from "../axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  const navigate = useNavigate();
  if (!userId) {
    navigate("/login");
  }

 

 

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  let deliveryCharge = 0
  {cartTotalAmount>=700 ? deliveryCharge=0 : deliveryCharge=30} 
  const totalAmount = cartTotalAmount + Number(deliveryCharge);

 

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_DXC7t4WYidBOkp",

      amount: data.amount,
      currency: data.currency,
      userId: userId,
      description: "Pay Now",

      order_id: data.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post("pay/verify", response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#E67E22",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("pay/orders", { amount: totalAmount });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Delivery Address</h6>
              <form className=" checkout__form" onSubmit={handlePayment}>
                <div className="new__register">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                   
                  />
                </div>
                <div className="new__register">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    
                  />
                </div>

                <div className="new__register">
                  <label>House Name</label>
                  <input
                    type="text"
                    placeholder="House name"
                    
                  />
                </div>
                <div className="new__register">
                  <label>Pincode</label>
                  <input
                    type="number"
                    placeholder="Pincode"
                   
                  />
                </div>

                <br></br>
                <div className="text-center">
                  <button className="addToCart__btn" type="submit">
                    {" "}
                    Payment
                  </button>
                </div>
              </form>
            </Col>
            <Col lg="4" md="6">
              <p style={{color:'green', fontWeight:600}}>* Delivery is free for orders above ₹700</p>
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal : <span>₹{cartTotalAmount}</span>
                </h6>
                
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                 
                  Delivery Charge : <span>₹{deliveryCharge}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total : <span>₹{totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
