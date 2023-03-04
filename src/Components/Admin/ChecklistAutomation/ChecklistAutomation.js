/** @format */

import React, { useState } from "react";
import axios from "../../../axios";
import { useCookies } from "react-cookie";
function ChecklistAutomation() {
  const [cookies, setCookie] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  const [formValues, setFormValues] = useState({
    date: "",
    staffName: "",
    restaurantId: restaurantId,
    foodPackagingSanitized: "",
    staffWearingMasks: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    const newValue = type === "checkbox" ? event.target.checked : value;
    setFormValues({
      ...formValues,
      [name]: newValue,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/check/forms", formValues);

      console.log(response.data);

      setFormValues({
        restaurantId: restaurantId,
        date: "",
        staffName: "",
        cleanlinessRating: "",
        foodPackagingSanitized: "",
        employeesWearingPPE: "",
        utensilsSanitized: "",
      });

      alert("Your hygiene checklist has been submitted!");
    } catch (error) {
      console.error(error);

      alert(
        "There was an error submitting your hygiene checklist. Please try again later."
      );
    }
  };
  const today = new Date();

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        border: "2px solid black",
        padding: "1rem",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Hygiene Checklist for Online Food Delivery
      </h1>
      <div style={{ textAlign: "center" }}>
        {today.getDay() !== 6 && (
          <p style={{ fontWeight: 600, color: "red" }}>
            The form is only available on Mondays.
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={today.getDay() !== 6}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}
          >
            <div style={{ width: "48%" }}>
              <label htmlFor='date' style={{ marginBottom: "0.5rem" }}>
                Date:
              </label>
              <input
                type='date'
                name='date'
                value={formValues.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <label
                htmlFor='staffName'
                style={{ flex: "1", marginRight: "1rem" }}
              >
                Staff Name:
              </label>
              <input
                type='text'
                name='staffName'
                value={formValues.staffName}
                onChange={handleInputChange}
                style={{ flex: "2" }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <p>
              On a scale of 1-5, how would you rate the overall cleanliness of
              your restaurant?
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <React.Fragment key={rating}>
                  <input
                    type='radio'
                    name='cleanlinessRating'
                    id={`cleanlinessRating${rating}`}
                    value={rating}
                    checked={formValues.cleanlinessRating === String(rating)}
                    onChange={handleInputChange}
                    required
                  />
                  <label
                    htmlFor={`cleanlinessRating${rating}`}
                    style={{ marginRight: "1rem", marginBottom: 0 }}
                  >
                    {rating}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <p>Does your food Packages Sanitized ?</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type='radio'
                name='foodPackagingSanitized'
                id='foodPackagingSanitizedYes'
                value='yes'
                checked={formValues.foodPackagingSanitized === "yes"}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor='foodPackagingSanitizedYes'
                style={{ marginRight: "1rem", marginBottom: 0 }}
              >
                Yes
              </label>
              <input
                type='radio'
                name='foodPackagingSanitized'
                id='foodPackagingSanitizedNo'
                value='no'
                checked={formValues.foodPackagingSanitized === "no"}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor='foodPackagingSanitizedNo'
                style={{ marginRight: "1rem", marginBottom: 0 }}
              >
                No
              </label>
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p>Were the restaurant employees wearing masks and gloves?</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type='radio'
                name='employeesWearingPPE'
                id='employeesWearingPPEYes'
                value='yes'
                checked={formValues.employeesWearingPPE === "yes"}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor='employeesWearingPPEYes'
                style={{ marginRight: "1rem", marginBottom: 0 }}
              >
                Yes
              </label>
              <input
                type='radio'
                name='employeesWearingPPE'
                id='employeesWearingPPENo'
                value='no'
                checked={formValues.employeesWearingPPE === "no"}
                onChange={handleInputChange}
              />
              <label
                htmlFor='employeesWearingPPENo'
                style={{ marginBottom: 0 }}
              >
                No
              </label>
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p>Were the utensils sanitized before use?</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type='radio'
                name='utensilsSanitized'
                id='utensilsSanitizedYes'
                value='yes'
                checked={formValues.utensilsSanitized === "yes"}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor='utensilsSanitizedYes'
                style={{ marginRight: "1rem", marginBottom: 0 }}
              >
                Yes
              </label>
              <input
                type='radio'
                name='utensilsSanitized'
                id='utensilsSanitizedNo'
                value='no'
                checked={formValues.utensilsSanitized === "no"}
                onChange={handleInputChange}
              />
              <label htmlFor='utensilsSanitizedNo' style={{ marginBottom: 0 }}>
                No
              </label>
            </div>
          </div>
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
        </fieldset>
      </form>
    </div>
  );
}

export default ChecklistAutomation;
