/** @format */

import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import jsPDF from "jspdf";
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
  });

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
  
    // Add border
    doc.setLineWidth(1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
  
    // Add main title
    const restaurantName = "Restaurant Name";
    const titleFontSize = 20;
    const titleWidth = doc.widthOfString(restaurantName, { fontSize: titleFontSize });
    doc.setFontSize(titleFontSize);
    doc.text(restaurantName, (pageWidth - titleWidth) / 2, 30);
  
    // Add inspector name and inspection date
    doc.setFontSize(12);
    doc.text(`Inspector Name: ${inspectionInfo.inspectorName}`, 10, 50);
    doc.text(`Inspection Date: ${inspectionInfo.inspectionDate}`, 10, 60);
  
    // Add inspection results
    doc.text(`Inspection Results: ${inspectionInfo.inspectionResults}`, 10, 80);
  
    // Add generated date and time in footer
    const generatedDate = new Date().toLocaleString();
    const footerFontSize = 10;
    const footerText = `Generated on ${generatedDate}`;
    const footerWidth = doc.widthOfString(footerText, { fontSize: footerFontSize });
    doc.setFontSize(footerFontSize);
    doc.text(footerText, (pageWidth - footerWidth) / 2, pageHeight - 20);
  
    doc.save("inspection-report.pdf");
    setShowModal(false);
  };
  
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
          <form
            onSubmit={handleGenerateReport}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
              Inspection Results:
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
                  height: "10rem",
                  width: "30rem",
                }}
              />
            </label>
            <button
              type='submit'
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.3rem",
              }}
             
            >
              Save Report
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleGenerateReport}>
            Download Report
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inspection;
