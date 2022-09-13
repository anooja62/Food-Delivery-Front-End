import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CommonSection from "../Components/UI/common-section/CommonSection";
import Helmet from "../Components/Helmet/Helmet";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
const Restaurant = () => {
  return (
    <Helmet title="Restaurant-Register">
      <CommonSection title="Register your resturant on Deliorder" />
      <section>
        <Container>
          <div className="hero__btns d-flex align-items-center gap-5 mt-4">
            <button className="order__btn d-flex align-items-center justify-content-between">
              <Link to="/restaurantregister">
                Register your resturant on Deliorder
              </Link>
            </button>
            <button className="all__foods-btn">
              <Link to="/res-login">Already registered ? Login here</Link>
            </button>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="feature__title">
                Why should you partner with Deliorder ?
              </h2>

              <p className="mb-1 mt-4 feature__text">
                Deliorder enables you to get 60% more revenue,{" "}
              </p>
              <p className=" feature__text">
                {" "}
                10x new customers and boost your brand visibility by providing
                insights to improve your business.
              </p>
              {""}
            </Col>
            <Row>
              <Col lg="4" md="6" sm="6" className="mt-5">
                <Paper elevation={4}>
                  <br></br>
                  <div className="text-center">Step 1</div>
                  <div className="text-center" style={{ fontWeight: "600" }}>
                    {" "}
                    Create your page on Deliorder
                  </div>
                  <br></br>
                </Paper>
                <Paper elevation={4}>
                  <br></br>
                  <div className="text-center">Step 2</div>
                  <div className="text-center" style={{ fontWeight: "600" }}>
                    {" "}
                    Register for online ordering
                  </div>
                  <br></br>
                </Paper>
                <Paper elevation={4}>
                  <br></br>
                  <div className="text-center">Step 3</div>
                  <div className="text-center" style={{ fontWeight: "600" }}>
                    {" "}
                    Start receiving orders online
                  </div>
                  <br></br>
                </Paper>
              </Col>
              <Col></Col>
              <Col sm="6" className="mt-5">
                <h3>Frequently asked questions</h3>
                <div className="mt-4">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <p style={{ fontSize: "1.2rem" }}>
                        What happens if the average order value of Deliorder is
                        very low{" "}
                      </p>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className="feature__text">
                        Average order value from our platform is generally more
                        than Rs 250. However, in some cases, users want to try
                        out your place by ordering for lesser amount. But we
                        have observed that they eventually come back with higher
                        value orders if they like your food.
                      </p>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <p style={{ fontSize: "1.2rem" }}>
                        What will Deliorder charge me for creating a page on its
                        platform?
                      </p>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className="feature__text">
                        Creating a restaurant page on Deliorder is free of cost.
                        You can maintain your page by replying to reviews and do
                        a lot more without any charges.
                      </p>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <p style={{ fontSize: "1.2rem" }}>
                        I have a large fleet of delivery boys, why should I use
                        Deliorder's delivery service ?
                      </p>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className="feature__text">
                        You can use your and Deliorder's delivery fleet
                        simultaneously to increase the network of your delivery
                        radius. Also, our delivery fleet delivers orders in
                        minimum possible time, a key factor leading to increased
                        customer satisfaction.
                      </p>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Col>
            </Row>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Restaurant;
