import React, { useState } from "react";
import "./top.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { useCookies } from "react-cookie";

export default function Top({ orderCount }) {
  const [cookies, setCookie] = useCookies(null);

  const restaurantName = cookies.restaurantName;

  const [openNotification, setOpenNotification] = useState(false);

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const handleNotificationIconClick = () => {
    setOpenNotification(!openNotification);
  };

  return (
    <div className='topbar' style={{ backgroundColor: "white" }}>
      <div className='topbarWrapper'>
        <div className='topLeft'>
          <span className='logo'>{restaurantName}</span>
        </div>

        <div className='topRight'>
          <div className='dateTime' style={{ color: "black" }}>
            {currentDate}
          </div>
          <div className='topAvatar'>
            <Badge badgeContent={orderCount} color='error'>
              <NotificationsIcon
                fontSize='large'
                onClick={handleNotificationIconClick}
              />
            </Badge>
          </div>
        </div>
      </div>
      {openNotification && (
        <div
          className='notificationPanel'
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: "black",
            padding: "10px",
            position: "absolute",
            top: "60px",
            right: "10px",
            borderRadius: "5px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <p>You Have {orderCount} new Orders!</p>
        </div>
      )}
    </div>
  );
}
