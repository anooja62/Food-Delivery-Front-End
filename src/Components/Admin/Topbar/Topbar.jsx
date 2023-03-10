import React from "react";
import "./topbar.css";


export default function Topbar() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  return (
    <div className="topbar" style={{ backgroundColor: 'blue' }}>
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo" style={{ color: 'white' }}>DELIORDER ADMIN</span>
        </div>
        <div className="topRight">
         
        <div className='dateTime' style={{color:'white'}}>{currentDate}</div>
          
        </div>
      </div>
    </div>
  );
}