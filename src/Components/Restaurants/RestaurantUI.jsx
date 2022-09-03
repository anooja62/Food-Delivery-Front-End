import React,{useEffect} from 'react'
import FastfoodIcon from '@mui/icons-material/Fastfood';

import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Menu from './Menu/Menu';

import '../../styles/restaurantui.css'
import { getMenus } from "../../store/shopping-cart/menuSlice";

import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useParams,
} from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import About from './About/About';


import Details from './Details/Details';

 const RestaurantUI = () => {
  
  let { id } = useParams();
 
  const menuLIst = useSelector((state) => state.menu.list);
 
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMenus(id));
  }, []);

    
  return (
    <div>
      
           <div style={{marginLeft:35}}>
           
             
                  
                  <Details  />
               
                </div>
        
    
      <div className='emenu mt-5'>
      
      <Tabs>
        <TabList>
          <Tab>
            <p><LocalDiningOutlinedIcon/> E Menu Card</p>
          </Tab>
          <Tab>
            <p><FastfoodIcon/> Combos</p>
          </Tab>
          <Tab>
          <p><StarHalfIcon/> Reviews</p>
           
          </Tab>
          <Tab>
          <p><FoodBankIcon/> About Us</p>
          </Tab>
         
        </TabList>

        <TabPanel>
          
          <div className="panel-content">
          <h4>Order Now !</h4>
          <div className="row d-flex justify-content-between ">
          {menuLIst.map((u) => (
              <Menu key={u.id} menu={u} />))}
         </div>
         
         </div>
        
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
         
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2 className='text-center'>Add review</h2>
            <form>
              <div className='new__register'>
                <label>Your Name</label>
                <input type="text" name='name' placeholder='Your name'></input>
              </div>
              <div className='new__register'>
              <label>Review</label>
              <div className='new__register'>
                <textarea rows={5} placeholder='Review....'></textarea>
              </div>
              </div>
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
          <About/>
          </div>
        </TabPanel>
       
      </Tabs>
      </div>
      
            </div>
    
  )
}

export default RestaurantUI
