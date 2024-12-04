import React from 'react';

const ChartContainer = ({ children, title }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <div className="chart-container">{children}</div>
    </div>
  );
};

export default ChartContainer;
