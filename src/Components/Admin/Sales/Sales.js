import React, { useState } from 'react';

const SalesAnalysis = () => {
  const [salesData, setSalesData] = useState([]);

  const getSalesData = () => {
    fetch('http://api.swiggy.com/sales/analysis')
      .then(res => res.json())
      .then(data => setSalesData(data));
  }

  const analyzeSalesData = () => {
    const salesSummary = salesData.reduce((acc, cur) => {
      acc.salesTotal += cur.sales;
      acc.profitTotal += cur.profit;
      return acc;
    }, { salesTotal: 0, profitTotal: 0 });

    const salesAverage = salesSummary.salesTotal / salesData.length;
    const profitAverage = salesSummary.profitTotal / salesData.length;

    const salesSummaryString = `Total sales: $${salesSummary.salesTotal} | Total profit: $${salesSummary.profitTotal}`;
    const salesAverageString = `Average sales: $${salesAverage} | Average profit: $${profitAverage}`;

    return (
      <div>
        <h3>Sales Summary</h3>
        {salesSummaryString}
        <h3>Sales Average</h3>
        {salesAverageString}
      </div>
    );
  }

  return (
    <div>
      <button onClick={getSalesData}>Get Sales Data</button>
      {salesData.length ? analyzeSalesData() : <p>No sales data yet</p>}
    </div>
  );
}

export default SalesAnalysis;