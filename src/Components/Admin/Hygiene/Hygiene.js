/** @format */

import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
const Hygiene = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [accuracy, setAccuracy] = useState(null);
  const [selectedHygieneLevel, setSelectedHygieneLevel] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get("/feed/hygiene-prediction");
        setRestaurantData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRestaurantData();
    const fetchAccuracy = async () => {
      try {
        const response = await axios.get("/feed/accuracy");
        console.log("accuracy response:", response.data);
        const accuracy = response.data.accuracy;
        setAccuracy(accuracy);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccuracy();
  }, []);

  const mapHygieneLevelToColor = (hygieneLevel) => {
    switch (hygieneLevel) {
      case "Extremely Hygienic":
        return "text-success";
      case "Moderate Hygiene":
        return "text-primary";
      case "Poor Hygiene":
        return "text-danger";
      default:
        return "";
    }
  };

  const handleHygieneLevelChange = (event) => {
    setSelectedHygieneLevel(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = restaurantData.filter(
    (data) =>
      (selectedHygieneLevel === "" ||
        data.hygieneLevel === selectedHygieneLevel) &&
      (searchQuery === "" ||
        data.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const handleScheduleClick = (data) => {
    setSelectedRestaurant(data);
    setShowModal(true);
  };
  const saveFormData = async (data) => {
    try {
      const response = await axios.post("/insp/schedule-inspection", data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Hygiene Prediction</h2>
        <div
          style={{
            textAlign: "right",
            color: "green",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          <div
            style={{
              color: "green",
              fontSize: "20px",
              border: "1px solid black",
              padding: "10px",
            }}
          >
            {accuracy === 1 && <p>Accuracy of prediction : {accuracy} , all predictions were correct</p>}
            {accuracy !== 1 && <p>Accuracy: {accuracy.toFixed(2)}</p>}
          </div>
        </div>
      </div>

      <Row>
        <Col>
          <div className='new__register'>
            <label htmlFor='hygieneLevelSelect'>Filter by hygiene level</label>{" "}
            <FilterListIcon />
            <select
              className='form-control mt-3'
              id='hygieneLevelSelect'
              value={selectedHygieneLevel}
              onChange={handleHygieneLevelChange}
            >
              <option value=''>All</option>
              <option value='Poor Hygiene'>Poor Hygiene</option>
              <option value='Moderate Hygiene'>Moderate Hygiene</option>
              <option value='Extremely Hygienic'>Extremely Hygienic</option>
            </select>
          </div>
        </Col>
        <Col>
          <div className='new__register'>
            <label htmlFor='searchQuery'>Search by restaurant name </label>{" "}
            <SearchIcon />
            <input
              type='text'
              className='form-control'
              id='searchQuery'
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </div>
        </Col>
      </Row>

      <table className='table table-bordered mt-4'>
        <thead>
          <tr>
            <th>SL.No</th>
            <th>Restaurant Name</th>
            <th>Restaurant Address</th>
            <th>Hygiene Level</th>
            {selectedHygieneLevel !== "Extremely Hygienic" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.restaurantName}</td>
              <td>{data.address}</td>
              <td
                className={mapHygieneLevelToColor(data.hygieneLevel)}
                style={{ fontWeight: 600 }}
              >
                {data.hygieneLevel}
              </td>
              {selectedHygieneLevel !== "Extremely Hygienic" && (
                <td>
                  {data.hygieneLevel === "Moderate Hygiene" ||
                  data.hygieneLevel === "Poor Hygiene" ? (
                    <button
                      className='btn btn-primary'
                      onClick={() => handleScheduleClick(data)}
                    >
                      Schedule Inspection
                    </button>
                  ) : (
                    <p style={{ fontWeight: 600 }}>No action needed</p>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Inspection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='restaurantName'>
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                type='text'
                value={selectedRestaurant.restaurantName}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId='scheduledDate'>
              <Form.Label>Inspection Date</Form.Label>
              <Form.Control
                type='date'
                min={new Date().toISOString().split("T")[0]}
                max={
                  new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              saveFormData({
                restaurantId: selectedRestaurant.restaurantId,
                restaurantName: selectedRestaurant.restaurantName,
                scheduledDate: scheduledDate,
              });
              setShowModal(false);
            }}
          >
            Schedule Inspection
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Hygiene;
