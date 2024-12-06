import './App.css';
import React, { useState } from 'react';
import Notification from './notification/Notifications';
import CSVExport from './csv/CSVExport';
import RoiLineChart from './charts/RoiLineChart';
import ProfitLossLineChart from './charts/ProfitLossLineChart';
import PortfolioPieChart from './charts/PortfolioPieChart';
import RoiBarChart from './charts/RoiBarChart';
import StockList from './StockList';
// Importing necessary Chart.js components
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Registering components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [stockName, setStockName] = useState('');
  const [entries, setEntries] = useState([]);
  const [useCurrentPrice, setUseCurrentPrice] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');  // State for the selected date

  const funnyMessages = [
    "Oops, looks like you went a little rogue there!",
    "Hold up! Numbers don't lie... but you sure did!",
    "Looks like you're trying to break the system! Try again.",
    "Err... That doesn't seem quite right! Maybe a typo?",
    "Whoopsie daisy! Did you mean to put that number in there?",
    "Stock prices don’t like negative values… neither do we!",
  ];

  const isValidPositiveNumber = (value) => {
    return !isNaN(value) && parseFloat(value) > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z]+$/.test(stockName)) {
      setNotification(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
      setNotificationType('error');
      return;
    }

    if (!isValidPositiveNumber(buyPrice)) {
      setNotification(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
      setNotificationType('error');
      return;
    }
    if (!isValidPositiveNumber(quantity)) {
      setNotification(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
      setNotificationType('error');
      return;
    }

    if (useCurrentPrice && !isValidPositiveNumber(currentPrice)) {
      setNotification(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
      setNotificationType('error');
      return;
    }

    if (!useCurrentPrice && !isValidPositiveNumber(sellPrice)) {
      setNotification(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
      setNotificationType('error');
      return;
    }

    try {
      const buy = parseFloat(buyPrice);
      const qty = parseInt(quantity);

      let sell = 0;
      if (useCurrentPrice) {
        sell = parseFloat(currentPrice);
      } else {
        sell = parseFloat(sellPrice);
      }

      const profit = (sell - buy) * qty;
      const totalAmount = buy * qty;
      const roiPercentage = ((profit / totalAmount) * 100).toFixed(2);

      const newEntry = {
        stockName,
        buyPrice: buy,
        sellPrice: sell,
        currentPrice,
        quantity: qty,
        profit,
        amount: totalAmount,
        roi: roiPercentage,
        isCurrentPrice: useCurrentPrice,
        date: selectedDate,  // Include the date in the entry
      };

      setEntries([...entries, newEntry]);
    } catch (error) {
      console.error(error);
      setNotification("Uh-oh, something went wrong! Please try again.");
      setNotificationType('error');
    }
  };

  const totalPnL = entries.reduce((acc, entry) => acc + entry.profit, 0).toFixed(2);
  const averageROI = (entries.reduce((acc, entry) => acc + parseFloat(entry.roi), 0) / entries.length).toFixed(2);

  const chartData = {
    labels: entries.map(entry => entry.stockName),
    datasets: [
      {
        label: 'ROI %',
        data: entries.map(entry => entry.roi),
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        fill: false,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const profitLossData = {
    labels: entries.map(entry => entry.stockName),
    datasets: [
      {
        label: 'Profit/Loss',
        data: entries.map(entry => entry.profit),
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
        fill: false,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  const portfolioData = {
    labels: entries.map(entry => entry.stockName),
    datasets: [
      {
        label: 'Portfolio Distribution',
        data: entries.map(entry => entry.quantity),
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const roiBarChartData = {
    labels: entries.map(entry => entry.stockName),
    datasets: [
      {
        label: 'ROI %',
        data: entries.map(entry => entry.roi),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <Notification message={notification} type={notificationType} onClose={() => setNotification(null)} />

      <h1 className="text-3xl mb-4">Stock Ledger</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="stockName" className="block">Stock Name</label>
          <input
            type="text"
            id="stockName"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="buyPrice" className="block">Buy Price</label>
          <input
            type="number"
            id="buyPrice"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="priceToggle" className="block">Use Current Price</label>
          <input
            type="checkbox"
            id="priceToggle"
            checked={useCurrentPrice}
            onChange={() => setUseCurrentPrice(!useCurrentPrice)}
          />
        </div>

        {useCurrentPrice ? (
          <div>
            <label htmlFor="currentPrice" className="block">Current Price</label>
            <input
              type="number"
              id="currentPrice"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>
        ) : (
          <div>
            <label htmlFor="sellPrice" className="block">Sell Price</label>
            <input
              type="number"
              id="sellPrice"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>
        )}

        {/* Minimalist Date Picker */}
        <div>
          <label htmlFor="selectedDate" className="block">Date</label>
          <input
            type="date"
            id="selectedDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Add Entry
        </button>
      </form>

      {entries.length > 0 && (
        <>
          <StockList entries={entries} /> 
          <div className="mt-4">
            <h2 className="text-xl font-bold">Total Profit/Loss</h2>
            <p className={`text-2xl font-bold ${totalPnL < 0 ? 'text-red-500' : 'text-green-500'}`}>
              {totalPnL < 0 ? `- ₹${Math.abs(totalPnL)}` : `₹${totalPnL}`}
            </p>
          </div>
          

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <RoiLineChart data={chartData} />
            <ProfitLossLineChart data={profitLossData} />
            <PortfolioPieChart data={portfolioData} />
            <RoiBarChart data={roiBarChartData} />
          </div>

          <CSVExport entries={entries} />
        </>
      )}
    </div>
  );
}

export default App;
