/** @format */

import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { Modal, Button } from "react-bootstrap";

const Inspection = () => {
  const [scheduledInspections, setScheduledInspections] = useState([]);

  useEffect(() => {
    axios
      .get("/insp/scheduled-restaurants")
      .then((res) => setScheduledInspections(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [showModal, setShowModal] = useState(false);
  const [inspectionInfo, setInspectionInfo] = useState({
    inspectorName: "",
    inspectionDate: "",
    inspectionResults: "",
    inspectionRating: "",
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `insp/update-inspection-report/${inspectionInfo._id}`,
        inspectionInfo
      )
      .then((response) => {
        handleClose();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h2>Scheduled Inspections</h2>
      <table className='table table-bordered mt-4'>
        <thead>
          <tr>
            <th>SL.No</th>
            <th>Restaurant Name</th>
            <th>Address</th>
            <th>Scheduled Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {scheduledInspections.map((inspection, index) => (
            <tr key={inspection._id}>
              <td>{index + 1}</td>
              <td>{inspection.restaurantName}</td>
              <td>{inspection.address}</td>
              <td>{formatDate(inspection.scheduledDate)}</td>
              <td>
                {!inspection.isDone ? (
                  new Date(inspection.scheduledDate) <= new Date() ? (
                    <button
                      style={{
                        backgroundColor: "blue",
                        color: "#fff",
                        padding: "10px 20px",
                        border: "none",
                      }}
                      onClick={() => {
                        if (!inspection._id) {
                          console.log("Invalid inspection ID");
                          return;
                        }

                        axios
                          .put(`/insp/update-inspection/${inspection._id}`, {
                            isDone: true,
                          })
                          .then(() =>
                            setScheduledInspections(
                              scheduledInspections.map((insp) =>
                                insp._id === inspection._id
                                  ? { ...insp, isDone: true }
                                  : insp
                              )
                            )
                          )
                          .catch((err) => console.log(err));
                      }}
                    >
                      Completed
                    </button>
                  ) : (
                    <p style={{ fontWeight: 600, color: "gray" }}>
                      Inspection scheduled
                    </p>
                  )
                ) : (
                  <>
                    <p style={{ fontWeight: 600 }}>Inspection Completed</p>
                    <button
                      style={{
                        backgroundColor: "blue",
                        color: "#fff",
                        padding: "7px 10px",
                        border: "none",
                      }}
                      onClick={() => {
                        setShowModal(true);
                        setInspectionInfo({
                          inspectorName: "",
                          inspectionDate: "",
                          inspectionResults: "",
                          inspectionRating: "",
                          _id: inspection._id,
                        });
                      }}
                    >
                      Report
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div style={{ display: "inline-flex", marginBottom: "1rem" }}>
              <label style={{ fontWeight: 600 }}>
                Inspector Name:
                <input
                  type='text'
                  value={inspectionInfo.inspectorName}
                  onChange={(e) =>
                    setInspectionInfo({
                      ...inspectionInfo,
                      inspectorName: e.target.value,
                    })
                  }
                  style={{ marginLeft: "0.5rem" }}
                />
              </label>
              <div style={{ marginRight: "2rem" }}></div>
              <label style={{ fontWeight: 600 }}>
                Inspection Date:
                <input
                  type='date'
                  value={inspectionInfo.inspectionDate}
                  onChange={(e) =>
                    setInspectionInfo({
                      ...inspectionInfo,
                      inspectionDate: e.target.value,
                    })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  style={{ marginLeft: "0.5rem" }}
                />
              </label>
            </div>
            <label style={{ marginBottom: "1rem", fontWeight: 600 }}>
              Rating Out of 5:
              <input
                type='number'
                value={inspectionInfo.rating}
                onChange={(e) =>
                  setInspectionInfo({
                    ...inspectionInfo,
                    inspectionRating: Math.min(parseInt(e.target.value), 5),
                  })
                }
                min='0'
                max='5'
                style={{ marginLeft: "0.5rem" }}
              />
            </label>

            <label style={{ marginBottom: "1rem", fontWeight: 600 }}>
              Comments:
              <textarea
                value={inspectionInfo.inspectionResults}
                onChange={(e) =>
                  setInspectionInfo({
                    ...inspectionInfo,
                    inspectionResults: e.target.value,
                  })
                }
                style={{
                  marginLeft: "0.5rem",

                  height: "5rem",
                  width: "20rem",
                }}
              />
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleUpdate}>
            Download Report
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inspection;
