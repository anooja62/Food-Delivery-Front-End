import React from 'react'
import './manage.css'
import Button from 'react-bootstrap/Button';

import { Row,Col } from 'react-bootstrap';



 const Manage = ({restaurant}) => {

 
 
  return (<>
 
 
 <tbody>
            <tr> 
   
    <td className='text-center'>{restaurant.name}</td>
    <td className='text-center'>{restaurant.email}</td>
    <td className='text-center'>{restaurant.phone}</td>
    <td className='text-center'>{restaurant.address}</td>
    <td className='text-center'> <Row>
    <Col><Button variant="success">Approve</Button></Col>
    <Col><Button variant="danger">Delete</Button></Col>
    </Row>
    </td>
    </tr>
    </tbody>
    </>
   
  ) 
  
}
export default Manage
