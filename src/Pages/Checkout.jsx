import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import CommonSection from "../Components/UI/common-section/CommonSection";
import Helmet from "../Components/Helmet/Helmet";
import "../styles/checkout.css";
import axios from "../axios";
import DomainIcon from "@mui/icons-material/Domain";
import HomeIcon from "@mui/icons-material/Home";
import { useCookies } from "react-cookie";
import { Chip,Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { getShippings } from "../store/shopping-cart/addressSlice";
import { addOrder } from "../store/shopping-cart/cartSlice";
import Address from "../Components/UI/Address/Address";
import { cartActions } from "../store/shopping-cart/cartSlice";
const Checkout = () => {
  const [labelAdd, setLabelAdd] = useState("");
  const [cookies, setCookie] = useCookies(null);
  const[disableForm,setDisableForm] = useState(false)
 
  const userId = cookies.userId;
  const data = useSelector((state) => state.shipping.list);
  const navigate = useNavigate();
  if (!userId) {
    navigate("/login");
  }

  const handleChip = (label) => {
    
    setLabelAdd(label);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShippings(userId));
  }, []);
 

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartId = useSelector((state) => state.cart.totalAmount);
  let deliveryCharge = 0
 cartTotalAmount>=700 ? deliveryCharge=0 : deliveryCharge=30
  const totalAmount = cartTotalAmount + Number(deliveryCharge);

 

  const initPayment = (data) => {
    const options = {
     
      key:  "rzp_test_0YsOnkZc3nwtKA",
     
      amount: data.amount,
      currency: data.currency,
      
      description: "Deliorder Foods",

      order_id: data.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post("pay/verify", response);
          console.log(data);
          dispatch(cartActions.clearItem());
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "green",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
   
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    dispatch(addOrder(userId))
    try {
      const { data } = await axios.post("pay/orders", { amount: totalAmount,userId:userId});
      console.log(data);
      initPayment(data.data);
      navigate('/success')
    } catch (error) {
      console.log(error);
    }
  };
  const  handleChangeRadio = () => {
 
      setDisableForm(false)
  
  }
  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Select Delivery Address</h6>
              <form className=" checkout__form" onSubmit={handlePayment}>
               
           
              {data.length === 0 && (
                      <>
                        <div className="addresscard">
                          <h6> No Address Found</h6>
                        </div>
                      </>
                    )}
                    {data.length !== 0 && (
                      <>
                        <Stack direction="row" spacing={3}>
                          {data.map((u) => (
                            <div className="addresscard">
                              <Address key={u.id} shipping={u} setDisableForm={setDisableForm} />
                            </div>
                          ))}
                        </Stack>
                      </>
                    )}
                    
               {!disableForm && <>
                <h6 className="mb-3 mt-3">Add new Delivery Address</h6>
                <Paper elevation={3}><br/>
                <Stack direction="row" spacing={1}>
                          <Chip
                            icon={<HomeIcon />}
                            label="Home"
                            onClick={() => handleChip("Home")}
                          />
                          <Chip
                            icon={<DomainIcon />}
                            label="Work"
                            variant="outlined"
                            onClick={() => handleChip("Work")}
                          />
                        </Stack>
                <Row>
                  <Col>
                <div className="new__register">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                   
                  />
                </div>
                </Col><Col>
                <div className="new__register">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    
                  />
                </div>
                </Col>
</Row>
<Row><Col>
                <div className="new__register">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="House name"
                    
                  />
                 
                </div>
                </Col><Col>
                <div className="new__register">
                  <label>Pincode</label>
                  <input
                    type="number"
                    placeholder="Pincode"
                   
                  />
                </div>
                </Col>
                </Row><br/><br/>
                </Paper>
                </>}
                

                <br></br>
                <p style={{color:'red', fontWeight:600}}>* There will be no cancellation after payment</p>

                <div className="text-center">
                  <button className="addToCart__btn" type="submit" >
                    {" "}
                    Payment
                  </button>
              
                </div>
              </form>
              <button className="addToCart__btn" onClick={()=>{console.log("button clicked")}}>
                    {" "}
                  Add Address
                  </button>
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
