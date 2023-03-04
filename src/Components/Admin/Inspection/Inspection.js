/** @format */

import React, { useState, useEffect } from "react";
import axios from "../../../axios";
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
                  <p style={{ fontWeight: 600 }}>Inspection Completed</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inspection;
