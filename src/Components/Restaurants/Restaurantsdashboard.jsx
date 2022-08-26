import React from 'react'
import Topbar from '../Admin/Topbar/Topbar'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import WhereToVoteOutlinedIcon from '@mui/icons-material/WhereToVoteOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
const Restaurantsdashboard = () => {
  return (
    <div>
      <Topbar/>
      <Tabs>
        <TabList>
          <Tab>
            <p><DashboardOutlinedIcon/> Dashboard</p>
          </Tab>
          <Tab>
            <p><LocalDiningOutlinedIcon/> Menu Card</p>
          </Tab>
          <Tab>
            <p><LocalGroceryStoreOutlinedIcon/> Orders</p>
          </Tab>
          <Tab>
            <p><CurrencyRupeeOutlinedIcon/> Payments</p>
          </Tab>
          <Tab>
            <p><StarHalfOutlinedIcon/> Reviews</p>
          </Tab>
          <Tab>
            <p><LockOutlinedIcon/> Log Out</p>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="panel-content">
            
            <div className="row mb-3">
                    <div className="col-xl-3 col-sm-6 py-2">
                      <div className="card bg-success text-white h-100">
                        <div className="card-body bg-success">
                          <div className="rotate">
                            <WhereToVoteOutlinedIcon fontSize='large'/>
                          </div>
                          <h6 className="text-uppercase mt-3">Orders Completed</h6>
                          <h1 className="display-4" style={{ color: "#fff" }}>
                           8
                          </h1>
                        </div>
                      </div>
                    </div>
                   
                    <div className="col-xl-3 col-sm-6 py-2">
                      <div className="card text-white bg-danger h-100">
                        <div className="card-body bg-danger">
                          <div className="rotate">
                           <PendingActionsOutlinedIcon fontSize='large'/>
                          </div>
                          <h6 className="text-uppercase mt-3">Orders Pending</h6>
                          <h1 className="display-4" style={{ color: "#fff" }}>
                            6
                          </h1>
                        </div>
                      </div>
                    </div>
                    
                  </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 2</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 3</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 4</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 5</h2>
          </div>
        </TabPanel>
      </Tabs>
    
    </div>
  )
}

export default Restaurantsdashboard