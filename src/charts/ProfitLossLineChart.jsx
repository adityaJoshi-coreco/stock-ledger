import React from 'react';
import { Line } from 'react-chartjs-2';
import ChartContainer from './ChartContainer';

const ProfitLossLineChart = ({ data }) => {
  return (
    <ChartContainer title="Profit/Loss Line Chart">
      <div className="max-w-full w-full h-72">
        <Line data={data} />
      </div>
    </ChartContainer>
  );
};

export default ProfitLossLineChart;
