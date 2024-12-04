# Stock Ledger App

Welcome to the **Stock Ledger App**! This React app helps you track your stock investments, calculate profits/losses, and visualize your portfolio with charts. It’s built using **Create React App** and includes features like notifications, stock entry tracking, and data visualization.

## Features

- **Track Stock Purchases**: Add entries with stock name, purchase price, quantity, and selling price.
- **Dynamic Notifications**: Get funny error or success notifications based on your inputs.
- **Profit/Loss Calculation**: Automatically calculates profit/loss, amount, and ROI.
- **Data Visualization**: Visualize your stock portfolio with:
  - Line charts showing ROI and Profit/Loss over time.
  - Pie chart for portfolio distribution.
  - Bar chart for ROI comparison.
- **CSV Export**: Export your stock ledger as a CSV file for external use.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/adityaJoshi-coreco/stock-ledger.git
cd stock-ledger
npm install

## Available Scripts

In the project directory, you can run the following commands:

### `npm start`
Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.  

### `npm test`
Launches the test runner in interactive watch mode.  
For more information, refer to the section on [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`
Builds the app for production and outputs it in the `build` folder.  
The build is optimized for performance and is ready to be deployed.  
For more information on deployment, visit the [deployment docs](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run eject`
**Note:** This is a one-way operation. Once you eject, you can’t go back!  

---

## Features in Detail

### Stock Ledger Input
You can add entries by filling out a form with the following fields:
- **Stock Name**: The name of the stock.
- **Buy Price**: The price at which you bought the stock.
- **Quantity**: The number of stocks purchased.
- **Sell Price or Current Price**: The selling price or current stock price for profit/loss calculation.

### Notifications
The app shows funny and interactive notifications in case of invalid inputs. For example:
- "Oops, looks like you went a little rogue there!"
- "Hold up! Numbers don't lie... but you sure did!"

### Data Visualization
- **ROI Line Chart**: Shows the Return on Investment (ROI) percentage for each stock entry.
- **Profit/Loss Line Chart**: Shows the profit/loss for each stock entry.
- **Portfolio Distribution Pie Chart**: Displays a pie chart visualizing your stock portfolio by quantity.
- **ROI Bar Chart**: Compares the ROI for each stock entry.

### CSV Export
You can export your stock ledger as a CSV file for easier analysis or sharing. Simply click the **Export CSV** button to download a CSV file with all your stock entries.

---
This project is licensed under the MIT License - see the LICENSE file for details.

