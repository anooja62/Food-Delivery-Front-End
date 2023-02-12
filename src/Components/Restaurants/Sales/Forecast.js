import React, { useState, useEffect } from 'react';
import axios from '../../../axios';

const Forecast = () => {
    const [salesData, setSalesData] = useState([]);
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("pay/total-amount-per-month");
                setSalesData(response.data.payments);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const calculateForecast = (numMonths) => {
        // Calculate the average monthly growth rate
        const averageGrowthRate = (salesData[salesData.length - 1].totalAmount - salesData[0].totalAmount) / salesData.length;

        // Use the average growth rate to calculate the forecast for the next n months
        let nextMonthForecast = salesData[salesData.length - 1].totalAmount;
        let forecastData = [];
        for (let i = 1; i <= numMonths; i++) {
            nextMonthForecast += averageGrowthRate;
            forecastData.push({ month: `Forecast ${i}`, totalAmount: nextMonthForecast });
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
                            <td>{sale.totalAmount}</td>
                        </tr>
                    ))}
                    {forecast && forecast.map(fc => (
                        <tr key={fc.month}>
                            <td>{fc.month}</td>
                            <td>{fc.totalAmount}</td>
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
