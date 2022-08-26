import React from "react";
import "./topbar.css";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function Topbar() {
 
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
         
         
          <AdminPanelSettingsIcon fontSize="large"/>
        </div>
      </div>
    </div>
  );
}