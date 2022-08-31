import React from "react";
import "./top.css";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useCookies } from "react-cookie";

export default function Top() {
    const [cookies, setCookie] = useCookies(null);
 
  const restaurantName = cookies.restaurantName;
 
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">{restaurantName}</span>
        </div>
        <div className="topRight">
         
         
          <AdminPanelSettingsIcon fontSize="large"/>
        </div>
      </div>
    </div>
  );
}