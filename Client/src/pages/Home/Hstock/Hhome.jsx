import { useEffect, useState } from "react";
import "./Hhome.css";

const initialStocks = [
  { name: "AXIS BANK", symbol: "AXISBANK.NS" },
  { name: "TCS", symbol: "TCS.NS" },
  { name: "RELIANCE", symbol: "RELIANCE.NS" },
  { name: "ITC", symbol: "ITC.NS" },
  { name: "HDFC", symbol: "HDFCBANK.NS" },
  { name: "INFY", symbol: "INFY.NS" },
  { name: "WIPRO", symbol: "WIPRO.NS" },
  { name: "SBIN", symbol: "SBIN.NS" },
  { name: "ONGC", symbol: "ONGC.NS" },
  { name: "ICICI BANK", symbol: "ICICIBANK.NS" },
  { name: "HINDUNILVR", symbol: "HINDUNILVR.NS" },
  { name: "BAJAJ FINANCE", symbol: "BAJFINANCE.NS" },
  { name: "ASIAN PAINTS", symbol: "ASIANPAINT.NS" },
  { name: "MARUTI SUZUKI", symbol: "MARUTI.NS" },
  { name: "NTPC", symbol: "NTPC.NS" },
  { name: "ULTRATECH CEMENT", symbol: "ULTRACEMCO.NS" },
  { name: "TITAN", symbol: "TITAN.NS" },
  { name: "POWER GRID", symbol: "POWERGRID.NS" },
  { name: "COAL INDIA", symbol: "COALINDIA.NS" },
];
export const Hhome = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    try {
      const result = await Promise.all(
        initialStocks.map(async (company) => {
          const res = await fetch(`http://localhost:3000/api/stock/${company.symbol}`);
          if (!res.ok) throw new Error(`Error fetching ${company.symbol}`);
          const data = await res.json();
          return {
            name: company.name,
            symbol: company.symbol,
            price: data.regularMarketPrice,
            change: data.regularMarketChangePercent,
          };
        })
      );
      setStocks(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="stock-ticker">
        <div className="ticker-track">
          {error ? (
            <div className="error">{error}</div>
          ) : (
            stocks.map((stock, index) => (
              <div className="stock-card" key={index}>
                <span className="company-name">{stock.name}</span>
                ₹{stock.price}{" "}
                <span className={`change ${stock.change >= 0 ? "positive" : "negative"}`}>
                  {stock.change?.toFixed(3)}%
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};