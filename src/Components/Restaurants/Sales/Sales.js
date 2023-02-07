import React, { useState, useEffect } from 'react';
import axios from '../../../axios'

const Sales = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    axios.get('/pay/total-amount-per-month')
      .then(res => {
        if (res.status === 200) {
          setSalesData(res.data.payments);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Month</th>
          <th>Sales</th>
        </tr>
      </thead>
      <tbody>
        {salesData.map(({ month, totalAmount: sales }) => (
          <tr key={month}>
            <td>{month}</td>
            <td>{sales}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default Sales;
