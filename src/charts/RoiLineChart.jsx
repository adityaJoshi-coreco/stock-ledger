import React from 'react';
import { Line } from 'react-chartjs-2';
import ChartContainer from './ChartContainer';

const RoiLineChart = ({ data }) => {
  return (
    <ChartContainer title="ROI Line Chart">
      <div className="max-w-full w-full h-72">
        <Line data={data} />
      </div>
    </ChartContainer>
  );
};

export default RoiLineChart;
