/** @format */

import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "../../axios";
import { useCookies } from "react-cookie";
function OnlineDeliveryExperienceForm({ restaurantId,orderId,setShowModal }) {
 
  const [foodPackaging, setFoodPackaging] = useState("");
  const [foodHandling, setFoodHandling] = useState("");
  const [foodQuality, setFoodQuality] = useState("");
  const [foodTaste, setFoodTaste] = useState("");
  const [overallExperience, setOverallExperience] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  useEffect(() => {
    const date = new Date().toISOString().substr(0, 10);
    setCurrentDate(date);
  }, []);
 
  const foodPackagingRef = useRef();
  const foodTasteRef = useRef();
  const foodHandlingRef = useRef();
  const foodQualityRef = useRef();
  const overallExperienceRef = useRef();
  const currentDateRef = useRef();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = {
      userId: userId,
      restaurantId:restaurantId,
      orderId:orderId,
      foodPackaging: foodPackagingRef.current.value,
      foodHandling: foodHandlingRef.current.value,
      foodQuality: foodQualityRef.current.value,
      foodTaste: foodTasteRef.current.value,
      overallExperience: overallExperienceRef.current.value,
      currentDate: currentDateRef.current.value,
    };

    try {
      await axios.post("/feed/feedback", feedback);
      console.log("Submitting feedback...");
    setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        border: "2px solid black",
        padding: "1rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ backgroundColor: "#f0f0f0", padding: "20px" }}
      >
    
        <Row>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1rem",
              }}
            >
              <label
                htmlFor='foodPackaging'
                style={{ marginBottom: "0.5rem", fontWeight: "600" }}
              >
                Food Packaging
              </label>
              <select
                id='foodPackaging'
                value={foodPackaging}
                onChange={(e) => setFoodPackaging(e.target.value)}
                style={{ margin: "10px", padding: "5px", width: "250px" }}
                ref={foodPackagingRef}
              >
                <option value=''>--Select--</option>
                <option value='excellent'>Excellent</option>
                <option value='good'>Good</option>
                <option value='average'>Average</option>
                <option value='poor'>Poor</option>
                <option value='very-poor'>Very Poor</option>
              </select>
            </div>
          </Col>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1rem",
              }}
            >
              <label
                htmlFor='foodHandling'
                style={{ marginBottom: "0.5rem", fontWeight: "600" }}
              >
                Food Handling
              </label>
              <select
                id='foodHandling'
                value={foodHandling}
                onChange={(e) => setFoodHandling(e.target.value)}
                style={{ margin: "10px", padding: "5px", width: "250px" }}
                ref={foodHandlingRef}
              >
                <option value=''>--Select--</option>
                <option value='excellent'>Excellent</option>
                <option value='good'>Good</option>
                <option value='average'>Average</option>
                <option value='poor'>Poor</option>
                <option value='very-poor'>Very Poor</option>
              </select>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1rem",
              }}
            >
              <label
                htmlFor='foodQuality'
                style={{ marginBottom: "0.5rem", fontWeight: "600" }}
              >
                Food Quality
              </label>
              <select
                id='foodQuality'
                value={foodQuality}
                onChange={(e) => setFoodQuality(e.target.value)}
                style={{ margin: "10px", padding: "5px", width: "250px" }}
                ref={foodQualityRef}
              >
                <option value=''>--Select--</option>
                <option value='excellent'>Excellent</option>
                <option value='good'>Good</option>
                <option value='average'>Average</option>
                <option value='poor'>Poor</option>
                <option value='very-poor'>Very Poor</option>
              </select>
            </div>
          </Col>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1rem",
              }}
            >
              <label
                htmlFor='foodTaste'
                style={{ marginBottom: "0.5rem", fontWeight: "600" }}
              >
                Food Taste
              </label>
              <select
                id='foodTaste'
                value={foodTaste}
                onChange={(e) => setFoodTaste(e.target.value)}
                style={{ margin: "10px", padding: "5px", width: "250px" }}
                ref={foodTasteRef}
              >
                <option value=''>--Select--</option>
                <option value='excellent'>Excellent</option>
                <option value='good'>Good</option>
                <option value='average'>Average</option>
                <option value='poor'>Poor</option>
                <option value='very-poor'>Very Poor</option>
              </select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1rem",
              }}
            >
              <label
                htmlFor='overallExperience'
                style={{ marginBottom: "0.5rem", fontWeight: "600" }}
              >
                Overall Experience
              </label>
              <select
                id='overallExperience'
                value={overallExperience}
                onChange={(e) => setOverallExperience(e.target.value)}
                style={{ margin: "10px", padding: "5px", width: "250px" }}
                ref={overallExperienceRef}
              >
                <option value=''>--Select--</option>
                <option value='excellent'>Excellent</option>
                <option value='good'>Good</option>
                <option value='average'>Average</option>
                <option value='poor'>Poor</option>
                <option value='very-poor'>Very Poor</option>
              </select>
            </div>
          </Col>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1rem",
              }}
            >
              <label
                htmlFor='overallExperience'
                style={{ marginBottom: "1rem", fontWeight: "600" }}
              >
                Date
              </label>
              <input
                type='text'
                value={currentDate}
                disabled
                ref={currentDateRef}
              />
            </div>
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <button
            type='submit'
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "7px 10px",
              border: "none",
              borderRadius: "0.25rem",
            }}
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}

export default OnlineDeliveryExperienceForm;
