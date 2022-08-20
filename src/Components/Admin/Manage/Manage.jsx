import React from 'react'


import { useDispatch } from "react-redux";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  rejectRestaurant,
} from "../../../store/shopping-cart/restaurantSlice";


 const Manage = ({restaurant}) => {
  const dispatch = useDispatch();
  const handleReject = async (id) => {
    dispatch(rejectRestaurant(id));
  };
 
  

 
  
  return (<>
 
 
 <tbody>
            <tr> 
            
    <td className='text-center'>{restaurant.name}</td>
    <td className='text-center'>{restaurant.email}</td>
    <td className='text-center'>{restaurant.phone}</td>
    <td className='text-center'>{restaurant.address}</td>
    <td className='text-center'> 
   
   

<IconButton aria-label="delete" size="large">
  <DeleteIcon fontSize="inherit" onClick={() => handleReject(restaurant._id)} />
</IconButton>
    
    </td>
    </tr>
    </tbody>
    </>
   
  ) 
  
}
export default Manage
