/** @format */

import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
function OnlineDeliveryExperienceForm() {
  const [name, setName] = useState("");
  const [foodPackaging, setFoodPackaging] = useState("");
  const [foodHandling, setFoodHandling] = useState("");
  const [foodQuality, setFoodQuality] = useState("");
  const [foodTaste, setFoodTaste] = useState("");
  const [overallExperience, setOverallExperience] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const date = new Date().toISOString().substr(0, 10);
    setCurrentDate(date);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
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
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Food Delivery Hygiene and Quality Feedback Form
        </h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            htmlFor='name'
            style={{ marginBottom: "0.5rem", fontWeight: "600" }}
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: "0.5rem", padding: "0.5rem", width: "100%" }}
          />
        </div>
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
              <input type='text' value={currentDate} disabled />
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
