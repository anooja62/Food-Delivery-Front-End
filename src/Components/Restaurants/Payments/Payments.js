/** @format */

import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useCookies } from "react-cookie";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SavingsIcon from "@mui/icons-material/Savings";
import { Row, Col } from "react-bootstrap";
import logoimg from '../../../../src/assets/images/deliorderlogo.png'
import { useSelector, useDispatch } from "react-redux";
import {
  paySalary,
  getSalaryDetails,
} from "../../../store/shopping-cart/salarySlice";
import jsPDF from "jspdf";
import "jspdf-autotable";
const Payments = () => {
 
  const [cookies, setCookies] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  const salaryDetailss = useSelector((state) => state.salary.paysalarydetails);

  const monthlySalary = useSelector(
    (state) => state.salary.monthlysalarydetails.salaryData
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(paySalary(restaurantId));
    dispatch(getSalaryDetails(restaurantId));
  }, []);
  const options = {
    title: {
      text: "Monthly Earnings",
    },
    xAxis: {
      categories: monthlySalary?.map((data) => {
        return new Date(0, data.month - 1).toLocaleString("default", {
          month: "long",
        });
      }),
    },
    yAxis: {
      title: {
        text: "Salary (in Rupee)",
      },
    },
    series: [
      {
        name: "Earnings",
        data: monthlySalary?.map((data) => {
          return data.salary || 0;
        }),
      },
      {
        name: "Order Amount",
        data: monthlySalary?.map((data) => {
          return data.totalOrderAmount || 0;
        }),
      },
    ],
  };
  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add logo
    const logo = new Image();
    logo.src = logoimg;
    doc.addImage(logo, "PNG", 15, 15, 30, 30);
  
    // Add title
    const title = "Monthly Earnings Report";
    const fontSize = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getStringUnitWidth(title) * fontSize / doc.internal.scaleFactor;
    const x = (pageWidth - textWidth) / 2;
    doc.setFontSize(fontSize);
    doc.text(title, x, 36);
  
    // Add border
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 270);
  
    doc.autoTable({
      head: [["SL.No", "Month", "Total Order Amount", "Total Earnings"]],
      body: monthlySalary.map((data, index) => {
        const monthName = new Date(0, data.month - 1).toLocaleString("default", {
          month: "long",
        });
        return [
          index + 1,
          monthName,
          data.totalOrderAmount || "No order",
          data.salary || "No earnings",
        ];
      }),
      startY: 56,
      didDrawPage: function (data) {
     
      const date = new Date().toLocaleString();
      const pageCount = doc.internal.getNumberOfPages();
      const footerText = `Report generated on ${date} | Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`;
      const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      const textWidth = doc.getStringUnitWidth(footerText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const x = (doc.internal.pageSize.getWidth() - textWidth) / 2;
      doc.setFontSize(8);
      doc.text(footerText, x, pageHeight - 10);
    },
  });
  doc.save("report.pdf");
};
  
  


 




  return (
    <div>
      <div className='row mb-3'>
        <div className='col-xl-3 col-sm-6 py-2'>
          <div className='card bg-success text-white h-100'>
            <div className='card-body bg-success'>
              <div className='rotate'>
                <CurrencyRupeeIcon fontSize='large' />
              </div>
              <h6 className='text-uppercase'>Total Order Amount</h6>
              <h1 className='display-4' style={{ color: "#fff" }}>
                {salaryDetailss.totalOrderAmount}
              </h1>

              {!salaryDetailss.totalOrderAmount ? (
                <p>No salary details available.</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className='col-xl-3 col-sm-6 py-2'>
          <div className='card bg-success text-white h-100'>
            <div className='card-body bg-danger'>
              <div className='rotate'>
                <SavingsIcon fontSize='large' />
              </div>
              <h6 className='text-uppercase'>Total Earnings</h6>
              <h1 className='display-4' style={{ color: "#fff" }}>
                {salaryDetailss.restaurantSalary}
              </h1>

              {!salaryDetailss.restaurantSalary ? (
                <p>No salary details available.</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className='col-xl-3 col-sm-6 py-2'>
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
            onClick={generatePDF}
          >
            Download Report
          </button>
        </div> 
      </div>

      <div>
        <Row>
          <Col>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>SL. No.</th>
                  <th>Month</th>
                  <th>Total Order Amount</th>
                  <th>Total Earnings</th>
                </tr>
              </thead>
              <tbody>
                {monthlySalary?.map((data, index) => {
                  const monthName = new Date(0, data.month - 1).toLocaleString(
                    "default",
                    {
                      month: "long",
                    }
                  );

                  return (
                    <tr key={data._id}>
                      <td>{index + 1}</td>
                      <td>{monthName}</td>
                      <td>{data.totalOrderAmount || "No order"}</td>
                      <td>{data.salary || "No earnings"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
          <Col>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Payments;
