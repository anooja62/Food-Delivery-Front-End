import React from 'react'
import './manage.css'
import Button from 'react-bootstrap/Button';
import Sidebar from '../Sidebar/Sidebar';


 const Manage = ({restaurant}) => {
  console.log(restaurant,"fdsfsdfsdfdsfdsfdfd")
  return (<>
 
 
 <tbody>
            <tr> 
    <td className='text-center'></td>
    <td className='text-center'>{restaurant.name}</td>
    <td className='text-center'>{restaurant.email}</td>
    <td className='text-center'>{restaurant.phone}</td>
    <td className='text-center'>{restaurant.address}</td>
    <td className='text-center'> <Button variant="success">Approve</Button><Button variant="danger">Delete</Button></td>
    </tr>
    </tbody>
    </>
   
  ) 
  
}
export default Manage
