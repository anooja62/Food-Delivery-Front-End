import React, { useState } from 'react';

const Forecast = () => {
    const [salesData, setSalesData] = useState([
      { month: 'Jan', sales: 1000 },
      { month: 'Feb', sales: 1200 },
      { month: 'Mar', sales: 1300 },
      { month: 'Apr', sales: 1500 },
      { month: 'May', sales: 1700 },
    ]);
    const [forecast, setForecast] = useState(null);
  
    const calculateForecast = (numMonths) => {
      // Calculate the average monthly growth rate
      const averageGrowthRate = (salesData[salesData.length - 1].sales - salesData[0].sales) / salesData.length;
    
      // Use the average growth rate to calculate the forecast for the next n months
      let nextMonthForecast = salesData[salesData.length - 1].sales;
      let forecastData = [];
      for (let i = 1; i <= numMonths; i++) {
        nextMonthForecast += averageGrowthRate;
        forecastData.push({ month: `Forecast ${i}`, sales: nextMonthForecast });
      }
    
      setForecast(forecastData);
    };
  
    return (
      <div>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Month</th>
              <th>Sales</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map(sale => (
              <tr key={sale.month}>
                <td>{sale.month}</td>
                <td>{sale.sales}</td>
              </tr>
            ))}
            {forecast && forecast.map(fc => (
              <tr key={fc.month}>
                <td>{fc.month}</td>
                <td>{fc.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => calculateForecast(3)}  style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}>Calculate Forecast</button>
      </div>
    );
  };
  
 
  

export default Forecast;
