import React from 'react';
import { Pie } from 'react-chartjs-2';
import ChartContainer from './ChartContainer';

const PortfolioPieChart = ({ data }) => {
  return (
    <ChartContainer title="Portfolio Distribution">
      <div className="max-w-full w-full h-72">
        <Pie data={data} />
      </div>
    </ChartContainer>
  );
};

export default PortfolioPieChart;
