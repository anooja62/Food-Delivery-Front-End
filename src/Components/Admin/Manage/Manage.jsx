import React from 'react'

import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";

import {
  approveRestaurant,
} from "../../../store/shopping-cart/restaurantSlice";


 const Manage = ({restaurant}) => {
  const dispatch = useDispatch();
  const handleApprove = async (id) => {
    dispatch(approveRestaurant(id));
  };
 
  

 
  
  return (<>
 
 
 <tbody>
            <tr> 
            
    <td className='text-center'>{restaurant.name}</td>
    <td className='text-center'>{restaurant.email}</td>
    <td className='text-center'>{restaurant.phone}</td>
    <td className='text-center'>{restaurant.address}</td>
    <td className='text-center'> 
    <Button variant="success" onClick={() => handleApprove(restaurant._id)}>Approve</Button>
   
    
    </td>
    </tr>
    </tbody>
    </>
   
  ) 
  
}
export default Manage
