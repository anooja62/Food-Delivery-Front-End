import React from 'react'
import './manage.css'
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { Row,Col } from 'react-bootstrap';
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
    <td className='text-center'> <Row>
    <Col><Button variant="success" onClick={() => handleApprove(restaurant._id)}>Approve</Button></Col>
    <Col><Button variant="danger">Delete</Button></Col>
    </Row>
    </td>
    </tr>
    </tbody>
    </>
   
  ) 
  
}
export default Manage
