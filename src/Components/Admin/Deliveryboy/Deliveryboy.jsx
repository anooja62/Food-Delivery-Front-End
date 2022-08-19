import React from 'react'

import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";

import {
  approveDeliveryboy,
} from "../../../store/shopping-cart/deliverySlice";


 const Deliveryboy = ({deliveryboy}) => {
  const dispatch = useDispatch();
  const handleApprove = async (id) => {
    dispatch(approveDeliveryboy(id));
  };
 
 

 
  
  return (<>
 
 
 <tbody>
            <tr> 
           
    <td className='text-center'>{deliveryboy.name}</td>
    <td className='text-center'>{deliveryboy.email}</td>
    <td className='text-center'>{deliveryboy.phone}</td>
    <td className='text-center'>{deliveryboy.city}</td>
    <td className='text-center'> 
    <Button variant="success" onClick={() => handleApprove(deliveryboy._id)}>Approve</Button>
   
    
    </td>
    </tr>
    </tbody>
    </>
   
  ) 
  
}
export default Deliveryboy
