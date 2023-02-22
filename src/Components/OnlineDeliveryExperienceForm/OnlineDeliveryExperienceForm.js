/** @format */

import React, { useState } from "react";

function OnlineDeliveryExperienceForm() {
  const [name, setName] = useState("");

  const [foodPackaging, setFoodPackaging] = useState("");
  const [foodHandling, setFoodHandling] = useState("");
  const [foodQuality, setFoodQuality] = useState("");
  const [foodTaste, setFoodTaste] = useState("");
  const [overallExperience, setOverallExperience] = useState("");

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
        <h2>Online Food Delivery Hygiene and Quality Feedback Form</h2>

        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: "10px", padding: "5px", width: "250px" }}
        />
 <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
        <label htmlFor='foodPackaging'>Food Packaging</label>
        <input
          type='text'
          id='foodPackaging'
          value={foodPackaging}
          onChange={(e) => setFoodPackaging(e.target.value)}
          style={{ margin: "10px", padding: "5px", width: "250px" }}
        />

        <label htmlFor='foodHandling'>Food Handling</label>
        <input
          type='text'
          id='foodHandling'
          value={foodHandling}
          onChange={(e) => setFoodHandling(e.target.value)}
          style={{ margin: "10px", padding: "5px", width: "250px" }}
        />
</div>
        <label htmlFor='foodQuality'>Food Quality</label>
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

        <label htmlFor='foodTaste'>Food Taste</label>
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

        <label htmlFor='overallExperience'>Overall Experience</label>
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
            padding: "0.5rem",
            border: "none",
            borderRadius: "0.25rem",
          }}
        >
          Submit
        </button>
        </div>
      </form>
    </div>
  );
}

export default OnlineDeliveryExperienceForm;
