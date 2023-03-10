/** @format */

import React from "react";
import "./deliverytopbar.css";
import { useCookies } from "react-cookie";

export default function DeliveryTopbar() {
  const [cookies, setCookie] = useCookies(null);
  const deliveryboyName = cookies.deliveryboyName;
  const deliveryboyProfileImg = cookies.deliveryboyProfileImg;

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
    <div className='topbar'>
      <div className='topbarWrapper'>
        <div className='topLeft'>
          <div className='logo'></div>
          <h1>{deliveryboyName}</h1>
        </div>

        <div className='topRight'>
          <div className='dateTime'>{currentDate}</div>
          <div className='topAvatar'>
            <img src={deliveryboyProfileImg} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
}
