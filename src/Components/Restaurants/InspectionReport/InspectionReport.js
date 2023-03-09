/** @format */

import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { useCookies } from "react-cookie";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import jsPDF from "jspdf";

const InspectionReport = () => {
  const [cookies, setCookies] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  const restaurantName = cookies.restaurantName;
  const [inspections, setInspections] = useState([]);

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const response = await axios.get(
          `insp/restaurants-inspection-report-view/${restaurantId}`
        );
        setInspections(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInspections();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.text(`${restaurantName}`, doc.internal.pageSize.width / 2, 30, {
      align: "center",
    });

    const startY = 50;
    const lineSpacing = 10;
    const leftMargin = 10;
    const rightMargin = 190;

    inspections.forEach((inspection, index) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(
        `Inspection Date: ${new Date(inspection.updatedAt).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )}`,
        leftMargin,
        startY + index * lineSpacing
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(
        `Inspector Name: ${inspection.inspectorName}`,
        rightMargin,
        startY + index * lineSpacing,
        { align: "right" }
      );

      let recommendation = "";
      if (inspection.inspectionRating === 5) {
        recommendation =
          "The restaurant is already maintaining high hygiene standards. However, it is always important to keep up with the practices and make sure that the staff is following all the protocols regularly.";
      } else if (inspection.inspectionRating === 4) {
        recommendation =
          "The restaurant is doing well, but there is still scope for improvement. The staff should be trained and educated on maintaining good hygiene practices, and the restaurant should continue to monitor and improve their hygiene standards.";
      } else if (inspection.inspectionRating === 3) {
        recommendation =
          "The restaurant needs to work on improving its hygiene practices. This could include proper training for the staff, regular cleaning schedules, and monitoring hygiene levels regularly.";
      } else if (inspection.inspectionRating === 2) {
        recommendation =
          "The restaurant needs immediate attention to improve its hygiene practices. They should be given proper training and education, and the restaurant should take all necessary steps to maintain cleanliness and hygiene.";
      } else {
        recommendation =
          "The restaurant needs to be closed temporarily until they can improve their hygiene standards. They should undergo a thorough cleaning and sanitization process and receive proper training and education before reopening.";
      }

      const recommendationLines = doc.splitTextToSize(recommendation, 190);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(
        `Recommendation:`,
        leftMargin,
        startY + (index + 3) * lineSpacing
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(
        recommendationLines,
        leftMargin,
        startY + (index + 4) * lineSpacing
      );
    });

    doc.save(`${restaurantName}-HygieneInspectionReport.pdf`);
  };

  return (
    <div>
      <table className='table table-bordered mt-3'>
        <thead>
          <tr>
            <th>SL.No</th>
            <th>Inspection Date</th>
            <th>Inspector Name</th>
            <th>Comments</th>
            <th>Rating out of 5</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {inspections.map((inspection, index) => (
            <tr key={inspection._id}>
              <td>{index + 1}</td>
              <td>
                {new Date(inspection.updatedAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>

              <td>{inspection.inspectorName}</td>
              <td>{inspection.inspectionResults}</td>
              <td>{inspection.inspectionRating}</td>
              <td>
                <DownloadForOfflineIcon onClick={downloadPDF} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InspectionReport;
