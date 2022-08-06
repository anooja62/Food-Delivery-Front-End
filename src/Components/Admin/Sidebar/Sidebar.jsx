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
            
        
            
          
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Restaurants</h3>
          <ul className="sidebarList">
          <Link to="/manage" className="link">
            <li className="sidebarListItem">
            <i class="ri-edit-box-line"></i>
              Manage
            </li>
            </Link>
        
           
          </ul>
        </div>
      </div>
    </div>
  
   
  );
}