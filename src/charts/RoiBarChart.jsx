import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartContainer from './ChartContainer';

const RoiBarChart = ({ data }) => {
  return (
    <ChartContainer title="ROI Bar Chart">
      <div className="max-w-full w-full h-72">
        <Bar data={data} />
      </div>
    </ChartContainer>
  );
};

export default RoiBarChart;
