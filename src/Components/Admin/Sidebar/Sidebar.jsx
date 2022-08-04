import "./adminsidebar.css"

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
            <i class="ri-home-2-line"></i>
              Home
            </li>
            </Link>
            <li className="sidebarListItem">
            <i class="ri-line-chart-line"></i>
              Analytics
            </li>
            <li className="sidebarListItem">
              
            <i class="ri-shopping-bag-3-line"></i>
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
              <i class="ri-user-line"></i>
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
              <i class="ri-store-2-line"></i>
                Products
              </li>
            </Link>
            <li className="sidebarListItem">
            <i class="ri-bank-card-line"></i>
              Transactions
            </li>
            <li className="sidebarListItem">
            <i class="ri-file-chart-line"></i>
              Reports
            </li>
          </ul>
        </div>
       
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Restaurants</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
            <i class="ri-edit-box-line"></i>
              Manage
            </li>
            <li className="sidebarListItem">
            <i class="ri-line-chart-fill"></i>
              Analytics
            </li>
            <li className="sidebarListItem">
            <i class="ri-file-chart-line"></i>
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}