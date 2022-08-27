import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const DeliveryStaff = () => {
  return (
    <div>
<br></br>
<br></br>
<Tabs>
        <TabList>
          <Tab>
            <p><DeliveryDiningOutlinedIcon/> Orders</p>
          </Tab>
          
          <Tab>
            <p><CurrencyRupeeOutlinedIcon/> Payment</p>
          </Tab>
          <Tab>
            <p><ManageAccountsOutlinedIcon/> Profile</p>
          </Tab>
          <Tab>
            <p><LockOutlinedIcon/> Logout</p>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="panel-content">
            <h2>Any content 1</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 2</h2>
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

export default DeliveryStaff