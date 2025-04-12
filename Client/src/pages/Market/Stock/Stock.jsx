import React, { useEffect, useState } from 'react';
import './Stock.css';

const symbols = ['AAPL', 'GOOGL', 'TSLA', 'MSFT','NFLX','TSLA','META','NVDA']; 

const StockPage = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    try {
      const results = await Promise.all(
        symbols.map(async (symbol) => {
          const res = await fetch(`http://localhost:5001/stock/${symbol}`); 
          if (!res.ok) throw new Error(`Error fetching ${symbol}`);
          const data = await res.json();

          return {
            symbol: data.symbol,
            name: data.shortName || data.longName || symbol,
            price: data.regularMarketPrice,
            change: data.regularMarketChangePercent,
          };
        })
      );

      setStocks(results);
    } catch (err) {
      console.error(err);
      setError('Failed to load stock data');
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  return (
    <div className="stock-list">
      {error ? (
        <div className="error">{error}</div>
      ) : stocks.length > 0 ? (
        stocks.map((stock, index) => (
          <div className="stock-item" key={index}>
            <div className="stock-info">
              <span className="stock-symbol">{stock.symbol}</span>
              <span className="stock-name">{stock.name}</span>
            </div>
            <div className="stock-price">
              <span className="price">
                ₹{typeof stock.price === 'number' ? stock.price.toFixed(2) : 'N/A'}
              </span>
              <span className={`change ${stock.change >= 0 ? 'green' : 'red'}`}>
                {stock.change >= 0 ? '+' : ''}
                {typeof stock.change === 'number' ? stock.change.toFixed(2) : '0.00'}%
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="error">Loading...</div>
      )}
    </div>
  );
};

export default StockPage;
