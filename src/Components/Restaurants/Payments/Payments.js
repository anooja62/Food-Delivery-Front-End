import React, { useEffect } from 'react';
import axios from '../../../axios';
import { useCookies } from 'react-cookie';

const Payments = () => {
  const [cookies,setCookies] = useCookies(null);
  const restaurantId = cookies.restaurantId;

  useEffect(() => {
    axios.post("salary/give-salary")
      .then(response => {
        console.log(response.data); 
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Payments</h1>
      <p>Calculating and giving salary to restaurants...</p>
    </div>
  );
};

export default Payments;
