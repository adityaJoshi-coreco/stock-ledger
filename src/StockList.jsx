// src/StockList.js
import React from 'react';

function StockList({ entries }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">All Added Stocks</h2>
      
      {entries.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4 text-sm font-semibold">Stock Name</th>
              <th className="p-4 text-sm font-semibold">Buy Price</th>
              <th className="p-4 text-sm font-semibold">Sell Price</th>
              <th className="p-4 text-sm font-semibold">Quantity</th>
              <th className="p-4 text-sm font-semibold">Profit/Loss</th>
              <th className="p-4 text-sm font-semibold">ROI %</th>
              <th className="p-4 text-sm font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-4">{entry.stockName}</td>
                <td className="p-4">{entry.buyPrice}</td>
                <td className="p-4">{entry.sellPrice}</td>
                <td className="p-4">{entry.quantity}</td>
                <td className={`p-4 ${entry.profit < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {entry.profit < 0 ? `- ₹${Math.abs(entry.profit)}` : `₹${entry.profit}`}
                </td>
                <td className="p-4">{entry.roi}%</td>
                <td className="p-4">{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-4 text-lg">No stocks added yet.</p>
      )}
    </div>
  );
}

export default StockList;
