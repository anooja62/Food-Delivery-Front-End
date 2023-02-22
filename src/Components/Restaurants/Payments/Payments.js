import React,{useEffect} from 'react'
import axios from '../../../axios';
import { useCookies } from "react-cookie";
const Payments = () => {
  const [cookies, setCookie] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  useEffect(() => {
    axios.post(`salary/pay-salaries/${restaurantId}`)
      .then(response => {
        console.log(response.data); 
      })
      .catch(error => {
        console.error(error);
        
      });
  }, []);

  return (
    <div>
hello
    </div>
  )
}

export default Payments