// CSVExport.js
import React from 'react';

const CSVExport = ({ entries }) => {
  // Function to convert entries to CSV format
  const convertToCSV = () => {
    const header = ["Stock Name", "Buy Price", "Sell Price", "Quantity", "Profit", "ROI %"];
    const rows = entries.map(entry => [
      entry.stockName,
      entry.buyPrice,
      entry.sellPrice,
      entry.quantity,
      entry.profit,
      entry.roi
    ]);
    
    // Combine header and rows into CSV format
    const csvContent = [
      header.join(','), 
      ...rows.map(row => row.join(','))
    ].join('\n');

    return csvContent;
  };

  // Function to download the CSV file
  const downloadCSV = () => {
    const csvContent = convertToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    // For IE support
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, 'entries.csv');
    } else {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'entries.csv');
      link.click();
    }
  };

  return (
    <div className="mt-6">
      {entries.length > 0 && (
        <button
          onClick={downloadCSV}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Export to CSV
        </button>
      )}
    </div>
  );
};

export default CSVExport;