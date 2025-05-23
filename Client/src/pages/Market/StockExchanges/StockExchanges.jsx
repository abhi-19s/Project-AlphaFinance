import React from "react";
import "./StockExchanges.css";

const StockExchangesTB = [
  { name: "US OTC", country: "United States", code: "OTC", currency: "USD", stocks: 7620 },
  { name: "Bombay Stock Exchange", country: "India", code: "BOM", currency: "INR", stocks: 4251 },
  { name: "Tokyo Stock Exchange", country: "Japan", code: "TYO", currency: "JPY", stocks: 3886 },
  { name: "London Stock Exchange", country: "United Kingdom", code: "LON", currency: "GBP", stocks: 3305 },
  { name: "Nasdaq Stock Market", country: "United States", code: "NASDAQ", currency: "USD", stocks: 3304 },
  { name: "Shenzhen Stock Exchange", country: "China", code: "SHE", currency: "CNY", stocks: 2823 },
  { name: "Hong Kong Stock Exchange", country: "Hong Kong", code: "HKG", currency: "HKD", stocks: 2551 },
  { name: "National Stock Exchange of India", country: "India", code: "NSE", currency: "INR", stocks: 2548 },
  { name: "Shanghai Stock Exchange", country: "China", code: "SHA", currency: "CNY", stocks: 2267 },
  { name: "New York Stock Exchange", country: "United States", code: "NYSE", currency: "USD", stocks: 1941 },
  { name: "Australian Securities Exchange", country: "Australia", code: "ASX", currency: "AUD", stocks: 1792 },
  { name: "KOSDAQ", country: "South Korea", code: "KOSDAQ", currency: "KRW", stocks: 1667 },
  { name: "TSX Venture Exchange", country: "Canada", code: "TSXV", currency: "CAD", stocks: 1403 },
  { name: "Taipei Exchange", country: "Taiwan", code: "TPEX", currency: "TWD", stocks: 1115 },
  { name: "Taiwan Stock Exchange", country: "Taiwan", code: "TPE", currency: "TWD", stocks: 1034 },
  { name: "Bursa Malaysia", country: "Malaysia", code: "KLSE", currency: "MYR", stocks: 1025 },
  { name: "Indonesia Stock Exchange", country: "Indonesia", code: "IDX", currency: "IDR", stocks: 889 },
  { name: "Stock Exchange of Thailand", country: "Thailand", code: "BKK", currency: "THB", stocks: 879 },
  { name: "Korea Stock Exchange", country: "South Korea", code: "KRX", currency: "KRW", stocks: 816 },
  { name: "Nasdaq Stockholm", country: "Sweden", code: "STO", currency: "SEK", stocks: 770 },
  { name: "Euronext Paris", country: "France", code: "EPA", currency: "EUR", stocks: 754 },
  { name: "Warsaw Stock Exchange", country: "Poland", code: "WSE", currency: "PLN", stocks: 719 },
  { name: "Toronto Stock Exchange", country: "Canada", code: "TSX", currency: "CAD", stocks: 714 },
  { name: "Deutsche Börse Xetra", country: "Germany", code: "ETR", currency: "EUR", stocks: 692 },
  { name: "London Stock Exchange AIM", country: "United Kingdom", code: "AIM", currency: "GBP", stocks: 640 },
  { name: "Canadian Securities Exchange", country: "Canada", code: "CSE", currency: "CAD", stocks: 595 },
  { name: "Istanbul Stock Exchange", country: "Turkey", code: "IST", currency: "TRY", stocks: 561 },
];

const StockExchanges = () => {
  return (
    <div className="stock-table-container">
      <h2>🌐 List of Stock Exchanges</h2>
      <p className="info">The table below shows a list of all the active stock exchanges around the world.</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Exchange Name</th>
              <th>Country</th>
              <th>Code</th>
              <th>Currency</th>
              <th>Stocks</th>
            </tr>
          </thead>
          <tbody>
            {StockExchangesTB.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.country}</td>
                <td>{item.code}</td>
                <td>{item.currency}</td>
                <td>{item.stocks.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockExchanges;