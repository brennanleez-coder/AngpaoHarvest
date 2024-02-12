import React, { useState, useEffect } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useMemo } from 'react';
import { Chart } from "react-google-charts";

const Charts = () => {
  const [chartWidth, setChartWidth] = useState(400);
  const [angpaolist, setAngpaoList] = useState([]);

  useEffect(() => {
    // Load data from localStorage once on component mount
    const storedData = JSON.parse(localStorage.getItem('CNY')) || { angpao: [] };
    setAngpaoList(storedData.angpao);
  }, []);

  useEffect(() => {
    function handleResize() {
      setChartWidth(window.innerWidth < 768 ? window.innerWidth * 0.8 : 400);
    }

    window.addEventListener('resize', handleResize);

    // Call it immediately in case the window size has already changed
    handleResize();

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const options = {
    title: "Distribution of Angpaos by Category",
    is3D: true,
    chartArea: { width: '100%', height: '70%' }, // Adjust chart area to prevent cut-off labels
  };

  const pieChartData = [
    ["Category", "Value"],
    ...angpaolist.reduce((acc, { category, amount }) => {
      const index = acc.findIndex(item => item[0] === category);
      if (index > -1) {
        acc[index][1] += amount;
      } else {
        acc.push([category, amount]);
      }
      return acc;
    }, [])
  ];

  return (
    <div>
      <div>
        <Chart
          chartType="PieChart"
          data={pieChartData}
          width={`${chartWidth}px`} // Use state value to set width
          height="400px"
          options={options}
          loader={<div>Loading Chart</div>}
        />
      </div>
    </div>
  );
};

export default Charts;
